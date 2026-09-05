using Domain.Entities;
using Domain.Enums;

namespace Domain.Repositories;

public interface ITelegramSubscriberRepository
{
    /// <summary>Subscribers who should be notified about <paramref name="type"/> — includes <see cref="TelegramSubscriptionType.All"/> subscribers too.</summary>
    Task<IReadOnlyList<TelegramSubscriber>> GetSubscribersForAsync(TelegramSubscriptionType type, CancellationToken cancellationToken);
}
