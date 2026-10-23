using System.Text.RegularExpressions;
using Domain.Entities;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.SeedData;

// Landing content is admin-editable, so the seeder must never clobber the admin's edits — but a
// release sometimes needs to rewrite the seeded copy itself (the "PointBreak Lab" relaunch did).
// Each such rewrite is a numbered revision, applied once and recorded in AppliedContentRevisions:
//
//   revision 2 — relaunch: new services/tech stack/trust points, the first real case studies,
//                and slugs for every service and case study (they now have their own pages).
//   revision 3 — Python (Django / Flask) and Java (Spring Boot) added to the Backend tech stack.
//   revision 4 — the ARTstil case study, appended after the existing ones.
//
// A table is only rewritten when it's empty or still holds exactly the original seed (matched
// by English title); anything the admin added or renamed is kept and just gets a slug.
public static partial class ContentSeeder
{
    private const int RelaunchRevision = 2;
    private const int BackendLanguagesRevision = 3;
    private const int ArtstilRevision = 4;
    private static readonly string[] BackendLanguages = ["Python (Django / Flask)", "Java (Spring Boot)"];

    // English titles of the content seeded before the relaunch (revision 1, never recorded as a
    // row — it predates AppliedContentRevisions). Used to tell "untouched seed" from admin edits.
    private static readonly HashSet<string> OriginalTrustPoints =
        ["PageSpeed 90+ out of the box", "SSR on Angular, Next.js, or Nuxt", "Ready-made integrations: 1C, CRM, payment gateways", "Project launch in 3–6 weeks"];
    private static readonly HashSet<string> OriginalServices =
        ["Web services & custom systems", "Desktop apps: Windows & cross-platform", "SEO catalog & e-commerce", "SEO audit & performance"];
    private static readonly HashSet<string> OriginalTechStack =
        ["Frontend", "Styling", "Backend", "Desktop", "Data & cache"];

    public static async Task SeedAsync(ApplicationDbContext db, ILogger logger, CancellationToken cancellationToken = default)
    {
        var applied = await db.AppliedContentRevisions.Select(x => x.Revision).ToListAsync(cancellationToken);

        if (!applied.Contains(RelaunchRevision))
        {
            await ApplyRelaunchAsync(db, logger, cancellationToken);
            db.AppliedContentRevisions.Add(new AppliedContentRevision { Revision = RelaunchRevision, AppliedAtUtc = DateTime.UtcNow });
            await db.SaveChangesAsync(cancellationToken);
        }

        if (!applied.Contains(BackendLanguagesRevision))
        {
            await AddBackendLanguagesAsync(db, logger, cancellationToken);
            db.AppliedContentRevisions.Add(new AppliedContentRevision { Revision = BackendLanguagesRevision, AppliedAtUtc = DateTime.UtcNow });
            await db.SaveChangesAsync(cancellationToken);
        }

        if (!applied.Contains(ArtstilRevision))
        {
            await AddArtstilCaseStudyAsync(db, logger, cancellationToken);
            db.AppliedContentRevisions.Add(new AppliedContentRevision { Revision = ArtstilRevision, AppliedAtUtc = DateTime.UtcNow });
            await db.SaveChangesAsync(cancellationToken);
        }
    }

    // Goes after the admin's current case studies; skipped if the admin already made one with this slug.
    private static async Task AddArtstilCaseStudyAsync(ApplicationDbContext db, ILogger logger, CancellationToken cancellationToken)
    {
        if (await db.SiteCaseStudies.AnyAsync(x => x.Slug == ArtstilCaseStudy.Slug, cancellationToken))
        {
            logger.LogInformation("Content revision {Revision}: case study {Slug} already exists, kept as is.", ArtstilRevision, ArtstilCaseStudy.Slug);
            return;
        }

        var caseStudy = ArtstilCaseStudy.Create();
        caseStudy.Id = Guid.NewGuid();
        caseStudy.SortOrder = (await db.SiteCaseStudies.MaxAsync(x => (int?)x.SortOrder, cancellationToken) ?? 0) + 1;
        db.SiteCaseStudies.Add(caseStudy);
    }

    // Appends to whatever the Backend card holds now (the admin may have edited it) instead of
    // replacing it; skips entries already there, e.g. on a fresh DB seeded by revision 2.
    private static async Task AddBackendLanguagesAsync(ApplicationDbContext db, ILogger logger, CancellationToken cancellationToken)
    {
        var backend = await db.SiteTechStackAreas.FirstOrDefaultAsync(x => x.AreaEn == "Backend", cancellationToken);
        if (backend is null)
        {
            logger.LogInformation("Content revision {Revision}: no \"Backend\" tech stack area, nothing to add.", BackendLanguagesRevision);
            return;
        }

        backend.Technologies = [.. backend.Technologies, .. BackendLanguages.Where(x => !backend.Technologies.Contains(x))];
    }

