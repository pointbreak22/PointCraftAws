using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EfContactRequestRepository(ApplicationDbContext db) : IContactRequestRepository
{
    public async Task AddAsync(ContactRequest request, CancellationToken cancellationToken)
    {
        await db.ContactRequests.AddAsync(request, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task<List<ContactRequest>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await db.ContactRequests
            .OrderByDescending(x => x.CreatedAtUtc)
            .ToListAsync(cancellationToken);
    }
}
