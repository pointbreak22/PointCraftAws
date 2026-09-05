namespace Application.Common;

/// <summary>
/// Application-layer abstraction over the realtime transport (SignalR hub in WebAPI).
/// Handlers depend on this instead of WebAPI so Application has no reference to ASP.NET Core.
/// </summary>
public interface IRealtimeNotifier
{
    Task NotifyUserAsync(string userId, string method, object payload, CancellationToken cancellationToken = default);
}
