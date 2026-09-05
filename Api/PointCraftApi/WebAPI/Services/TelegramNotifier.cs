using System.Net.Http.Json;
using Application.Common;
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
        if (!configuration.GetValue<bool>("TelegramBot:Enabled")) return;

        var botToken = configuration["TelegramBot:BotToken"];
        if (string.IsNullOrWhiteSpace(botToken)) return;

        var recipients = await subscribers.GetSubscribersForAsync(TelegramSubscriptionType.Requests, cancellationToken);
        if (recipients.Count == 0) return;

        var text = $"📩 New contact request\n\n" +
                   $"Name: {name}\n" +
                   $"Contact: {contact}\n" +
                   (string.IsNullOrWhiteSpace(projectType) ? "" : $"Project type: {projectType}\n") +
                   $"\n{message}";

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
                    logger.LogWarning(
                        "Telegram notification to {ChatId} failed with status {StatusCode}",
                        recipient.ChatId, response.StatusCode);
                }
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                // A Telegram outage or bad config must never break the actual contact request.
                logger.LogWarning(ex, "Failed to send Telegram notification to {ChatId}", recipient.ChatId);
            }
        }
    }
}
