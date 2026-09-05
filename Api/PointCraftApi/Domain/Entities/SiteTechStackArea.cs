namespace Domain.Entities;

public class SiteTechStackArea : SiteContentEntity
{
    public string Icon { get; set; } = null!;
    public string AreaEn { get; set; } = null!;
    public string AreaRu { get; set; } = null!;
    public List<string> Technologies { get; set; } = [];
    public string BenefitEn { get; set; } = null!;
    public string BenefitRu { get; set; } = null!;
}
