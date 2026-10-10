using Domain.Entities;

namespace WebAPI.SeedData;

// Content for revision 2 ("PointBreak Lab" relaunch) — see ContentSeeder. Kept apart from the
// seeder itself because it's almost entirely copy, not logic. Body texts use a blank line
// between paragraphs; the client splits on it.
public static class RelaunchContent
{
    public static List<SiteTrustPoint> TrustPoints() =>
    [
        new() { SortOrder = 1, Icon = "check", LabelEn = "Clean Architecture, CQRS and automated tests", LabelRu = "Clean Architecture, CQRS и автотесты" },
        new() { SortOrder = 2, Icon = "server", LabelEn = "SSR and SEO setup out of the box", LabelRu = "SSR и SEO-настройка из коробки" },
        new() { SortOrder = 3, Icon = "message", LabelEn = "Real-time: chat, notifications, calls", LabelRu = "Real-time: чаты, уведомления, звонки" },
        new() { SortOrder = 4, Icon = "zap", LabelEn = "MVP launch in 3–6 weeks", LabelRu = "Запуск MVP за 3–6 недель" },
    ];

    public static List<SiteTechStackArea> TechStack() =>
    [
        new()
        {
            SortOrder = 1, Icon = "zap",
            AreaEn = "Frontend", AreaRu = "Frontend",
            Technologies = ["Angular (SSR)", "Next.js (React)", "Nuxt (Vue)", "Tailwind CSS"],
            BenefitEn = "Server-side rendering out of the box — search engines get fully rendered HTML and index it faster.",
            BenefitRu = "SSR из коробки — поисковики получают готовый HTML и быстрее индексируют сайт.",
        },
        new()
        {
            SortOrder = 2, Icon = "server",
            AreaEn = "Backend", AreaRu = "Backend",
            Technologies = [".NET 10 / ASP.NET Core", "MediatR (CQRS)", "Node.js", "Laravel (PHP)"],
            BenefitEn = "Business logic split into clear layers — easy to test, extend, and hand over to another team.",
            BenefitRu = "Бизнес-логика разложена по слоям — её легко тестировать, расширять и передавать другой команде.",
        },
        new()
        {
            SortOrder = 3, Icon = "message",
            AreaEn = "Real-time & background jobs", AreaRu = "Real-time и фоновые задачи",
            Technologies = ["SignalR", "WebRTC", "Redis", "Hangfire"],
            BenefitEn = "Instant messages, live statuses, and calls; heavy work runs in queues without slowing the site down.",
            BenefitRu = "Мгновенные сообщения, живые статусы и звонки; тяжёлая работа уходит в очереди и не тормозит сайт.",
        },
        new()
        {
            SortOrder = 4, Icon = "monitor",
            AreaEn = "Desktop", AreaRu = "Desktop",
            Technologies = ["Avalonia", "WPF / WinForms", ".NET MAUI", "Electron / Tauri"],
            BenefitEn = "One codebase for Windows, macOS, and Linux — or a native Windows app when deep OS integration matters.",
            BenefitRu = "Один код для Windows, macOS и Linux — или нативное Windows-приложение, когда нужна глубокая интеграция с ОС.",
        },
        new()
        {
            SortOrder = 5, Icon = "database",
            AreaEn = "Data & cache", AreaRu = "Данные и кэш",
            Technologies = ["PostgreSQL", "SQLite", "Redis", "Entity Framework Core"],
            BenefitEn = "Reliable storage, versioned migrations, and fast responses even under heavy traffic.",
            BenefitRu = "Надёжное хранение, версионируемые миграции и быстрый отклик даже при высокой посещаемости.",
        },
        new()
        {
            SortOrder = 6, Icon = "cloud",
            AreaEn = "DevOps & cloud", AreaRu = "DevOps и облако",
            Technologies = ["Docker", "GitHub Actions", "Azure", "AWS", "Caddy"],
            BenefitEn = "Every push deploys itself: containers, CI/CD, HTTPS, and backups set up from day one.",
            BenefitRu = "Каждый push выкатывается сам: контейнеры, CI/CD, HTTPS и бэкапы настроены с первого дня.",
        },
    ];

