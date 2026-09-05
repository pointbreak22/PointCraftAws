using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/admin/trust-points")]
[ApiController]
[Authorize]
public class AdminTrustPointsController(IContentRepository<SiteTrustPoint> repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await repository.GetAllAsync(cancellationToken);
        return Ok(items.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TrustPointAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.LabelEn) || string.IsNullOrWhiteSpace(dto.LabelRu))
            return BadRequest("Label (en/ru) is required.");

        var entity = ToEntity(dto);
        await repository.AddAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TrustPointAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.LabelEn) || string.IsNullOrWhiteSpace(dto.LabelRu))
            return BadRequest("Label (en/ru) is required.");

        var entity = ToEntity(dto);
        entity.Id = id;
        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private static TrustPointAdminDto ToDto(SiteTrustPoint x) => new(x.Id, x.Icon, x.LabelEn, x.LabelRu, x.SortOrder);

    private static SiteTrustPoint ToEntity(TrustPointAdminDto dto) => new()
    {
        Icon = dto.Icon,
        LabelEn = dto.LabelEn,
        LabelRu = dto.LabelRu,
        SortOrder = dto.SortOrder,
    };
}

public record TrustPointAdminDto(Guid Id, string Icon, string LabelEn, string LabelRu, int SortOrder);
