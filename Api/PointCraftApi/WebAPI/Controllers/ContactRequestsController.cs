using Application.CQRS.ContactRequests.Commands.SubmitContactRequest;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace WebAPI.Controllers;

// Public — this is the "Discuss your project" form, submitted before any client account exists.
[AllowAnonymous]
public class ContactRequestsController(ISender sender) : ApiControllerBase(sender)
{
    [HttpPost]
    [EnableRateLimiting("contact-form")]
    public async Task<IActionResult> Submit([FromBody] SubmitContactRequestDto dto, CancellationToken cancellationToken)
    {
        // Honeypot: real users never see or fill this field (hidden off-screen in the form),
        // so anything that fills it in is a bot. Return a fake success without doing any work,
        // so the bot has no signal that it was caught.
        if (!string.IsNullOrWhiteSpace(dto.Website)) return Ok(new { id = Guid.NewGuid() });

        if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name is required.");
        if (string.IsNullOrWhiteSpace(dto.Contact)) return BadRequest("Contact is required.");
        if (string.IsNullOrWhiteSpace(dto.Message)) return BadRequest("Message is required.");

        var id = await Sender.Send(
            new SubmitContactRequestCommand(dto.Name, dto.Contact, dto.ProjectType, dto.Message),
            cancellationToken);

        return Ok(new { id });
    }
}

public record SubmitContactRequestDto(string Name, string Contact, string? ProjectType, string Message, string? Website = null);
