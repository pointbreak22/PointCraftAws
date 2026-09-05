namespace Application.Common;

/// <summary>
/// Best-effort outbound notification to the operator's Telegram chat. Implementations must
/// never throw — a failed/unconfigured Telegram integration must not block saving a lead.
/// </summary>
public interface ITelegramNotifier
{
    Task NotifyContactRequestAsync(
        string name,
        string contact,
        string? projectType,
        string message,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Forwards an Error/Fatal-level log event (see TelegramLogSink) to Logs/All subscribers.
    /// Failures here must log at Warning, never Error — logging at Error would feed back into
    /// the sink that calls this method and loop forever.
    /// </summary>
    Task NotifyLogAsync(
        string level,
        string message,
        string? exception,
        CancellationToken cancellationToken = default);
}
