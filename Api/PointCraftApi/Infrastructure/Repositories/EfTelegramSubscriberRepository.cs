using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EfTelegramSubscriberRepository(ApplicationDbContext db) : ITelegramSubscriberRepository
{
    public async Task<IReadOnlyList<TelegramSubscriber>> GetSubscribersForAsync(
        TelegramSubscriptionType type, CancellationToken cancellationToken)
    {
        return await db.TelegramSubscribers
            .Where(s => s.Type == type || s.Type == TelegramSubscriptionType.All)
            .ToListAsync(cancellationToken);
    }
}
