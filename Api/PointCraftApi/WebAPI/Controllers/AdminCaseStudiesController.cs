using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.SeedData;

namespace WebAPI.Controllers;

[Route("api/admin/case-studies")]
[ApiController]
[Authorize]
public class AdminCaseStudiesController(IContentRepository<SiteCaseStudy> repository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await repository.GetAllAsync(cancellationToken);
        return Ok(items.Select(ToDto));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CaseStudyAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.TitleEn) || string.IsNullOrWhiteSpace(dto.TitleRu))
            return BadRequest("Title (en/ru) is required.");

        var entity = ToEntity(dto);
        if (await SlugTakenAsync(entity.Slug, null, cancellationToken))
            return Conflict($"Slug \"{entity.Slug}\" is already used by another case study.");

        await repository.AddAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CaseStudyAdminDto dto, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(dto.TitleEn) || string.IsNullOrWhiteSpace(dto.TitleRu))
            return BadRequest("Title (en/ru) is required.");

        var entity = ToEntity(dto);
        entity.Id = id;
        if (await SlugTakenAsync(entity.Slug, id, cancellationToken))
            return Conflict($"Slug \"{entity.Slug}\" is already used by another case study.");

        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private async Task<bool> SlugTakenAsync(string slug, Guid? exceptId, CancellationToken cancellationToken)
        => (await repository.GetAllAsync(cancellationToken)).Any(x => x.Slug == slug && x.Id != exceptId);

    private static CaseStudyAdminDto ToDto(SiteCaseStudy x) => new(
        x.Id, x.Slug, x.TitleEn, x.TitleRu, x.TaskEn, x.TaskRu, x.SolutionEn, x.SolutionRu,
        x.BodyEn, x.BodyRu, x.Stack, x.ServiceSlugs, x.Url,
        x.Results.Select(r => new CaseStudyResultAdminDto(r.LabelEn, r.LabelRu, r.Value)).ToList(),
        x.SortOrder);

    private static SiteCaseStudy ToEntity(CaseStudyAdminDto dto) => new()
    {
        Slug = ContentSeeder.Slugify(string.IsNullOrWhiteSpace(dto.Slug) ? dto.TitleEn : dto.Slug),
        TitleEn = dto.TitleEn,
        TitleRu = dto.TitleRu,
        TaskEn = dto.TaskEn,
        TaskRu = dto.TaskRu,
        SolutionEn = dto.SolutionEn,
        SolutionRu = dto.SolutionRu,
        BodyEn = dto.BodyEn ?? "",
        BodyRu = dto.BodyRu ?? "",
        Stack = dto.Stack ?? [],
        ServiceSlugs = dto.ServiceSlugs ?? [],
        Url = string.IsNullOrWhiteSpace(dto.Url) ? null : dto.Url.Trim(),
        Results = dto.Results.Select(r => new CaseStudyResultValue(r.LabelEn, r.LabelRu, r.Value)).ToList(),
        SortOrder = dto.SortOrder,
    };
}

public record CaseStudyResultAdminDto(string LabelEn, string LabelRu, string Value);

public record CaseStudyAdminDto(
    Guid Id,
    string? Slug,
    string TitleEn,
    string TitleRu,
    string TaskEn,
    string TaskRu,
    string SolutionEn,
    string SolutionRu,
    string? BodyEn,
    string? BodyRu,
    List<string>? Stack,
    List<string>? ServiceSlugs,
    string? Url,
    List<CaseStudyResultAdminDto> Results,
    int SortOrder);
