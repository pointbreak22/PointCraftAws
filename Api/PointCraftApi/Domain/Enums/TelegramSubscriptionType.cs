namespace Domain.Enums;

/// <summary>What a Telegram subscriber wants to be notified about. <see cref="All"/> matches every category.</summary>
public enum TelegramSubscriptionType
{
    Requests,
    Logs,
    All,
}
