using Application.Common;
using Microsoft.AspNetCore.SignalR;
using WebAPI.Hubs;

namespace WebAPI.Services;

public class RealtimeNotifier(IHubContext<NotificationHub> hubContext) : IRealtimeNotifier
{
    public Task NotifyUserAsync(string userId, string method, object payload, CancellationToken cancellationToken = default)
        => hubContext.Clients.User(userId).SendAsync(method, payload, cancellationToken);
}
