using Application.CQRS.ContactRequests.Commands.SubmitContactRequest;
using Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace WebAPI.Controllers;

// Submit is public (the "Discuss your project" form, before any client account exists);
// the GET list is the admin dashboard reading back what was submitted, so it requires auth.
// [AllowAnonymous] at the controller level would bypass [Authorize] on GetAll entirely, so
// each action carries its own attribute instead of one shared at the class level.
public class ContactRequestsController(ISender sender, IContactRequestRepository repository)
    : ApiControllerBase(sender)
{
    [HttpPost]
    [AllowAnonymous]
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

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var requests = await repository.GetAllAsync(cancellationToken);
        return Ok(requests.Select(r => new ContactRequestDto(
            r.Id, r.Name, r.Contact, r.ProjectType, r.Message, r.CreatedAtUtc)));
    }
}

public record SubmitContactRequestDto(string Name, string Contact, string? ProjectType, string Message, string? Website = null);

public record ContactRequestDto(Guid Id, string Name, string Contact, string? ProjectType, string Message, DateTime CreatedAtUtc);
