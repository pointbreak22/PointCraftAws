using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        await repository.UpdateAsync(entity, cancellationToken);
        return Ok(ToDto(entity));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        => await repository.DeleteAsync(id, cancellationToken) ? NoContent() : NotFound();

    private static CaseStudyAdminDto ToDto(SiteCaseStudy x) => new(
        x.Id, x.TitleEn, x.TitleRu, x.TaskEn, x.TaskRu, x.SolutionEn, x.SolutionRu,
        x.Results.Select(r => new CaseStudyResultAdminDto(r.LabelEn, r.LabelRu, r.Value)).ToList(),
        x.SortOrder);

    private static SiteCaseStudy ToEntity(CaseStudyAdminDto dto) => new()
    {
        TitleEn = dto.TitleEn,
        TitleRu = dto.TitleRu,
        TaskEn = dto.TaskEn,
        TaskRu = dto.TaskRu,
        SolutionEn = dto.SolutionEn,
        SolutionRu = dto.SolutionRu,
        Results = dto.Results.Select(r => new CaseStudyResultValue(r.LabelEn, r.LabelRu, r.Value)).ToList(),
        SortOrder = dto.SortOrder,
    };
}

public record CaseStudyResultAdminDto(string LabelEn, string LabelRu, string Value);

public record CaseStudyAdminDto(
    Guid Id,
    string TitleEn,
    string TitleRu,
    string TaskEn,
    string TaskRu,
    string SolutionEn,
    string SolutionRu,
    List<CaseStudyResultAdminDto> Results,
    int SortOrder);
