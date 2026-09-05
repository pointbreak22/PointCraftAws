namespace Domain.Entities;

public class SiteService : SiteContentEntity
{
    public string Icon { get; set; } = null!;
    public string TitleEn { get; set; } = null!;
    public string TitleRu { get; set; } = null!;
    public string DescriptionEn { get; set; } = null!;
    public string DescriptionRu { get; set; } = null!;
    public List<string> FeaturesEn { get; set; } = [];
    public List<string> FeaturesRu { get; set; } = [];
    public string AudienceEn { get; set; } = null!;
    public string AudienceRu { get; set; } = null!;
}
