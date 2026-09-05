using System.Net.Http.Json;
using Application.Common;
using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;

namespace WebAPI.Services;

public class TelegramNotifier(
    HttpClient httpClient,
    IConfiguration configuration,
    ITelegramSubscriberRepository subscribers,
    ILogger<TelegramNotifier> logger)
    : ITelegramNotifier
{
    public async Task NotifyContactRequestAsync(
        string name,
        string contact,
        string? projectType,
        string message,
        CancellationToken cancellationToken = default)
    {
        var recipients = await GetRecipientsAsync(TelegramSubscriptionType.Requests, cancellationToken);
        if (recipients.Count == 0) return;

        var text = $"📩 New contact request\n\n" +
                   $"Name: {name}\n" +
                   $"Contact: {contact}\n" +
                   (string.IsNullOrWhiteSpace(projectType) ? "" : $"Project type: {projectType}\n") +
                   $"\n{message}";

        await SendToAllAsync(recipients, text, cancellationToken);
    }

    public async Task NotifyLogAsync(
        string level,
        string message,
        string? exception,
        CancellationToken cancellationToken = default)
    {
        var recipients = await GetRecipientsAsync(TelegramSubscriptionType.Logs, cancellationToken);
        if (recipients.Count == 0) return;

        var text = $"🚨 [{level}] {message}" + (string.IsNullOrWhiteSpace(exception) ? "" : $"\n\n{exception}");

        await SendToAllAsync(recipients, text, cancellationToken);
    }

    private async Task<IReadOnlyList<TelegramSubscriber>> GetRecipientsAsync(
        TelegramSubscriptionType type, CancellationToken cancellationToken)
    {
        if (!configuration.GetValue<bool>("TelegramBot:Enabled")) return [];
        if (string.IsNullOrWhiteSpace(configuration["TelegramBot:BotToken"])) return [];

        return await subscribers.GetSubscribersForAsync(type, cancellationToken);
    }

    private const int TelegramMessageLimit = 4096;

    private async Task SendToAllAsync(IReadOnlyList<TelegramSubscriber> recipients, string text, CancellationToken cancellationToken)
    {
        var botToken = configuration["TelegramBot:BotToken"];

        // Telegram rejects the whole message past 4096 chars (e.g. a long stack trace) —
        // truncate rather than let sendMessage 400 and the event go out silently.
        if (text.Length > TelegramMessageLimit)
        {
            text = text[..(TelegramMessageLimit - 15)] + "\n…(truncated)";
        }

        foreach (var recipient in recipients)
        {
            try
            {
                var response = await httpClient.PostAsJsonAsync(
                    $"/bot{botToken}/sendMessage",
                    new { chat_id = recipient.ChatId, text },
                    cancellationToken);

                if (!response.IsSuccessStatusCode)
                {
                    // Warning, not Error — an Error here would feed straight back into
                    // TelegramLogSink and loop forever.
                    logger.LogWarning(
                        "Telegram notification to {ChatId} failed with status {StatusCode}",
                        recipient.ChatId, response.StatusCode);
                }
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                // A Telegram outage or bad config must never break the caller (a contact
                // request being saved, or a log event being emitted).
                logger.LogWarning(ex, "Failed to send Telegram notification to {ChatId}", recipient.ChatId);
            }
        }
    }
}
