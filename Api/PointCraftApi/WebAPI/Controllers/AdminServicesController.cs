using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.SeedData;

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
        if (await SlugTakenAsync(entity.Slug, null, cancellationToken))
            return Conflict($"Slug \"{entity.Slug}\" is already used by another service.");

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
        if (await SlugTakenAsync(entity.Slug, id, cancellationToken))
            return Conflict($"Slug \"{entity.Slug}\" is already used by another service.");

        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private async Task<bool> SlugTakenAsync(string slug, Guid? exceptId, CancellationToken cancellationToken)
        => (await repository.GetAllAsync(cancellationToken)).Any(x => x.Slug == slug && x.Id != exceptId);

    private static ServiceAdminDto ToDto(SiteService x) => new(
        x.Id, x.Slug, x.Icon, x.TitleEn, x.TitleRu, x.DescriptionEn, x.DescriptionRu,
        x.FeaturesEn, x.FeaturesRu, x.AudienceEn, x.AudienceRu, x.BodyEn, x.BodyRu, x.SortOrder);

    private static SiteService ToEntity(ServiceAdminDto dto) => new()
    {
        // A blank slug falls back to one derived from the English title; either way it's
        // normalized, so the admin can't save a slug that would break the page URL.
        Slug = ContentSeeder.Slugify(string.IsNullOrWhiteSpace(dto.Slug) ? dto.TitleEn : dto.Slug),
        Icon = dto.Icon,
        TitleEn = dto.TitleEn,
        TitleRu = dto.TitleRu,
        DescriptionEn = dto.DescriptionEn,
        DescriptionRu = dto.DescriptionRu,
        FeaturesEn = dto.FeaturesEn,
        FeaturesRu = dto.FeaturesRu,
        AudienceEn = dto.AudienceEn,
        AudienceRu = dto.AudienceRu,
        BodyEn = dto.BodyEn ?? "",
        BodyRu = dto.BodyRu ?? "",
        SortOrder = dto.SortOrder,
    };
}

public record ServiceAdminDto(
    Guid Id,
    string? Slug,
    string Icon,
    string TitleEn,
    string TitleRu,
    string DescriptionEn,
    string DescriptionRu,
    List<string> FeaturesEn,
    List<string> FeaturesRu,
    string AudienceEn,
    string AudienceRu,
    string? BodyEn,
    string? BodyRu,
    int SortOrder);
