namespace Domain.Entities;

/// <summary>
/// One row per content revision ContentSeeder has applied — lets a later release rewrite the
/// seeded landing content exactly once (on the next startup) instead of only ever seeding
/// empty tables, without re-applying it on every restart or over the admin's later edits.
/// </summary>
public class AppliedContentRevision
{
    public int Revision { get; set; }
    public DateTime AppliedAtUtc { get; set; }
}
