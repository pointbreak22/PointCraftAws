using Domain.Entities;

namespace Domain.Repositories;

public interface IContactRequestRepository
{
    Task AddAsync(ContactRequest request, CancellationToken cancellationToken);
    Task<List<ContactRequest>> GetAllAsync(CancellationToken cancellationToken);
}
