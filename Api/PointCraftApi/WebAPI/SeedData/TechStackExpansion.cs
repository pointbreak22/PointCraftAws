using Domain.Entities;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.SeedData;

// Content revision 5: NestJS next to Node.js, a wider Desktop card, a few more widely requested
// technologies in the existing cards, and three new cards (Mobile, AI, Integrations).
// Works on whatever the admin has now: existing cards are matched by English area name, entries
// are renamed/appended only if still missing, and a new card is skipped if one with that name exists.
public static class TechStackExpansion
{
    // Old entry → what replaces it (one or more entries, at the same position).
    private static readonly Dictionary<string, string[]> Renames = new()
    {
        ["Node.js"] = ["Node.js (NestJS / Express)"],
        ["Python (Django / Flask)"] = ["Python (Django / FastAPI)"],
        ["WPF / WinForms"] = ["WPF", "WinForms"],
    };

    private static readonly Dictionary<string, string[]> Additions = new()
    {
        ["Frontend"] = ["React", "Vue 3", "TypeScript"],
        ["Backend"] = ["Go", "REST / GraphQL / gRPC"],
        ["Real-time & background jobs"] = ["RabbitMQ", "Kafka"],
        ["Desktop"] = ["WinUI 3", "MSIX / Velopack"],
        ["Data & cache"] = ["MS SQL Server", "MySQL / MariaDB", "MongoDB", "ClickHouse", "Elasticsearch"],
        ["DevOps & cloud"] = ["Yandex Cloud", "Kubernetes", "Terraform", "Nginx", "Prometheus / Grafana", "S3 / MinIO"],
    };

    private static List<SiteTechStackArea> NewAreas() =>
    [
        new()
        {
            Icon = "smartphone",
            AreaEn = "Mobile", AreaRu = "Мобильные приложения",
            Technologies = ["React Native", "Flutter", ".NET MAUI", "PWA"],
            BenefitEn = "One codebase for iOS and Android — faster and cheaper than two native apps; a PWA when you don't need the app stores.",
            BenefitRu = "Одно приложение для iOS и Android из общего кода — быстрее и дешевле двух нативных; PWA, если магазины приложений не нужны.",
        },
        new()
        {
            Icon = "cpu",
            AreaEn = "AI & automation", AreaRu = "ИИ и автоматизация",
            Technologies = ["OpenAI / Claude API", "RAG / pgvector", "Semantic Kernel", "LangChain"],
            BenefitEn = "Chatbots, search over your knowledge base, and automatic processing of documents and requests — built into your workflow.",
            BenefitRu = "Чат-боты, поиск по базе знаний, автоматическая обработка документов и заявок — ИИ встраивается прямо в ваши процессы.",
        },
        new()
        {
            Icon = "plug",
            AreaEn = "Integrations", AreaRu = "Интеграции",
            Technologies = ["1C", "Bitrix24 / amoCRM", "YooKassa / Stripe", "Telegram Bot API"],
            BenefitEn = "The site talks to your accounting, CRM, payments, and messengers — no more copying data by hand.",
            BenefitRu = "Сайт связан с 1С, CRM, онлайн-оплатой и мессенджерами — данные больше не нужно переносить вручную.",
        },
    ];

    public static async Task ApplyAsync(ApplicationDbContext db, ILogger logger, int revision, CancellationToken cancellationToken)
    {
        var areas = await db.SiteTechStackAreas.ToListAsync(cancellationToken);

        foreach (var area in areas)
        {
            var technologies = area.Technologies
                .SelectMany(x => Renames.TryGetValue(x, out var replacement) ? replacement : [x])
                .ToList();
            if (Additions.TryGetValue(area.AreaEn, out var additions))
                technologies.AddRange(additions);

            // Assign a new list so EF sees the change (the column is a JSON-converted list).
            area.Technologies = technologies.Distinct().ToList();
        }

        var existing = areas.Select(x => x.AreaEn).ToHashSet();
        var sortOrder = areas.Count == 0 ? 0 : areas.Max(x => x.SortOrder);
        foreach (var area in NewAreas())
        {
            if (existing.Contains(area.AreaEn))
            {
                logger.LogInformation("Content revision {Revision}: tech stack area {Area} already exists, kept as is.", revision, area.AreaEn);
                continue;
            }

            area.Id = Guid.NewGuid();
            area.SortOrder = ++sortOrder;
            db.SiteTechStackAreas.Add(area);
        }
    }
}
