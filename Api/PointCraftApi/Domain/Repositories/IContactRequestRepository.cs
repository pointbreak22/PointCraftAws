using Domain.Entities;

namespace Domain.Repositories;

public interface IContactRequestRepository
{
    Task AddAsync(ContactRequest request, CancellationToken cancellationToken);
}
