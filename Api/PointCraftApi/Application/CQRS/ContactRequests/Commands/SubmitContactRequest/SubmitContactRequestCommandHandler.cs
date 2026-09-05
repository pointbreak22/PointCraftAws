using Domain.Entities;
using Domain.Repositories;
using MediatR;

namespace Application.CQRS.ContactRequests.Commands.SubmitContactRequest;

public class SubmitContactRequestCommandHandler(IContactRequestRepository repository)
    : IRequestHandler<SubmitContactRequestCommand, Guid>
{
    public async Task<Guid> Handle(SubmitContactRequestCommand request, CancellationToken cancellationToken)
    {
        var contactRequest = ContactRequest.Create(request.Name, request.Contact, request.ProjectType, request.Message);
        await repository.AddAsync(contactRequest, cancellationToken);
        return contactRequest.Id;
    }
}
