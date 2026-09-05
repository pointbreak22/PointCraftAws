using Application.CQRS.ContactRequests.Commands.SubmitContactRequest;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

// Public — this is the "Discuss your project" form, submitted before any client account exists.
[AllowAnonymous]
public class ContactRequestsController(ISender sender) : ApiControllerBase(sender)
{
    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] SubmitContactRequestDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name is required.");
        if (string.IsNullOrWhiteSpace(dto.Contact)) return BadRequest("Contact is required.");
        if (string.IsNullOrWhiteSpace(dto.Message)) return BadRequest("Message is required.");

        var id = await Sender.Send(
            new SubmitContactRequestCommand(dto.Name, dto.Contact, dto.ProjectType, dto.Message),
            cancellationToken);

        return Ok(new { id });
    }
}

public record SubmitContactRequestDto(string Name, string Contact, string? ProjectType, string Message);
