using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

// Public read side of the site content CMS — shapes match Client/.../interfaces/content.ts
// exactly, since ContentService there just swaps a static of(...) for an HttpClient call to
// these routes with zero other changes.
[Route("api/content")]
[ApiController]
[AllowAnonymous]
public class ContentController(
    IContentRepository<SiteTrustPoint> trustPoints,
    IContentRepository<SiteService> services,
    IContentRepository<SiteTechStackArea> techStack,
    IContentRepository<SiteProcessStep> processSteps,
    IContentRepository<SiteCaseStudy> caseStudies)
    : ControllerBase
{
    private static string Pick(string en, string ru, string? locale) => locale == "ru" ? ru : en;

    [HttpGet("trust-points")]
    public async Task<IActionResult> GetTrustPoints([FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var items = await trustPoints.GetAllAsync(cancellationToken);
        return Ok(items.Select(x => new TrustPointDto(x.Icon, Pick(x.LabelEn, x.LabelRu, locale))));
    }

    [HttpGet("services")]
    public async Task<IActionResult> GetServices([FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var items = await services.GetAllAsync(cancellationToken);
        return Ok(items.Select(x => new ServiceCategoryDto(
            x.Id.ToString(),
            x.Icon,
            Pick(x.TitleEn, x.TitleRu, locale),
            Pick(x.DescriptionEn, x.DescriptionRu, locale),
            locale == "ru" ? x.FeaturesRu : x.FeaturesEn,
            Pick(x.AudienceEn, x.AudienceRu, locale))));
    }

    [HttpGet("tech-stack")]
    public async Task<IActionResult> GetTechStack([FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var items = await techStack.GetAllAsync(cancellationToken);
        return Ok(items.Select(x => new TechStackAreaDto(
            x.Id.ToString(), x.Icon, Pick(x.AreaEn, x.AreaRu, locale), x.Technologies, Pick(x.BenefitEn, x.BenefitRu, locale))));
    }

    [HttpGet("process-steps")]
    public async Task<IActionResult> GetProcessSteps([FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var items = await processSteps.GetAllAsync(cancellationToken);
        return Ok(items.Select(x => new ProcessStepDto(x.SortOrder, Pick(x.TitleEn, x.TitleRu, locale), Pick(x.DescriptionEn, x.DescriptionRu, locale))));
    }

    [HttpGet("case-studies")]
    public async Task<IActionResult> GetCaseStudies([FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var items = await caseStudies.GetAllAsync(cancellationToken);
        return Ok(items.Select(x => new CaseStudyDto(
            x.Id.ToString(),
            Pick(x.TitleEn, x.TitleRu, locale),
            Pick(x.TaskEn, x.TaskRu, locale),
            Pick(x.SolutionEn, x.SolutionRu, locale),
            x.Results.Select(r => new CaseStudyResultDto(Pick(r.LabelEn, r.LabelRu, locale), r.Value)).ToList())));
    }
}

public record TrustPointDto(string Icon, string Label);

public record ServiceCategoryDto(string Id, string Icon, string Title, string Description, List<string> Features, string Audience);

public record TechStackAreaDto(string Id, string Icon, string Area, List<string> Technologies, string Benefit);

public record ProcessStepDto(int Step, string Title, string Description);

public record CaseStudyResultDto(string Label, string Value);

public record CaseStudyDto(string Id, string Title, string Task, string Solution, List<CaseStudyResultDto> Results);
