using System.Net.Http.Json;
using Application.Common;

namespace WebAPI.Services;

public class TelegramNotifier(HttpClient httpClient, IConfiguration configuration, ILogger<TelegramNotifier> logger)
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
        var chatId = configuration["TelegramBot:ChatId"];
        if (string.IsNullOrWhiteSpace(botToken) || string.IsNullOrWhiteSpace(chatId)) return;

        var text = $"📩 New contact request\n\n" +
                   $"Name: {name}\n" +
                   $"Contact: {contact}\n" +
                   (string.IsNullOrWhiteSpace(projectType) ? "" : $"Project type: {projectType}\n") +
                   $"\n{message}";

        try
        {
            var response = await httpClient.PostAsJsonAsync(
                $"/bot{botToken}/sendMessage",
                new { chat_id = chatId, text },
                cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                logger.LogWarning(
                    "Telegram notification failed with status {StatusCode}",
                    response.StatusCode);
            }
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            // A Telegram outage or bad config must never break the actual contact request.
            logger.LogWarning(ex, "Failed to send Telegram notification");
        }
    }
}
