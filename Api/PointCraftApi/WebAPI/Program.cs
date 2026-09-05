using System.Text;
using System.Threading.RateLimiting;
using Application;
using Infrastructure;
using Infrastructure.Persistence.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Scalar.AspNetCore;
using Serilog;
using WebAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// CORS — allowed origins configured in appsettings ("AllowedOrigins" array)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var origins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
                      ?? ["http://localhost:4200"];
        policy.WithOrigins(origins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

Serilog.Log.Logger = new Serilog.LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();
builder.Host.UseSerilog();

// OpenAPI document + JWT Bearer security scheme, auto-clears the auth requirement on [AllowAnonymous]
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();
        document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header
        };
        return Task.CompletedTask;
    });

    options.AddOperationTransformer((operation, context, cancellationToken) =>
    {
        var hasAllowAnonymous = context.Description.ActionDescriptor is ControllerActionDescriptor actionDescriptor
            && (actionDescriptor.MethodInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), true).Any()
                || actionDescriptor.ControllerTypeInfo.GetCustomAttributes(typeof(AllowAnonymousAttribute), true).Any());

        if (hasAllowAnonymous)
        {
            operation.Security?.Clear();
        }
        else
        {
            operation.Security ??= new List<OpenApiSecurityRequirement>();
            operation.Security.Add(new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("Bearer", hostDocument: null, externalResource: null)] = []
            });
        }

        return Task.CompletedTask;
    });
});

// Infrastructure: DbContext + repositories (see Infrastructure/DependencyInjection.cs — DB provider is still TBD)
builder.Services.AddInfrastructure(builder.Configuration);

// MediatR: scans the Application assembly for commands/queries/handlers
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AssemblyMarker).Assembly));

// JWT auth. Kept provider-agnostic (Authority + Audience) so it works against AWS Cognito
// or any other standard OIDC issuer without an SDK-specific package — set Jwt:Authority /
// Jwt:Audience in appsettings once the identity provider is chosen.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Jwt:Authority"];
        options.Audience = builder.Configuration["Jwt:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true
        };

        // Let SignalR clients (which can't set an Authorization header) pass the JWT via query string.
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                if (!string.IsNullOrEmpty(accessToken) &&
                    context.HttpContext.Request.Path.StartsWithSegments("/hubs"))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddSingleton<Microsoft.AspNetCore.SignalR.IUserIdProvider, WebAPI.Services.CustomUserIdProvider>();
builder.Services.AddSignalR();
builder.Services.AddSingleton<Application.Common.IRealtimeNotifier, WebAPI.Services.RealtimeNotifier>();

// Telegram: just a "sendMessage" call, no polling/webhook — see appsettings "TelegramBot" section.
builder.Services.AddHttpClient<Application.Common.ITelegramNotifier, WebAPI.Services.TelegramNotifier>(client =>
{
    client.BaseAddress = new Uri("https://api.telegram.org");
});

// The API only ever sees traffic proxied through Caddy, so every request's RemoteIpAddress
// would otherwise be the Caddy container's — trust its X-Forwarded-For so rate limiting
// (below) partitions by the real client IP instead of one shared bucket for everyone.
var forwardedHeadersOptions = new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
};
forwardedHeadersOptions.KnownIPNetworks.Clear();
forwardedHeadersOptions.KnownProxies.Clear();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy("contact-form", httpContext => RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 5,
            Window = TimeSpan.FromMinutes(15),
            QueueLimit = 0,
        }));
});

var app = builder.Build();

// SQLite is a single local file — auto-migrating on every startup (dev and prod alike) means
// there's no separate migration step to remember for the single-VM deploy.
using (var scope = app.Services.CreateScope())
{
    await scope.ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();
}

app.UseForwardedHeaders(forwardedHeadersOptions);

app.MapOpenApi();
app.MapScalarApiReference(); // UI: /scalar/v1
app.MapGet("/", () => Results.Redirect("/scalar/v1"));

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");

app.Run();
