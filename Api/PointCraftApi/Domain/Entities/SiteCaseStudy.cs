namespace Domain.Entities;

public class SiteCaseStudy : SiteContentEntity
{
    public string TitleEn { get; set; } = null!;
    public string TitleRu { get; set; } = null!;
    public string TaskEn { get; set; } = null!;
    public string TaskRu { get; set; } = null!;
    public string SolutionEn { get; set; } = null!;
    public string SolutionRu { get; set; } = null!;
    public List<CaseStudyResultValue> Results { get; set; } = [];
}
