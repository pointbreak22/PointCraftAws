using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase(ISender sender) : ControllerBase
{
    protected ISender Sender { get; } = sender;

    /// <summary>Must match CustomUserIdProvider.GetUserId() exactly — see its remarks.</summary>
    protected string GetCurrentUserId()
    {
        var sub = User.FindFirst("sub")?.Value;
        if (!string.IsNullOrEmpty(sub)) return sub;

        var nameId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(nameId)) return nameId;

        throw new UnauthorizedAccessException("No user id claim present on the current principal.");
    }
}
