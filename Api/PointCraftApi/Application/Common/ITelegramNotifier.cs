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
}
