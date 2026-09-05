using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence.Context;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // SQLite for local development — swap to Npgsql/SqlServer (Azure/AWS-managed DB) once
        // hosting is decided; only this line and the connection string need to change.
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IContactRequestRepository, EfContactRequestRepository>();
        services.AddScoped<ITelegramSubscriberRepository, EfTelegramSubscriberRepository>();

        services.AddScoped<IContentRepository<SiteTrustPoint>, EfContentRepository<SiteTrustPoint>>();
        services.AddScoped<IContentRepository<SiteService>, EfContentRepository<SiteService>>();
        services.AddScoped<IContentRepository<SiteTechStackArea>, EfContentRepository<SiteTechStackArea>>();
        services.AddScoped<IContentRepository<SiteProcessStep>, EfContentRepository<SiteProcessStep>>();
        services.AddScoped<IContentRepository<SiteCaseStudy>, EfContentRepository<SiteCaseStudy>>();

        return services;
    }
}
