namespace Domain.Entities;

public class SiteCaseStudy : SiteContentEntity
{
    /// <summary>URL segment of the project's own page (/projects/{slug}) — unique, latin, kebab-case.</summary>
    public string Slug { get; set; } = null!;
    public string TitleEn { get; set; } = null!;
    public string TitleRu { get; set; } = null!;
    public string TaskEn { get; set; } = null!;
    public string TaskRu { get; set; } = null!;
    public string SolutionEn { get; set; } = null!;
    public string SolutionRu { get; set; } = null!;
    /// <summary>Long-form architecture write-up for the project page, paragraphs separated by a blank line.</summary>
    public string BodyEn { get; set; } = "";
    public string BodyRu { get; set; } = "";
    public List<string> Stack { get; set; } = [];
    /// <summary>Slugs of the SiteServices this project demonstrates — drives "related projects" on service pages.</summary>
    public List<string> ServiceSlugs { get; set; } = [];
    /// <summary>Optional public link (demo or repository).</summary>
    public string? Url { get; set; }
    public List<CaseStudyResultValue> Results { get; set; } = [];
}
