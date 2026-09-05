using Domain.Enums;

namespace Domain.Entities;

public class TelegramSubscriber
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string Username { get; private set; } = null!;
    public TelegramSubscriptionType Type { get; private set; }
    public string ChatId { get; private set; } = null!;
    public DateTime CreatedAtUtc { get; private set; }

    private TelegramSubscriber() { }

    public static TelegramSubscriber Create(string name, string username, TelegramSubscriptionType type, string chatId)
    {
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Name is required.", nameof(name));
        if (string.IsNullOrWhiteSpace(chatId)) throw new ArgumentException("Chat id is required.", nameof(chatId));

        return new TelegramSubscriber
        {
            Id = Guid.NewGuid(),
            Name = name.Trim(),
            Username = username.Trim(),
            Type = type,
            ChatId = chatId.Trim(),
            CreatedAtUtc = DateTime.UtcNow
        };
    }
}
