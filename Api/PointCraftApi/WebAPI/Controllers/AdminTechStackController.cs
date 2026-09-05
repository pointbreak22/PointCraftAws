using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/admin/tech-stack")]
[ApiController]
[Authorize]
public class AdminTechStackController(IContentRepository<SiteTechStackArea> repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await repository.GetAllAsync(cancellationToken);
        return Ok(items.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TechStackAreaAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.AreaEn) || string.IsNullOrWhiteSpace(dto.AreaRu))
            return BadRequest("Area (en/ru) is required.");

        var entity = ToEntity(dto);
        await repository.AddAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] TechStackAreaAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.AreaEn) || string.IsNullOrWhiteSpace(dto.AreaRu))
            return BadRequest("Area (en/ru) is required.");

        var entity = ToEntity(dto);
        entity.Id = id;
        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private static TechStackAreaAdminDto ToDto(SiteTechStackArea x) => new(
        x.Id, x.Icon, x.AreaEn, x.AreaRu, x.Technologies, x.BenefitEn, x.BenefitRu, x.SortOrder);

    private static SiteTechStackArea ToEntity(TechStackAreaAdminDto dto) => new()
    {
        Icon = dto.Icon,
        AreaEn = dto.AreaEn,
        AreaRu = dto.AreaRu,
        Technologies = dto.Technologies,
        BenefitEn = dto.BenefitEn,
        BenefitRu = dto.BenefitRu,
        SortOrder = dto.SortOrder,
    };
}

public record TechStackAreaAdminDto(
    Guid Id,
    string Icon,
    string AreaEn,
    string AreaRu,
    List<string> Technologies,
    string BenefitEn,
    string BenefitRu,
    int SortOrder);
