namespace Domain.Entities;

// Displayed step number is SortOrder — no separate field for it.
public class SiteProcessStep : SiteContentEntity
{
    public string TitleEn { get; set; } = null!;
    public string TitleRu { get; set; } = null!;
    public string DescriptionEn { get; set; } = null!;
    public string DescriptionRu { get; set; } = null!;
}