    private static async Task ApplyRelaunchAsync(ApplicationDbContext db, ILogger logger, CancellationToken cancellationToken)
    {
        var trustPoints = await db.SiteTrustPoints.ToListAsync(cancellationToken);
        if (IsPristine(trustPoints.Select(x => x.LabelEn), OriginalTrustPoints))
        {
            db.SiteTrustPoints.RemoveRange(trustPoints);
            db.SiteTrustPoints.AddRange(WithNewIds(RelaunchContent.TrustPoints()));
        }
        else
        {
            logger.LogInformation("Content revision {Revision}: trust points were edited by the admin, kept as is.", RelaunchRevision);
        }

        var techStack = await db.SiteTechStackAreas.ToListAsync(cancellationToken);
        if (IsPristine(techStack.Select(x => x.AreaEn), OriginalTechStack))
        {
            db.SiteTechStackAreas.RemoveRange(techStack);
            db.SiteTechStackAreas.AddRange(WithNewIds(RelaunchContent.TechStack()));
        }
        else
        {
            logger.LogInformation("Content revision {Revision}: tech stack was edited by the admin, kept as is.", RelaunchRevision);
        }

        var services = await db.SiteServices.ToListAsync(cancellationToken);
        if (IsPristine(services.Select(x => x.TitleEn), OriginalServices))
        {
            db.SiteServices.RemoveRange(services);
            db.SiteServices.AddRange(WithNewIds(RelaunchContent.Services()));
        }
        else
        {
            logger.LogInformation("Content revision {Revision}: services were edited by the admin, only slugs were added.", RelaunchRevision);
            BackfillSlugs(services, x => x.Slug, (x, slug) => x.Slug = slug, x => x.TitleEn);
        }

        // Case studies were never seeded, so whatever is there is the admin's own — keep it all,
        // give it slugs, and add each relaunch case study whose slug isn't taken yet.
        var caseStudies = await db.SiteCaseStudies.ToListAsync(cancellationToken);
        BackfillSlugs(caseStudies, x => x.Slug, (x, slug) => x.Slug = slug, x => x.TitleEn);
        var takenSlugs = caseStudies.Select(x => x.Slug).ToHashSet();
        var nextSortOrder = caseStudies.Count == 0 ? 0 : caseStudies.Max(x => x.SortOrder);
        foreach (var caseStudy in WithNewIds(RelaunchContent.CaseStudies()).Where(x => !takenSlugs.Contains(x.Slug)))
        {
            caseStudy.SortOrder += nextSortOrder;
            db.SiteCaseStudies.Add(caseStudy);
        }

        if (!await db.SiteProcessSteps.AnyAsync(cancellationToken))
        {
            db.SiteProcessSteps.AddRange(
                new SiteProcessStep { Id = Guid.NewGuid(), SortOrder = 1, TitleEn = "Discovery & scope", TitleRu = "Анализ и ТЗ", DescriptionEn = "We break down the business problem and pin down requirements and boundaries.", DescriptionRu = "Разбираем задачу бизнеса, фиксируем требования и границы проекта." },
                new SiteProcessStep { Id = Guid.NewGuid(), SortOrder = 2, TitleEn = "Prototyping", TitleRu = "Прототипирование", DescriptionEn = "We put together the structure and interface, and align on them before development starts.", DescriptionRu = "Собираем структуру и интерфейс, согласовываем до начала разработки." },
                new SiteProcessStep { Id = Guid.NewGuid(), SortOrder = 3, TitleEn = "Development", TitleRu = "Разработка", DescriptionEn = "Backend and frontend move in parallel, in short iterations with demos.", DescriptionRu = "Параллельно ведём backend и frontend короткими итерациями с демо." },
                new SiteProcessStep { Id = Guid.NewGuid(), SortOrder = 4, TitleEn = "SEO setup & testing", TitleRu = "SEO-настройка и тестирование", DescriptionEn = "We configure indexing and structured data, and verify performance.", DescriptionRu = "Настраиваем индексацию, микроразметку и проверяем производительность." },
                new SiteProcessStep { Id = Guid.NewGuid(), SortOrder = 5, TitleEn = "Launch & support", TitleRu = "Релиз и поддержка", DescriptionEn = "We ship the project, hand over the source code, and stay reachable.", DescriptionRu = "Выкатываем проект, передаём исходники и остаёмся на связи." });
        }
    }

    private static bool IsPristine(IEnumerable<string> titles, HashSet<string> original) =>
        titles.All(original.Contains);

    private static List<T> WithNewIds<T>(List<T> items) where T : SiteContentEntity
    {
        foreach (var item in items) item.Id = Guid.NewGuid();
        return items;
    }

    private static void BackfillSlugs<T>(List<T> items, Func<T, string?> getSlug, Action<T, string> setSlug, Func<T, string> getTitle)
    {
        var taken = items.Select(getSlug).OfType<string>().Where(s => s.Length > 0).ToHashSet();
        foreach (var item in items.Where(x => string.IsNullOrEmpty(getSlug(x))))
        {
            var slug = UniqueSlug(Slugify(getTitle(item)), taken);
            taken.Add(slug);
            setSlug(item, slug);
        }
    }

    public static string Slugify(string text)
    {
        var slug = NonSlugChars().Replace(text.ToLowerInvariant(), "-").Trim('-');
        return slug.Length == 0 ? "item" : slug[..Math.Min(slug.Length, 80)].Trim('-');
    }

    private static string UniqueSlug(string slug, HashSet<string> taken)
    {
        var candidate = slug;
        for (var i = 2; taken.Contains(candidate); i++) candidate = $"{slug}-{i}";
        return candidate;
    }

    [GeneratedRegex("[^a-z0-9]+")]
    private static partial Regex NonSlugChars();
}
