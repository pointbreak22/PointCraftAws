using Domain.Entities;
using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.SeedData;

// One-time transcription of the content that used to be hardcoded in the Angular
// ContentService (Client/.../services/content.service.ts) — runs on every startup but only
// inserts when a table is empty, so it's a no-op once the admin has edited anything.
// SiteCaseStudies is deliberately left unseeded: the site's case-studies section already
// renders an empty state, which is exactly right until the admin adds real ones.
public static class ContentSeeder
{
    public static async Task SeedAsync(ApplicationDbContext db, CancellationToken cancellationToken = default)
    {
        if (!await db.SiteTrustPoints.AnyAsync(cancellationToken))
        {
            db.SiteTrustPoints.AddRange(
                new SiteTrustPoint { Id = Guid.NewGuid(), SortOrder = 1, Icon = "check", LabelEn = "PageSpeed 90+ out of the box", LabelRu = "PageSpeed 90+ из коробки" },
                new SiteTrustPoint { Id = Guid.NewGuid(), SortOrder = 2, Icon = "server", LabelEn = "SSR on Angular, Next.js, or Nuxt", LabelRu = "SSR на Angular, Next.js или Nuxt" },
                new SiteTrustPoint { Id = Guid.NewGuid(), SortOrder = 3, Icon = "layers", LabelEn = "Ready-made integrations: 1C, CRM, payment gateways", LabelRu = "Готовые интеграции: 1С, CRM, эквайринг" },
                new SiteTrustPoint { Id = Guid.NewGuid(), SortOrder = 4, Icon = "zap", LabelEn = "Project launch in 3–6 weeks", LabelRu = "Запуск проекта за 3–6 недель" });
        }

        if (!await db.SiteServices.AnyAsync(cancellationToken))
        {
            db.SiteServices.AddRange(
                new SiteService
                {
                    Id = Guid.NewGuid(), SortOrder = 1, Icon = "layers",
                    TitleEn = "Web services & custom systems", TitleRu = "Веб-сервис и кастомные системы",
                    DescriptionEn = "Client dashboards and internal services built on complex business logic.",
                    DescriptionRu = "Личные кабинеты и внутренние сервисы со сложной бизнес-логикой.",
                    FeaturesEn =
                    [
                        "Client dashboard with role-based access",
                        "REST API and integrations with external systems",
                        "PWA — install the site as an app",
                        "Architecture designed to scale with load",
                    ],
                    FeaturesRu =
                    [
                        "Личный кабинет и ролевая модель доступа",
                        "REST API и интеграции с внешними системами",
                        "PWA — установка сайта как приложения",
                        "Проектирование с запасом под рост нагрузки",
                    ],
                    AudienceEn = "SaaS products, B2B portals, booking services",
                    AudienceRu = "SaaS-продукты, B2B-порталы, сервисы бронирования",
                },
                new SiteService
                {
                    Id = Guid.NewGuid(), SortOrder = 2, Icon = "monitor",
                    TitleEn = "Desktop apps: Windows & cross-platform", TitleRu = "Desktop-приложения: Windows и кроссплатформенные",
                    DescriptionEn = "Desktop software for process automation, hardware integration, and local databases.",
                    DescriptionRu = "Настольные решения для автоматизации процессов, работы с оборудованием и локальными базами данных.",
                    FeaturesEn =
                    [
                        "Cross-platform (Windows/macOS/Linux) with Tauri or Electron — one codebase, every OS",
                        "Native Windows apps on .NET MAUI/WPF for deep OS integration",
                        "Works with local hardware, files, and offline databases",
                        "Auto-updates and signed builds for distribution",
                    ],
                    FeaturesRu =
                    [
                        "Кроссплатформенно (Windows/macOS/Linux) на Tauri или Electron — один код, все ОС",
                        "Нативные Windows-приложения на .NET MAUI/WPF при глубокой интеграции с ОС",
                        "Работа с локальным оборудованием, файлами и офлайн-базами данных",
                        "Автообновление и подписанные сборки для дистрибуции",
                    ],
                    AudienceEn = "Businesses with internal processes, hardware, or offline requirements",
                    AudienceRu = "Бизнес с внутренними процессами, оборудованием или задачами без постоянного интернета",
                },
                new SiteService
                {
                    Id = Guid.NewGuid(), SortOrder = 3, Icon = "cart",
                    TitleEn = "SEO catalog & e-commerce", TitleRu = "SEO-каталог и e-commerce",
                    DescriptionEn = "A catalog search engines rank well and shoppers can navigate fast.",
                    DescriptionRu = "Каталог, который поисковики хорошо ранжируют, а покупатели быстро находят нужный товар.",
                    FeaturesEn =
                    [
                        "SSR rendering (Angular, Next.js, Nuxt)",
                        "Smart filters with no page reloads",
                        "Payment processing and sync with 1C/MoySklad",
                        "Dynamic sitemap and query-targeted landing pages",
                    ],
                    FeaturesRu =
                    [
                        "SSR-рендеринг (Angular, Next.js, Nuxt)",
                        "Умные фильтры без перезагрузки страницы",
                        "Приём оплаты и синхронизация с 1С/МойСклад",
                        "Динамический sitemap и страницы под запросы",
                    ],
                    AudienceEn = "Online stores and B2B portals",
                    AudienceRu = "Интернет-магазины и B2B-порталы",
                },
                new SiteService
                {
                    Id = Guid.NewGuid(), SortOrder = 4, Icon = "activity",
                    TitleEn = "SEO audit & performance", TitleRu = "SEO-аудит и ускорение",
                    DescriptionEn = "We find what's holding your site back in search and fix it.",
                    DescriptionRu = "Находим, что мешает сайту расти в поиске, и устраняем это.",
                    FeaturesEn =
                    [
                        "Core Web Vitals audit and optimization",
                        "Fixing indexing errors",
                        "Schema.org structured data",
                        "A prioritized roadmap of fixes",
                    ],
                    FeaturesRu =
                    [
                        "Аудит и оптимизация Core Web Vitals",
                        "Исправление ошибок индексации",
                        "Микроразметка Schema.org",
                        "План приоритетных доработок",
                    ],
                    AudienceEn = "Live sites with declining traffic",
                    AudienceRu = "Действующие сайты с просевшим трафиком",
                });
        }

        if (!await db.SiteTechStackAreas.AnyAsync(cancellationToken))
        {
            db.SiteTechStackAreas.AddRange(
                new SiteTechStackArea
                {
                    Id = Guid.NewGuid(), SortOrder = 1, Icon = "zap",
                    AreaEn = "Frontend", AreaRu = "Frontend",
                    Technologies = ["Angular", "Next.js (React)", "Nuxt (Vue)"],
                    BenefitEn = "SSR out of the box — search engines get fully rendered HTML and index it faster.",
                    BenefitRu = "SSR из коробки — поисковики получают готовый HTML и быстрее индексируют сайт.",
                },
                new SiteTechStackArea
                {
                    Id = Guid.NewGuid(), SortOrder = 2, Icon = "layers",
                    AreaEn = "Styling", AreaRu = "Стилизация",
                    Technologies = ["Tailwind CSS", "Component UI libraries"],
                    BenefitEn = "Fast styling, responsive by default, and a minimal CSS payload.",
                    BenefitRu = "Быстрая вёрстка, адаптивность из коробки и минимальный вес стилей.",
                },
                new SiteTechStackArea
                {
                    Id = Guid.NewGuid(), SortOrder = 3, Icon = "server",
                    AreaEn = "Backend", AreaRu = "Backend",
                    Technologies = [".NET (C#)", "Node.js", "Python"],
                    BenefitEn = "Solid business logic, microservices, and integrations that hold up under load.",
                    BenefitRu = "Устойчивая бизнес-логика, микросервисы и интеграции без компромиссов в нагрузке.",
                },
                new SiteTechStackArea
                {
                    Id = Guid.NewGuid(), SortOrder = 4, Icon = "monitor",
                    AreaEn = "Desktop", AreaRu = "Desktop",
                    Technologies = ["Tauri", "Electron", ".NET MAUI"],
                    BenefitEn = "Cross-platform desktop apps on a web stack — one codebase, three operating systems.",
                    BenefitRu = "Кроссплатформенные десктоп-приложения на веб-стеке — один код, три ОС.",
                },
                new SiteTechStackArea
                {
                    Id = Guid.NewGuid(), SortOrder = 5, Icon = "database",
                    AreaEn = "Data & cache", AreaRu = "Данные и кэш",
                    Technologies = ["PostgreSQL", "Redis", "Entity Framework Core"],
                    BenefitEn = "Reliable data storage and fast responses even under heavy traffic.",
                    BenefitRu = "Надёжное хранение данных и быстрый отклик даже при высокой посещаемости.",
                });
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

        await db.SaveChangesAsync(cancellationToken);
    }
}
