using Domain.Entities;

namespace Domain.Repositories;

/// <summary>
/// Shared CRUD shape for the 5 admin-editable content types (SiteService, SiteTechStackArea,
/// SiteProcessStep, SiteCaseStudy, SiteTrustPoint) — one generic repository instead of 5
/// near-identical classes, since the operations are genuinely identical for all of them.
/// </summary>
public interface IContentRepository<T> where T : SiteContentEntity
{
    Task<List<T>> GetAllAsync(CancellationToken cancellationToken);
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
    Task AddAsync(T entity, CancellationToken cancellationToken);
    Task UpdateAsync(T entity, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken);
}
