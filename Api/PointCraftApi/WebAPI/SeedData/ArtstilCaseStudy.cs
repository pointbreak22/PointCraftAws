using Domain.Entities;

namespace WebAPI.SeedData;

// Content for revision 4 — the ARTstil case study, added next to whatever case studies the admin
// already has (see ContentSeeder).
public static class ArtstilCaseStudy
{
    public const string Slug = "artstil-advertising-store";

    public static SiteCaseStudy Create() => new()
    {
        Slug = Slug,
        TitleEn = "ARTstil: online store for an advertising agency with 1C integration",
        TitleRu = "АРТстиль: интернет-магазин рекламного агентства с обменом с 1С",
        TaskEn = "Replace an advertising agency's WordPress site with a custom store: products with prices go to the cart and checkout, services priced on request become lead forms, and every order and lead reaches 1C.",
        TaskRu = "Заменить WordPress-сайт рекламного агентства собственным магазином: товары с ценой — в корзину и заказ, услуги с ценой «от» — в заявку, а все заказы и заявки — в 1С.",
        SolutionEn = "A pnpm monorepo with Next.js 16 (App Router) and a NestJS 11 REST API on PostgreSQL and Prisma; orders and leads reach 1C and email through a transactional outbox; Docker Compose and Nginx on a single cloud VM with nightly backups.",
        SolutionRu = "pnpm-монорепозиторий: Next.js 16 (App Router) и REST API на NestJS 11 с PostgreSQL и Prisma; заказы и заявки уходят в 1С и на почту через transactional outbox; Docker Compose и Nginx на одной облачной VM с ночными бэкапами.",
        BodyEn = """
            The catalog holds two kinds of items. Products with a price, such as every road sign, go into the cart and become an order; services priced "from" or on request become a lead with the customer's preferred contact methods. The storefront is in Russian, Romanian and English with a language prefix in every URL, and the first visit picks the language from a cookie, the visitor's country and browser settings. Prices are shown in four currencies with exchange rates pulled from the national bank, and the server always recalculates the total.

            Orders and leads are written together with an outbox event in one database transaction, and a background worker delivers them to 1C and email with retries and backoff, so nothing is lost if 1C is temporarily down. The admin panel covers the catalog with photos and video, orders, leads, customers and company details, site colors, and the 1C exchange status with manual retry. Customers can sign in with Google and keep a wishlist.

            The project runs in Docker Compose behind Nginx on one cloud VM. The database and uploaded media are backed up every night, with copies also sent to Google Drive, and there are written instructions for restoring the whole site on another server.
            """,
        BodyRu = """
            В каталоге два типа позиций. Товары с ценой, например каждый дорожный знак, попадают в корзину и становятся заказом; услуги с ценой «от» или по расчёту оформляются заявкой с удобными клиенту способами связи. Витрина на русском, румынском и английском с языковым префиксом в каждом адресе, а при первом заходе язык выбирается по cookie, стране посетителя и настройкам браузера. Цены показываются в четырёх валютах по курсу национального банка, итог всегда пересчитывает сервер.

            Заказ или заявка записываются вместе с событием outbox в одной транзакции, а фоновый обработчик доставляет их в 1С и на почту с повторами и паузами между попытками, поэтому ничего не теряется, даже если 1С временно недоступна. В админке — каталог с фото и видео, заказы, заявки, клиенты и реквизиты, цвета сайта и состояние обмена с 1С с ручным повтором. Покупатели могут входить через Google и вести избранное.

            Проект работает в Docker Compose за Nginx на одной облачной VM. База и загруженные файлы каждую ночь копируются в бэкап, в том числе в Google Drive, и есть инструкция по восстановлению всего сайта на другом сервере.
            """,
        Stack = ["Next.js 16", "React", "NestJS 11", "TypeScript", "PostgreSQL 16", "Prisma", "pnpm monorepo", "Docker Compose", "Nginx", "1C integration"],
        ServiceSlugs = ["marketplaces-ecommerce", "legacy-migration", "devops-cloud"],
        Results =
        [
            new("Storefront languages", "Языка витрины", "3"),
            new("Currencies", "Валюты", "4"),
            new("Migration", "Миграция", "WordPress → Next.js"),
        ],
    };
}
