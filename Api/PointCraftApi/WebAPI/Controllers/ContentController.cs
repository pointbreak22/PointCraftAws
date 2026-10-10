using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

// Public read side of the site content CMS — shapes match Client/.../interfaces/content.ts.
// Each list endpoint returns one locale, picked by ?locale=ru|en; services and case studies also
// have a by-slug endpoint backing their own SSR pages (/services/{slug}, /projects/{slug}).
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
        return Ok(items.Select(x => ToServiceDto(x, locale)));
    }

    [HttpGet("services/{slug}")]
    public async Task<IActionResult> GetService(string slug, [FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var service = (await services.GetAllAsync(cancellationToken)).FirstOrDefault(x => x.Slug == slug);
        if (service is null) return NotFound();

        var related = (await caseStudies.GetAllAsync(cancellationToken))
            .Where(x => x.ServiceSlugs.Contains(slug))
            .Select(x => ToCaseStudyDto(x, locale))
            .ToList();

        return Ok(new ServiceDetailDto(ToServiceDto(service, locale), Pick(service.BodyEn, service.BodyRu, locale), related));
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
        return Ok(items.Select(x => ToCaseStudyDto(x, locale)));
    }

    [HttpGet("case-studies/{slug}")]
    public async Task<IActionResult> GetCaseStudy(string slug, [FromQuery] string? locale, CancellationToken cancellationToken)
    {
        var caseStudy = (await caseStudies.GetAllAsync(cancellationToken)).FirstOrDefault(x => x.Slug == slug);
        if (caseStudy is null) return NotFound();

        var relatedServices = (await services.GetAllAsync(cancellationToken))
            .Where(x => caseStudy.ServiceSlugs.Contains(x.Slug))
            .Select(x => new ServiceLinkDto(x.Slug, Pick(x.TitleEn, x.TitleRu, locale)))
            .ToList();

        return Ok(new CaseStudyDetailDto(ToCaseStudyDto(caseStudy, locale), Pick(caseStudy.BodyEn, caseStudy.BodyRu, locale), relatedServices));
    }

    private static ServiceCategoryDto ToServiceDto(SiteService x, string? locale) => new(
        x.Id.ToString(),
        x.Slug,
        x.Icon,
        Pick(x.TitleEn, x.TitleRu, locale),
        Pick(x.DescriptionEn, x.DescriptionRu, locale),
        locale == "ru" ? x.FeaturesRu : x.FeaturesEn,
        Pick(x.AudienceEn, x.AudienceRu, locale));

    private static CaseStudyDto ToCaseStudyDto(SiteCaseStudy x, string? locale) => new(
        x.Id.ToString(),
        x.Slug,
        Pick(x.TitleEn, x.TitleRu, locale),
        Pick(x.TaskEn, x.TaskRu, locale),
        Pick(x.SolutionEn, x.SolutionRu, locale),
        x.Stack,
        x.Url,
        x.Results.Select(r => new CaseStudyResultDto(Pick(r.LabelEn, r.LabelRu, locale), r.Value)).ToList());
}

public record TrustPointDto(string Icon, string Label);

public record ServiceCategoryDto(string Id, string Slug, string Icon, string Title, string Description, List<string> Features, string Audience);

public record ServiceDetailDto(ServiceCategoryDto Service, string Body, List<CaseStudyDto> RelatedProjects);

public record ServiceLinkDto(string Slug, string Title);

public record TechStackAreaDto(string Id, string Icon, string Area, List<string> Technologies, string Benefit);

public record ProcessStepDto(int Step, string Title, string Description);

public record CaseStudyResultDto(string Label, string Value);

public record CaseStudyDto(string Id, string Slug, string Title, string Task, string Solution, List<string> Stack, string? Url, List<CaseStudyResultDto> Results);

public record CaseStudyDetailDto(CaseStudyDto CaseStudy, string Body, List<ServiceLinkDto> Services);