    public static List<SiteService> Services() =>
    [
        new()
        {
            SortOrder = 1, Slug = "web-services", Icon = "layers",
            TitleEn = "Web services, SaaS & client portals", TitleRu = "Веб-сервисы, SaaS и личные кабинеты",
            DescriptionEn = "Custom web systems with complex business logic: client portals, internal tools, B2B platforms.",
            DescriptionRu = "Веб-системы со сложной бизнес-логикой: личные кабинеты, внутренние сервисы, B2B-платформы.",
            FeaturesEn =
            [
                "Role-based access, admin panel, and audit of user actions",
                "REST API with OpenAPI docs and integrations with external systems",
                "Authentication: JWT, OAuth 2.0 / OpenID Connect, two-factor login",
                "Architecture designed to grow: Clean Architecture + CQRS",
            ],
            FeaturesRu =
            [
                "Ролевая модель доступа, админ-панель и журнал действий",
                "REST API с OpenAPI-документацией и интеграции с внешними системами",
                "Авторизация: JWT, OAuth 2.0 / OpenID Connect, двухфакторный вход",
                "Архитектура с запасом под рост: Clean Architecture + CQRS",
            ],
            AudienceEn = "SaaS products, B2B portals, internal company tools",
            AudienceRu = "SaaS-продукты, B2B-порталы, внутренние сервисы компаний",
            BodyEn = """
                A web service is more than a set of pages: it's the rules your business runs on — who can see what, what happens after a payment, which statuses an order goes through. We start from those rules and only then pick the screens and the technology.

                The backend is built on .NET with Clean Architecture and CQRS: every operation is a separate command or query with its own validation and tests, so new features don't break old ones. The frontend is Angular or React with server-side rendering, so public pages are indexed by search engines from day one.

                You get the source code, API documentation, Docker deployment, and CI/CD. The project can be handed over to your own team at any moment without a rewrite.
                """,
            BodyRu = """
                Веб-сервис — это не набор страниц, а правила, по которым работает бизнес: кто что видит, что происходит после оплаты, через какие статусы проходит заказ. Мы начинаем с этих правил и только потом подбираем экраны и технологии.

                Backend строим на .NET по Clean Architecture и CQRS: каждая операция — отдельная команда или запрос со своей валидацией и тестами, поэтому новые функции не ломают старые. Frontend — Angular или React с серверным рендерингом, чтобы публичные страницы индексировались поисковиками с первого дня.

                Вы получаете исходники, документацию API, деплой в Docker и CI/CD. Проект можно передать своей команде в любой момент — без переписывания.
                """,
        },
        new()
        {
            SortOrder = 2, Slug = "marketplaces-ecommerce", Icon = "cart",
            TitleEn = "Marketplaces & online stores", TitleRu = "Маркетплейсы и интернет-магазины",
            DescriptionEn = "Stores and multi-vendor platforms that search engines rank well and buyers navigate fast.",
            DescriptionRu = "Магазины и площадки с продавцами, которые хорошо ранжируются в поиске и удобны покупателю.",
            FeaturesEn =
            [
                "SSR catalog with filters, facets, and sorting with no page reloads",
                "Cart, checkout, stock reservation, and order statuses",
                "Seller accounts, internal wallet, moderation, reviews and ratings",
                "Payments, Telegram/email notifications, sync with 1C/MoySklad",
            ],
            FeaturesRu =
            [
                "SSR-каталог с фильтрами, фасетами и сортировкой без перезагрузки",
                "Корзина, оформление заказа, резерв остатков и статусы заказов",
                "Кабинеты продавцов, внутренний кошелёк, модерация, отзывы и рейтинги",
                "Приём оплаты, уведомления в Telegram/email, синхронизация с 1С/МойСклад",
            ],
            AudienceEn = "Online stores, wholesale B2B, multi-vendor marketplaces",
            AudienceRu = "Интернет-магазины, оптовая торговля, маркетплейсы с продавцами",
            BodyEn = """
                An online store earns money when two things work: search engines show the catalog, and buyers get from a search to a paid order without friction. That's why every catalog we build renders on the server, has human-readable URLs, a dynamic sitemap, and structured data for products and reviews.

                For marketplaces the hard part is between users: an order passes from buyer to seller, money is held in an internal wallet and released after confirmation, new listings go through moderation, disputes go to an admin. We design these flows as explicit state machines, so money and statuses never get out of sync.

                Stock is reserved atomically at checkout, notifications go out through a background queue with retries, and the admin panel lets you manage the catalog without a developer.
                """,
            BodyRu = """
                Интернет-магазин приносит деньги, когда работают две вещи: поисковики показывают каталог, а покупатель без препятствий доходит от поиска до оплаченного заказа. Поэтому каждый наш каталог рендерится на сервере, имеет человекочитаемые адреса, динамический sitemap и микроразметку товаров и отзывов.

                В маркетплейсах самое сложное — между пользователями: заказ переходит от покупателя к продавцу, деньги замораживаются во внутреннем кошельке и списываются после подтверждения, новые площадки проходят модерацию, споры уходят администратору. Такие процессы мы проектируем как явные цепочки статусов, чтобы деньги и статусы никогда не расходились.

                Остатки резервируются атомарно при оформлении, уведомления уходят через фоновую очередь с повторами, а админ-панель позволяет вести каталог без программиста.
                """,
        },
        new()
        {
            SortOrder = 3, Slug = "realtime-apps", Icon = "message",
            TitleEn = "Real-time apps: chat, notifications, video calls", TitleRu = "Real-time: чаты, уведомления, видеозвонки",
            DescriptionEn = "Messengers, live dashboards, and in-app chat that update instantly for every user.",
            DescriptionRu = "Мессенджеры, живые дашборды и чаты внутри сервиса, которые обновляются у всех мгновенно.",
            FeaturesEn =
            [
                "Messages, typing indicators, and online presence over SignalR / WebSockets",
                "1:1 and group audio/video calls on WebRTC",
                "Outbox pattern and idempotent sending — no lost or duplicated messages",
                "Horizontal scaling with Redis and Azure SignalR Service",
            ],
            FeaturesRu =
            [
                "Сообщения, индикатор набора и онлайн-статусы на SignalR / WebSockets",
                "Личные и групповые аудио- и видеозвонки на WebRTC",
                "Outbox и идемпотентная отправка — сообщения не теряются и не дублируются",
                "Горизонтальное масштабирование через Redis и Azure SignalR Service",
            ],
            AudienceEn = "Messengers, support chats, marketplaces, collaborative tools",
            AudienceRu = "Мессенджеры, чаты поддержки, маркетплейсы, сервисы для совместной работы",
            BodyEn = """
                Real-time features look simple in a demo and break in production: a connection drops, a message is sent twice, a user is online on two devices. We build them on proven patterns — an outbox with a background dispatcher, idempotency keys for every send, presence stored in Redis — so they keep working under real load.

                We use SignalR for messages, statuses, and notifications, and WebRTC for audio and video calls, with the server handling only signaling. In the cloud the hub scales out through Azure SignalR Service or a Redis backplane.

                Real-time can be a product on its own (a messenger) or a layer on top of an existing service: order status updates, chat between buyer and seller, live admin dashboards.
                """,
            BodyRu = """
                Real-time-функции выглядят просто на демо и ломаются в продакшене: обрывается соединение, сообщение уходит дважды, пользователь онлайн с двух устройств. Мы строим их на проверенных паттернах — outbox с фоновым диспетчером, ключи идемпотентности на каждую отправку, присутствие в Redis — поэтому они работают под реальной нагрузкой.

                Для сообщений, статусов и уведомлений используем SignalR, для аудио- и видеозвонков — WebRTC, где сервер отвечает только за сигнализацию. В облаке хаб масштабируется через Azure SignalR Service или Redis backplane.

                Real-time может быть отдельным продуктом (мессенджер) или слоем поверх существующего сервиса: статусы заказов, чат покупателя и продавца, живые дашборды для администраторов.
                """,
        },
        new()
        {
            SortOrder = 4, Slug = "desktop-apps", Icon = "monitor",
            TitleEn = "Desktop apps for Windows, macOS & Linux", TitleRu = "Десктоп-приложения для Windows, macOS и Linux",
            DescriptionEn = "Desktop software for automation, hardware, audio, and offline work — with a plugin architecture when needed.",
            DescriptionRu = "Настольные программы для автоматизации, работы с оборудованием, звуком и офлайн-данными — с плагинами, если нужно.",
            FeaturesEn =
            [
                "Cross-platform UI on Avalonia, Electron, or Tauri — one codebase for every OS",
                "Native Windows apps on WPF / WinForms / .NET MAUI",
                "Plugin systems, MIDI devices, low-latency audio, local databases",
                "Auto-updates, installers, and signed builds",
            ],
            FeaturesRu =
            [
                "Кроссплатформенный интерфейс на Avalonia, Electron или Tauri — один код для всех ОС",
                "Нативные Windows-приложения на WPF / WinForms / .NET MAUI",
                "Плагинные системы, MIDI-устройства, звук с низкой задержкой, локальные базы",
                "Автообновление, установщики и подписанные сборки",
            ],
            AudienceEn = "Businesses with internal processes, hardware, or offline requirements; software products",
            AudienceRu = "Бизнес с внутренними процессами, оборудованием или работой без интернета; софтверные продукты",
            BodyEn = """
                Not everything belongs in a browser. When an app works with hardware, local files, sound, or has to run without internet, a desktop application is faster and more reliable than any web page.

                We build cross-platform apps on Avalonia (.NET) or a web stack in Electron/Tauri, and native Windows apps when deep OS integration matters. The UI is kept separate from the logic (MVP/MVVM), so the logic is covered by tests and the interface can be swapped without a rewrite.

                For extensible products we design plugin architectures: a plugin is built separately against a stable contract, installed from a file, loaded into an isolated context, and works in any project without rebuilding the host — the way VST plugins work in music software.
                """,
            BodyRu = """
                Не всё должно жить в браузере. Когда программа работает с оборудованием, локальными файлами, звуком или должна работать без интернета, десктоп-приложение быстрее и надёжнее любой веб-страницы.

                Делаем кроссплатформенные приложения на Avalonia (.NET) или на веб-стеке в Electron/Tauri, а нативные Windows-приложения — когда важна глубокая интеграция с ОС. Интерфейс отделён от логики (MVP/MVVM), поэтому логика покрыта тестами, а интерфейс можно заменить без переписывания.

                Для расширяемых продуктов проектируем плагинную архитектуру: плагин собирается отдельно под стабильный контракт, ставится из файла, грузится в изолированный контекст и работает в любом проекте без пересборки оболочки — как VST-плагины в музыкальных программах.
                """,
        },
        new()
        {
            SortOrder = 5, Slug = "automation-parsing", Icon = "cpu",
            TitleEn = "Data scraping, automation & integrations", TitleRu = "Парсинг, автоматизация и интеграции",
            DescriptionEn = "Collect data from websites, automate routine browser work, and connect your systems to each other.",
            DescriptionRu = "Сбор данных с сайтов, автоматизация рутинной работы в браузере и связка ваших систем между собой.",
            FeaturesEn =
            [
                "Website scraping and monitoring with Playwright, including JS-heavy sites",
                "Task queues with retries and schedules on Hangfire + Redis",
                "Proxy pools, request pacing, and live task logs in the dashboard",
                "Integrations: 1C, CRM, Telegram bots, payment gateways, third-party APIs",
            ],
            FeaturesRu =
            [
                "Парсинг и мониторинг сайтов на Playwright, в том числе сложных JS-сайтов",
                "Очереди задач с повторами и расписанием на Hangfire + Redis",
                "Пулы прокси, управление темпом запросов и живые логи задач в панели",
                "Интеграции: 1С, CRM, Telegram-боты, платёжные шлюзы, внешние API",
            ],
            AudienceEn = "Price and competitor monitoring, marketing teams, companies with manual routine",
            AudienceRu = "Мониторинг цен и конкурентов, маркетинг, компании с ручной рутиной",
            BodyEn = """
                If someone on your team spends hours copying data between websites and spreadsheets, that work can be automated. We build services that open pages in a real browser, collect or enter data, and report the result — on a schedule or on demand.

                Each job runs as a background task in a queue: it can be paused, retried after a failure, spread across proxies, and watched live in the dashboard. Settings like pacing and limits are changed in the admin panel without a release.

                The same approach connects systems that don't talk to each other: 1C and the website, CRM and the messenger, a payment gateway and order statuses.
                """,
            BodyRu = """
                Если кто-то в команде часами переносит данные между сайтами и таблицами, эту работу можно автоматизировать. Мы делаем сервисы, которые открывают страницы в настоящем браузере, собирают или вносят данные и отчитываются о результате — по расписанию или по запросу.

                Каждое задание выполняется как фоновая задача в очереди: его можно поставить на паузу, повторить после сбоя, распределить по прокси и смотреть в реальном времени в панели. Темп, лимиты и прочие настройки меняются в админке без релиза.

                Тот же подход связывает системы, которые не умеют общаться: 1С и сайт, CRM и мессенджер, платёжный шлюз и статусы заказов.
                """,
        },
        new()
        {
            SortOrder = 6, Slug = "legacy-migration", Icon = "code",
            TitleEn = "Legacy migration & refactoring", TitleRu = "Миграция и рефакторинг legacy-проектов",
            DescriptionEn = "Move an aging PHP/Laravel or monolithic project to a modern stack without stopping the business.",
            DescriptionRu = "Перенос устаревшего проекта на PHP/Laravel или монолита на современный стек без остановки бизнеса.",
            FeaturesEn =
            [
                "Code and domain audit with a step-by-step migration plan",
                "Port to .NET + Angular with Clean Architecture and CQRS",
                "Data migration that keeps every user, balance, and history record",
                "Unit and integration tests on a real database (Testcontainers)",
            ],
            FeaturesRu =
            [
                "Аудит кода и предметной области, пошаговый план миграции",
                "Перенос на .NET + Angular по Clean Architecture и CQRS",
                "Миграция данных с сохранением всех пользователей, балансов и истории",
                "Юнит- и интеграционные тесты на настоящей БД (Testcontainers)",
            ],
            AudienceEn = "Projects that became hard to change, slow, or depend on one developer",
            AudienceRu = "Проекты, которые стало сложно менять, которые тормозят или держатся на одном разработчике",
            BodyEn = """
                Rewriting a working project from scratch is risky: the old code holds years of business rules nobody wrote down. So a migration starts with an audit — we extract the domain from the existing code and database, then port it module by module.

                The new version is built on .NET and Angular with Clean Architecture: each module has clear boundaries, commands and queries are covered by unit tests, and the HTTP pipeline is tested against a real PostgreSQL in a container. On the way we fix what the old system lacked — moderation, wallets, real-time notifications, proper access control.

                Data moves physically, not by "drop and recreate": users, balances, and history are preserved byte for byte and verified after the switch.
                """,
            BodyRu = """
                Переписать работающий проект с нуля — рискованно: в старом коде годы бизнес-правил, которые никто не записал. Поэтому миграция начинается с аудита — мы извлекаем предметную область из существующего кода и базы и переносим её по модулям.

                Новая версия строится на .NET и Angular по Clean Architecture: у каждого модуля чёткие границы, команды и запросы покрыты юнит-тестами, HTTP-конвейер проверяется на настоящем PostgreSQL в контейнере. По пути добавляем то, чего не хватало старой системе, — модерацию, кошельки, real-time-уведомления, нормальное разграничение доступа.

                Данные переносятся физически, а не «удалить и создать заново»: пользователи, балансы и история сохраняются байт в байт и проверяются после переключения.
                """,
        },
        new()
        {
            SortOrder = 7, Slug = "seo-performance", Icon = "activity",
            TitleEn = "SEO audit & site performance", TitleRu = "SEO-аудит и ускорение сайта",
            DescriptionEn = "We find what's holding your site back in search and fix it at the code level.",
            DescriptionRu = "Находим, что мешает сайту расти в поиске, и исправляем это на уровне кода.",
            FeaturesEn =
            [
                "Core Web Vitals audit and optimization (LCP, INP, CLS)",
                "Moving SPA pages to SSR/prerendering so they get indexed",
                "Schema.org structured data, hreflang, canonical URLs, dynamic sitemap",
                "Google Search Console and Yandex Webmaster setup, a prioritized fix plan",
            ],
            FeaturesRu =
            [
                "Аудит и оптимизация Core Web Vitals (LCP, INP, CLS)",
                "Перевод SPA-страниц на SSR/пререндеринг, чтобы они индексировались",
                "Микроразметка Schema.org, hreflang, canonical, динамический sitemap",
                "Настройка Google Search Console и Яндекс Вебмастера, план приоритетных доработок",
            ],
            AudienceEn = "Live sites with declining traffic, SPAs that search engines don't see",
            AudienceRu = "Действующие сайты с просевшим трафиком, SPA, которые не видят поисковики",
            BodyEn = """
                Most SEO problems on modern sites are technical: pages render only in the browser and search robots see an empty template, every language lives on one URL, the sitemap is out of date, the page takes four seconds to become usable.

                We audit the site the way a search robot sees it, then fix the causes in the code: add server-side rendering or prerendering, set up canonical URLs and hreflang, generate the sitemap from the database, add structured data for the organization, services, products, and FAQ.

                The result is a list of fixes ranked by impact, and — if you want — their implementation, with before/after metrics from PageSpeed and Search Console.
                """,
            BodyRu = """
                Большинство SEO-проблем современных сайтов — технические: страницы рендерятся только в браузере и поисковый робот видит пустой шаблон, все языки живут на одном адресе, sitemap устарел, страница становится рабочей через четыре секунды.

                Мы проверяем сайт так, как его видит поисковый робот, и устраняем причины в коде: добавляем серверный рендеринг или пререндеринг, настраиваем canonical и hreflang, генерируем sitemap из базы, добавляем микроразметку организации, услуг, товаров и FAQ.

                Результат — список доработок по степени влияния и, если нужно, их реализация с метриками «до/после» из PageSpeed и Search Console.
                """,
        },
        new()
        {
            SortOrder = 8, Slug = "devops-cloud", Icon = "cloud",
            TitleEn = "DevOps, deployment & cloud", TitleRu = "DevOps, деплой и облако",
            DescriptionEn = "Docker, CI/CD, and cloud hosting on Azure or AWS — set up so releases are boring.",
            DescriptionRu = "Docker, CI/CD и хостинг в Azure или AWS — настроенные так, чтобы релизы были скучными.",
            FeaturesEn =
            [
                "Docker / Docker Compose for every environment",
                "CI/CD on GitHub Actions or Azure Pipelines: build, test, deploy",
                "Azure (App Service, Blob, Key Vault, SignalR) and AWS (EC2, S3)",
                "HTTPS, backups, secrets management, logs and error alerts in Telegram",
            ],
            FeaturesRu =
            [
                "Docker / Docker Compose для каждого окружения",
                "CI/CD на GitHub Actions или Azure Pipelines: сборка, тесты, деплой",
                "Azure (App Service, Blob, Key Vault, SignalR) и AWS (EC2, S3)",
                "HTTPS, бэкапы, хранение секретов, логи и оповещения об ошибках в Telegram",
            ],
            AudienceEn = "Projects deployed by hand, startups preparing for growth",
            AudienceRu = "Проекты, которые выкатываются вручную; стартапы, готовящиеся к росту",
            BodyEn = """
                If a release means someone connects to the server over SSH and runs commands by hand, every release is a risk. We put the project into containers and set up a pipeline: a push to the main branch builds images, runs tests, and updates the server automatically.

                We work with Azure (App Service, Blob Storage, Key Vault, Azure SignalR, Application Insights) and AWS (EC2, S3), and for small projects — a single VM with Docker Compose and Caddy for automatic HTTPS, which keeps hosting costs close to zero.

                Secrets live outside the repository, the database is backed up on a schedule, and errors arrive in Telegram before users notice them.
                """,
            BodyRu = """
                Если релиз — это когда кто-то заходит на сервер по SSH и вручную выполняет команды, каждый релиз — риск. Мы упаковываем проект в контейнеры и настраиваем конвейер: push в основную ветку собирает образы, прогоняет тесты и сам обновляет сервер.

                Работаем с Azure (App Service, Blob Storage, Key Vault, Azure SignalR, Application Insights) и AWS (EC2, S3), а для небольших проектов — одна виртуальная машина с Docker Compose и Caddy с автоматическим HTTPS, что держит стоимость хостинга почти на нуле.

                Секреты хранятся вне репозитория, база бэкапится по расписанию, а ошибки приходят в Telegram раньше, чем их заметят пользователи.
                """,
        },
    ];

