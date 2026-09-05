using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[Route("api/admin/services")]
[ApiController]
[Authorize]
public class AdminServicesController(IContentRepository<SiteService> repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await repository.GetAllAsync(cancellationToken);
        return Ok(items.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ServiceAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.TitleEn) || string.IsNullOrWhiteSpace(dto.TitleRu))
            return BadRequest("Title (en/ru) is required.");

        var entity = ToEntity(dto);
        await repository.AddAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ServiceAdminDto dto, CancellationToken cancellationToken)
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

    private static ServiceAdminDto ToDto(SiteService x) => new(
        x.Id, x.Icon, x.TitleEn, x.TitleRu, x.DescriptionEn, x.DescriptionRu,
        x.FeaturesEn, x.FeaturesRu, x.AudienceEn, x.AudienceRu, x.SortOrder);

    private static SiteService ToEntity(ServiceAdminDto dto) => new()
    {
        Icon = dto.Icon,
        TitleEn = dto.TitleEn,
        TitleRu = dto.TitleRu,
        DescriptionEn = dto.DescriptionEn,
        DescriptionRu = dto.DescriptionRu,
        FeaturesEn = dto.FeaturesEn,
        FeaturesRu = dto.FeaturesRu,
        AudienceEn = dto.AudienceEn,
        AudienceRu = dto.AudienceRu,
        SortOrder = dto.SortOrder,
    };
}

public record ServiceAdminDto(
    Guid Id,
    string Icon,
    string TitleEn,
    string TitleRu,
    string DescriptionEn,
    string DescriptionRu,
    List<string> FeaturesEn,
    List<string> FeaturesRu,
    string AudienceEn,
    string AudienceRu,
    int SortOrder);
