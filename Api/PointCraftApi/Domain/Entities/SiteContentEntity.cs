namespace Domain.Entities;

/// <summary>
/// Shared shape for admin-editable landing-page content (services, tech stack, process steps,
/// case studies, trust points). Unlike ContactRequest/TelegramSubscriber, these are written once
/// and then edited repeatedly through the admin UI, so plain public setters (no factory) —
/// there are no invariants worth protecting beyond required-field checks at the controller.
/// </summary>
public abstract class SiteContentEntity
{
    public Guid Id { get; set; }
    public int SortOrder { get; set; }
}
