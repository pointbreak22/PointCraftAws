using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence.Context;

namespace Infrastructure.Repositories;

public class EfContactRequestRepository(ApplicationDbContext db) : IContactRequestRepository
{
    public async Task AddAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        await db.ContactRequests.AddAsync(request, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
    }
}
