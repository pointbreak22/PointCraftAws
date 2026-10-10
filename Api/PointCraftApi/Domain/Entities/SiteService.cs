namespace Domain.Entities;

public class SiteService : SiteContentEntity
{
    /// <summary>URL segment of the service's own page (/services/{slug}) — unique, latin, kebab-case.</summary>
    public string Slug { get; set; } = null!;
    public string Icon { get; set; } = null!;
    public string TitleEn { get; set; } = null!;
    public string TitleRu { get; set; } = null!;
    public string DescriptionEn { get; set; } = null!;
    public string DescriptionRu { get; set; } = null!;
    public List<string> FeaturesEn { get; set; } = [];
    public List<string> FeaturesRu { get; set; } = [];
    public string AudienceEn { get; set; } = null!;
    public string AudienceRu { get; set; } = null!;
    /// <summary>Long-form text for the service page, paragraphs separated by a blank line.</summary>
    public string BodyEn { get; set; } = "";
    public string BodyRu { get; set; } = "";
}
