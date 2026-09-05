using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/admin/process-steps")]
[ApiController]
[Authorize]
public class AdminProcessStepsController(IContentRepository<SiteProcessStep> repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await repository.GetAllAsync(cancellationToken);
        return Ok(items.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProcessStepAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.TitleEn) || string.IsNullOrWhiteSpace(dto.TitleRu))
            return BadRequest("Title (en/ru) is required.");

        var entity = ToEntity(dto);
        await repository.AddAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProcessStepAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.TitleEn) || string.IsNullOrWhiteSpace(dto.TitleRu))
            return BadRequest("Title (en/ru) is required.");

        var entity = ToEntity(dto);
        entity.Id = id;
        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private static ProcessStepAdminDto ToDto(SiteProcessStep x) => new(x.Id, x.TitleEn, x.TitleRu, x.DescriptionEn, x.DescriptionRu, x.SortOrder);

    private static SiteProcessStep ToEntity(ProcessStepAdminDto dto) => new()
    {
        TitleEn = dto.TitleEn,
        TitleRu = dto.TitleRu,
        DescriptionEn = dto.DescriptionEn,
        DescriptionRu = dto.DescriptionRu,
        SortOrder = dto.SortOrder,
    };
}

public record ProcessStepAdminDto(Guid Id, string TitleEn, string TitleRu, string DescriptionEn, string DescriptionRu, int SortOrder);
