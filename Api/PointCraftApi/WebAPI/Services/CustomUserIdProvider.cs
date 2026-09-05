using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Services;

/// <summary>
/// Resolves the SignalR Context.UserIdentifier from the JWT "sub"/NameIdentifier claim.
/// Must match ApiControllerBase.GetCurrentUserId() exactly, or IRealtimeNotifier.NotifyUserAsync
/// won't find the recipient's connection.
/// </summary>
public class CustomUserIdProvider : IUserIdProvider
{
    public string? GetUserId(HubConnectionContext connection)
    {
        var user = connection.User;
        if (user == null) return null;

        var sub = user.FindFirst("sub")?.Value;
        if (!string.IsNullOrEmpty(sub)) return sub;

        var nameId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!string.IsNullOrEmpty(nameId)) return nameId;

        return null;
    }
}
