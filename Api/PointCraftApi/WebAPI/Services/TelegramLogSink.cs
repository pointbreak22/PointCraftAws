using Application.Common;
using Serilog.Core;
using Serilog.Events;

namespace WebAPI.Services;

/// <summary>
/// Forwards Error/Fatal log events to Telegram (see Program.cs, wired in with
/// restrictedToMinimumLevel: Error so routine Information/Warning noise never reaches it).
/// Needs a DI scope per event to resolve ITelegramNotifier — Serilog builds this sink before
/// the app's service provider is fully ready for request-scoped work, so it takes the root
/// IServiceProvider and creates a scope itself rather than having one injected.
/// </summary>
public class TelegramLogSink(IServiceProvider services) : ILogEventSink
{
    public void Emit(LogEvent logEvent)
    {
        // ILogEventSink.Emit is synchronous; fire-and-forget rather than blocking the caller
        // on a Telegram API call. Errors here are swallowed — this sink is best-effort only,
        // and must never itself become a source of unhandled exceptions or (worse) new Error
        // logs that would recurse back into it.
        _ = SendAsync(logEvent);
    }

    private async Task SendAsync(LogEvent logEvent)
    {
        try
        {
            using var scope = services.CreateScope();
            var notifier = scope.ServiceProvider.GetRequiredService<ITelegramNotifier>();
            await notifier.NotifyLogAsync(
                logEvent.Level.ToString(),
                logEvent.RenderMessage(),
                logEvent.Exception?.ToString());
        }
        catch
        {
            // Deliberately silent — see class remarks.
        }
    }
}
