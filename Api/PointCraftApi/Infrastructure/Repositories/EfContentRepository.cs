using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class EfContentRepository<T>(ApplicationDbContext db) : IContentRepository<T> where T : SiteContentEntity
{
    public async Task<List<T>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await db.Set<T>().OrderBy(x => x.SortOrder).ToListAsync(cancellationToken);
    }

    public Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return db.Set<T>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }

    public async Task AddAsync(T entity, CancellationToken cancellationToken)
    {
        entity.Id = Guid.NewGuid();
        await db.Set<T>().AddAsync(entity, cancellationToken);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(T entity, CancellationToken cancellationToken)
    {
        db.Set<T>().Update(entity);
        await db.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var entity = await db.Set<T>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (entity is null) return false;

        db.Set<T>().Remove(entity);
        await db.SaveChangesAsync(cancellationToken);
        return true;
    }
}
