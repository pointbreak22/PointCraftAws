using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Controllers;

// Exactly one admin account, configured via Admin:Username/Admin:PasswordHash — see Program.cs
// for why there's no external identity provider here.
[Route("api/[controller]")]
[ApiController]
[AllowAnonymous]
public class AuthController(IConfiguration configuration) : ControllerBase
{
    private static readonly PasswordHasher<object> Hasher = new();

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var username = configuration["Admin:Username"];
        var passwordHash = configuration["Admin:PasswordHash"];

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(passwordHash)
            || !string.Equals(request.Username, username, StringComparison.Ordinal))
        {
            return Unauthorized();
        }

        var verification = Hasher.VerifyHashedPassword(new object(), passwordHash, request.Password);
        if (verification == PasswordVerificationResult.Failed) return Unauthorized();

        var signingKey = configuration["Jwt:SigningKey"]
            ?? throw new InvalidOperationException("Jwt:SigningKey is not configured.");
        var issuer = configuration["Jwt:Issuer"];
        var expiresAt = DateTime.UtcNow.AddDays(7);

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            claims: [new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, "admin")],
            expires: expiresAt,
            signingCredentials: credentials);

        return Ok(new LoginResponse(new JwtSecurityTokenHandler().WriteToken(token), expiresAt));
    }
}

public record LoginRequest(string Username, string Password);

public record LoginResponse(string Token, DateTime ExpiresAt);