    public static List<SiteCaseStudy> CaseStudies() =>
    [
        new()
        {
            SortOrder = 1, Slug = "realtime-messenger",
            TitleEn = "Real-time messenger with video calls on Azure", TitleRu = "Real-time мессенджер с видеозвонками в Azure",
            TaskEn = "Build a full messenger: private and group chats, attachments, presence, audio/video calls, and moderation — deployed in the cloud.",
            TaskRu = "Сделать полноценный мессенджер: личные и групповые чаты, вложения, онлайн-статусы, аудио- и видеозвонки и модерация — с развёртыванием в облаке.",
            SolutionEn = ".NET 10 with Clean Architecture and CQRS, SignalR for messages and call signaling, WebRTC for calls, an outbox for reliable delivery; Angular 21 client; Azure infrastructure.",
            SolutionRu = ".NET 10 по Clean Architecture и CQRS, SignalR для сообщений и сигнализации звонков, WebRTC для звонков, outbox для надёжной доставки; клиент на Angular 21; инфраструктура в Azure.",
            BodyEn = """
                The backend is split into Domain, Application, Infrastructure, and WebAPI layers; every operation is a MediatR command or query. Messages go through REST with an idempotency key and are delivered to recipients via SignalR — so a reconnect never loses or duplicates a message. Domain events are written to an outbox table and published by a background dispatcher.

                Presence and group call rooms live in Redis. 1:1 and group calls use WebRTC: the hub only relays signaling, media goes peer-to-peer. In production the hub runs on Azure SignalR Service, so the App Service itself holds no long-lived connections.

                Authentication is Microsoft Entra External ID (OIDC, JWT) with a role-based admin panel: a superadmin can ban accounts and moderate content. Avatars and attachments are stored in Azure Blob Storage, secrets in Key Vault, telemetry goes to Application Insights through OpenTelemetry.
                """,
            BodyRu = """
                Backend разделён на слои Domain, Application, Infrastructure и WebAPI; каждая операция — команда или запрос MediatR. Сообщения отправляются через REST с ключом идемпотентности и доставляются получателям через SignalR — переподключение не теряет и не дублирует сообщения. Доменные события записываются в outbox-таблицу и публикуются фоновым диспетчером.

                Онлайн-статусы и комнаты групповых звонков хранятся в Redis. Личные и групповые звонки работают на WebRTC: хаб передаёт только сигнализацию, медиа идёт напрямую между участниками. В продакшене хаб работает через Azure SignalR Service, поэтому App Service не держит долгих соединений.

                Авторизация — Microsoft Entra External ID (OIDC, JWT) с ролевой админ-панелью: суперадмин может блокировать аккаунты и модерировать контент. Аватары и вложения хранятся в Azure Blob Storage, секреты — в Key Vault, телеметрия уходит в Application Insights через OpenTelemetry.
                """,
            Stack = [".NET 10", "ASP.NET Core", "MediatR (CQRS)", "SignalR", "WebRTC", "Redis", "PostgreSQL", "Angular 21", "Azure", "OpenTelemetry"],
            ServiceSlugs = ["realtime-apps", "web-services", "devops-cloud"],
            Url = "https://github.com/pointbreak22/MessengerApi",
            Results =
            [
                new("Calls", "Звонки", "WebRTC"),
                new("Delivery guarantee", "Гарантия доставки", "Outbox"),
                new("Cloud", "Облако", "Azure"),
            ],
        },
        new()
        {
            SortOrder = 2, Slug = "seo-link-marketplace",
            TitleEn = "SEO link-building marketplace: Laravel → .NET migration", TitleRu = "Биржа SEO-ссылок: миграция с Laravel на .NET",
            TaskEn = "Port a link-building marketplace from Laravel + Vue to .NET + Angular, keeping all users and balances, and add the modules the original lacked.",
            TaskRu = "Перенести биржу размещения ссылок с Laravel + Vue на .NET + Angular, сохранив всех пользователей и балансы, и добавить модули, которых не было в оригинале.",
            SolutionEn = "Clean Architecture + CQRS with a separate Identity bounded context, an internal wallet, moderation, order chat, and SignalR notifications; physical data migration with verification.",
            SolutionRu = "Clean Architecture + CQRS с отдельным Identity-контекстом, внутренний кошелёк, модерация, чат по заказу и уведомления на SignalR; физическая миграция данных с проверкой.",
            BodyEn = """
                Buyers (SEO specialists) create projects, pick sites from a catalog, and order link placements; sellers (webmasters) accept orders, publish links, and confirm publication. Money is held in an internal wallet and moves to the seller only after confirmation; new sites go through moderation and ownership verification; each order has its own chat, reviews, and ratings.

                Registration and login live in a separate Identity module with its own Domain/Application/Infrastructure projects and its own Postgres schema and migration history — so business data can be wiped or rebuilt without losing accounts. Balance moved out of the user entity into a Wallet aggregate, because money belongs to the marketplace, not to identity.

                Existing data was migrated physically: tables were moved to the new schema with ALTER TABLE … SET SCHEMA, so every foreign key kept working and 40+ existing users kept their balances to the cent. Command and query handlers are covered by xUnit + Moq tests; the HTTP pipeline is tested with WebApplicationFactory against a real PostgreSQL in Testcontainers.
                """,
            BodyRu = """
                Покупатели (оптимизаторы) создают проекты, выбирают площадки в каталоге и заказывают размещение ссылок; продавцы (вебмастеры) принимают заказы, публикуют ссылки и подтверждают публикацию. Деньги замораживаются во внутреннем кошельке и переходят продавцу только после подтверждения; новые площадки проходят модерацию и проверку владения; у каждого заказа есть свой чат, отзывы и рейтинг.

                Регистрация и вход вынесены в отдельный Identity-модуль со своими Domain/Application/Infrastructure, своей схемой Postgres и своей историей миграций — бизнес-данные можно очистить или пересобрать без потери аккаунтов. Баланс переехал из пользователя в отдельный агрегат Wallet: деньги — это понятие маркетплейса, а не учётной записи.

                Данные перенесены физически: таблицы переехали в новую схему через ALTER TABLE … SET SCHEMA, поэтому все внешние ключи продолжили работать, а 40+ существующих пользователей сохранили балансы до копейки. Обработчики команд и запросов покрыты тестами на xUnit + Moq, HTTP-конвейер проверяется через WebApplicationFactory на настоящем PostgreSQL в Testcontainers.
                """,
            Stack = [".NET 10", "MediatR (CQRS)", "EF Core", "PostgreSQL", "SignalR", "JWT + refresh tokens", "Angular 21", "xUnit", "Testcontainers", "GitHub Actions"],
            ServiceSlugs = ["marketplaces-ecommerce", "legacy-migration", "realtime-apps", "web-services"],
            Url = "https://github.com/pointbreak22/PointBreakLinks",
            Results =
            [
                new("Business modules", "Бизнес-модулей", "15"),
                new("Users migrated without loss", "Пользователей перенесено без потерь", "40+"),
                new("DDD bounded contexts", "Контекста DDD", "2"),
            ],
        },
        new()
        {
            SortOrder = 3, Slug = "msys-music-workstation",
            TitleEn = "Msys: a plugin-based music workstation", TitleRu = "Msys: музыкальная студия на плагинах",
            TaskEn = "Build a cross-platform music application in the spirit of FL Studio: instrument plugins, a shared synth engine, a timeline with mixing and export, and group work over the network.",
            TaskRu = "Сделать кроссплатформенную музыкальную программу в духе FL Studio: плагины-инструменты, общий движок синтеза, таймлайн со сведением и экспортом и совместная работа по сети.",
            SolutionEn = "An Avalonia shell that knows only plugin contracts, six instrument plugins built on MVP, its own synthesis core, MIDI and low-latency audio backends, and a collaborative session protocol.",
            SolutionRu = "Оболочка на Avalonia, которая знает только контракты плагинов, шесть плагинов-инструментов на MVP, собственное ядро синтеза, MIDI и аудио-бэкенды с низкой задержкой и протокол совместной сессии.",
            BodyEn = """
                The system is split into layers: Msys.Core (audio sources, effects, export, MIDI — no UI), Msys.Synth (string modeling, sampler, modular synthesis), Msys.Plugins (plugin contracts and shared parts), Msys.Widgets (shared controls), and Msys.Shell — the Avalonia application with projects, a timeline, and a mixer. The shell knows nothing about specific instruments, only the contracts.

                Six instruments are separate plugins — guitar, piano, recorder, drum pad, launchpad, and a modular synth that serves as a sound source for the others. Each follows the same MVP structure: the window only assembles views, all logic lives in a session (presenter) covered by tests. Third-party plugins work like VST: built against the contracts, installed from a .dll, loaded into an isolated assembly context, and — in a group session — downloaded from the host if a participant doesn't have one.

                The timeline supports pattern blocks with volume and fades, multi-selection, mute/solo, loop regions, and a metronome; the mixer exports to WAV/MP3. In a collaborative session several people edit one project from their own machines and see each other's cursors and selections. Audio runs on WASAPI/WinMM on Windows and PortAudio elsewhere.
                """,
            BodyRu = """
                Система разложена по слоям: Msys.Core (источники звука, эффекты, экспорт, MIDI — без UI), Msys.Synth (модель струны, семплер, модульный синтез), Msys.Plugins (контракты плагинов и общие части), Msys.Widgets (общие контролы) и Msys.Shell — приложение на Avalonia с проектами, таймлайном и микшером. Оболочка ничего не знает о конкретных инструментах — только о контрактах.

                Шесть инструментов — отдельные плагины: гитара, пианино, блок-флейта, драм-пэд, лаунчпад и модульный синтезатор, который служит источником звука для остальных. Все устроены по одному образцу MVP: окно только собирает части, вся логика — в сессии (presenter), покрытой тестами. Сторонние плагины работают как VST: собираются под контракты, ставятся из .dll, грузятся в изолированный контекст сборок, а в совместной сессии скачиваются у хоста, если у участника плагина нет.

                Таймлайн поддерживает блоки-паттерны с громкостью и затуханием, множественное выделение, mute/solo, зацикливание и метроном; микшер экспортирует в WAV/MP3. В совместной сессии несколько человек правят один проект со своих машин и видят курсоры и выделения друг друга. Звук — WASAPI/WinMM на Windows и PortAudio на остальных ОС.
                """,
            Stack = ["C# / .NET", "Avalonia", "MVP", "NAudio (WASAPI)", "PortAudio", "MIDI", "xUnit", "Avalonia.Headless"],
            ServiceSlugs = ["desktop-apps"],
            Results =
            [
                new("Instrument plugins", "Плагинов-инструментов", "6"),
                new("Automated tests", "Автотестов", "1 200+"),
                new("Lines of C#", "Строк C#", "74 000"),
            ],
        },
        new()
        {
            SortOrder = 4, Slug = "wholesale-ecommerce-store",
            TitleEn = "Wholesale online store with SSR and an admin panel", TitleRu = "Оптовый интернет-магазин с SSR и админ-панелью",
            TaskEn = "Build an SEO-friendly wholesale storefront: catalog with filters, cart, checkout with regional delivery and payment options, reviews, and a full admin panel.",
            TaskRu = "Сделать оптовый магазин, удобный для SEO: каталог с фильтрами, корзина, оформление заказа с региональными способами доставки и оплаты, отзывы и полноценная админ-панель.",
            SolutionEn = "Angular 21 with SSR and a .NET CQRS backend; OpenIddict authorization server (Authorization Code + PKCE); atomic stock reservation; notifications through a background queue.",
            SolutionRu = "Angular 21 с SSR и backend на .NET CQRS; сервер авторизации OpenIddict (Authorization Code + PKCE); атомарный резерв остатков; уведомления через фоновую очередь.",
            BodyEn = """
                The storefront renders on the server: every category, product, and filter combination has its own URL (filters, sorting, and pagination live in the query string), so any view can be shared and indexed. Sitemap and robots are generated by the app; product pages carry reviews and ratings.

                At checkout, stock is reserved atomically — a conditional UPDATE inside a transaction — so two buyers can't purchase the last pack; cancelling an order returns the stock. Delivery and payment options depend on each other and are validated on both client and server. Order notifications go to Telegram and email through a background queue with retries. The payment gateway sits behind an interface, ready for the region's bank acquiring.

                Authentication runs on a separate OpenIddict authorization server with Authorization Code + PKCE, roles, and password recovery. The API client on the frontend is generated from OpenAPI (Orval). Handlers are covered by xUnit tests, database tests run against a throwaway PostgreSQL.
                """,
            BodyRu = """
                Витрина рендерится на сервере: у каждой категории, товара и комбинации фильтров свой адрес (фильтры, сортировка и страницы хранятся в query string), поэтому любую выборку можно отправить ссылкой и проиндексировать. Sitemap и robots генерирует приложение, на страницах товаров — отзывы и рейтинг.

                При оформлении остатки резервируются атомарно — условный UPDATE внутри транзакции, — поэтому два покупателя не купят последнюю упаковку; отмена заказа возвращает остатки. Способы доставки и оплаты зависят друг от друга и проверяются и на клиенте, и на сервере. Уведомления о заказах уходят в Telegram и на email через фоновую очередь с повторами. Платёжный шлюз вынесен за интерфейс и готов к подключению банковского эквайринга региона.

                Авторизация — отдельный сервер OpenIddict с Authorization Code + PKCE, ролями и восстановлением пароля. API-клиент на фронтенде генерируется из OpenAPI (Orval). Обработчики покрыты тестами на xUnit, тесты базы данных идут на одноразовом PostgreSQL.
                """,
            Stack = ["Angular 21 (SSR)", "Tailwind CSS", ".NET 10", "MediatR (CQRS)", "EF Core", "PostgreSQL", "OpenIddict", "Orval", "xUnit"],
            ServiceSlugs = ["marketplaces-ecommerce", "seo-performance", "web-services"],
            Results =
            [
                new("Rendering", "Рендеринг", "SSR"),
                new("Payment methods", "Способов оплаты", "4"),
                new("Delivery methods", "Способа доставки", "3"),
            ],
        },
        new()
        {
            SortOrder = 5, Slug = "browser-automation-platform",
            TitleEn = "Browser automation platform with task queues", TitleRu = "Платформа автоматизации в браузере с очередями задач",
            TaskEn = "Build a service that runs browser scenarios at scale: many accounts, proxies, schedules, monitoring, and live logs for the operator.",
            TaskRu = "Сделать сервис, который массово выполняет сценарии в браузере: много аккаунтов, прокси, расписания, мониторинг и живые логи для оператора.",
            SolutionEn = "Playwright workers driven by Hangfire queues on Redis, an OpenIddict identity server, SignalR for live task status, and an Angular control panel.",
            SolutionRu = "Воркеры на Playwright под управлением очередей Hangfire на Redis, сервер авторизации OpenIddict, SignalR для живых статусов задач и панель управления на Angular.",
            BodyEn = """
                An operator creates a task — which accounts, which scenario, which pace — and the platform splits it into background jobs. Each job opens a real browser through Playwright, signs in with the account's chosen method, performs the scenario, and writes a log entry. Jobs are queued in Hangfire on Redis, so they survive restarts, retry after failures, and can be paused.

                Accounts, proxies (with type and status), and system settings are managed in the panel; pacing presets set the delay range between actions. Every change to a task or account is pushed to the panel over SignalR, so the operator watches progress and logs live without refreshing.

                Identity is a separate service: ASP.NET Identity users behind an OpenIddict authorization server, with the API validating its tokens. The whole system — API, identity server, headless browser, Redis, PostgreSQL, and the client — runs in Docker Compose.
                """,
            BodyRu = """
                Оператор создаёт задачу — какие аккаунты, какой сценарий, в каком темпе, — и платформа раскладывает её на фоновые задания. Каждое задание открывает настоящий браузер через Playwright, входит выбранным для аккаунта способом, выполняет сценарий и пишет запись в лог. Задания стоят в очереди Hangfire на Redis, поэтому переживают перезапуск, повторяются после сбоя и ставятся на паузу.

                Аккаунты, прокси (с типом и статусом) и системные настройки управляются из панели; пресеты темпа задают диапазон задержек между действиями. Любое изменение задачи или аккаунта приходит в панель через SignalR — оператор видит прогресс и логи в реальном времени без обновления страницы.

                Авторизация — отдельный сервис: пользователи ASP.NET Identity за сервером OpenIddict, API проверяет его токены. Вся система — API, сервер авторизации, браузер, Redis, PostgreSQL и клиент — запускается в Docker Compose.
                """,
            Stack = [".NET 10", "Playwright", "Hangfire", "Redis", "PostgreSQL", "OpenIddict", "SignalR", "Angular", "Docker"],
            ServiceSlugs = ["automation-parsing", "web-services"],
            Results =
            [
                new("Task queue", "Очередь задач", "Hangfire"),
                new("Live updates", "Живые обновления", "SignalR"),
                new("Services in Docker", "Сервисов в Docker", "6"),
            ],
        },
    ];
}
