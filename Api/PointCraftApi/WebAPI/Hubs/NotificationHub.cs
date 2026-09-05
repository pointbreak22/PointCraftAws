using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Hubs;

[Authorize]
public class NotificationHub : Hub
{
    // Per-connection group/user wiring goes here as features are added
    // (see MessengerAzure's ChatHub + CustomUserIdProvider for the pattern).
}
