using MediatR;

namespace Application.CQRS.ContactRequests.Commands.SubmitContactRequest;

public record SubmitContactRequestCommand(string Name, string Contact, string? ProjectType, string Message)
    : IRequest<Guid>;
