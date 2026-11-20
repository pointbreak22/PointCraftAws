import { Locale } from '../interfaces/locale';

/** What the home page card, the footer and the ranking need — kept small, it ships in the initial bundle. */
export interface ProjectIdeaText {
  /** Card title and the H1 of the idea page. */
  title: string;
  /** One or two sentences for the card on the home page. */
  summary: string;
  /** Why a custom build wins here: what ready-made alternatives lack. */
  edge: string;
}

export interface ProjectIdea {
  slug: string;
  /** How often businesses ask for it on freelance marketplaces and forums, 1–5. */
  demand: number;
  /** How poorly ready-made products cover it (5 = almost no fitting alternatives), 1–5. */
  gap: number;
  /** Symbol id in public/svg/icons.svg. */
  icon: string;
  /** Slugs of the CMS services this idea belongs to (linked from the idea page). */
  services: string[];
  stack: string[];
  text: Record<Locale, ProjectIdeaText>;
}

// "Projects I can take on at any moment" — ten ready-to-start product ideas shown on the home
// page between the case studies and the contact form, ranked by demand and by the lack of
// ready-made alternatives (ideaScore), each with its own page at /ideas/:slug.
// Picked from what clients most often order on freelance marketplaces (FL.ru, Kwork, Upwork) and
// discuss on vc.ru / Reddit. The content is static (not in the CMS) so it is always in the
// server-rendered HTML. The long page texts live in project-idea-details.ts, which only the lazy
// idea page imports. When adding or renaming a slug, also update both that file and IdeaSlugs in
// Api/.../Controllers/SeoController.cs (sitemap). Never promise fixed timelines here: the owner
// wants none on the site.
export const PROJECT_IDEAS: ProjectIdea[] = [
  {
    slug: 'telegram-mini-app',
    demand: 5,
    gap: 4,
    icon: 'send',
    services: ['web-services', 'marketplaces-ecommerce'],
    stack: ['Telegram Mini Apps', 'Bot API', 'Angular / React', '.NET / NestJS', 'PostgreSQL', 'Telegram Stars / ЮKassa'],
    text: {
      ru: {
        title: 'Telegram Mini App и бот для бизнеса',
        summary:
          'Магазин, каталог, запись или программа лояльности прямо внутри Telegram: клиент заказывает и платит, не устанавливая приложение.',
        edge: 'Конструкторы Mini Apps почти не умеют оплату, CRM и нестандартную логику — их делают на заказ.',
      },
      en: {
        title: 'Telegram Mini App & business bot',
        summary:
          'A store, catalog, booking or loyalty program right inside Telegram: customers order and pay without installing an app.',
        edge: 'Mini App builders barely handle payments, CRM sync or custom logic — these apps are built to order.',
      },
    },
  },
  {
    slug: 'ai-assistant',
    demand: 5,
    gap: 4,
    icon: 'cpu',
    services: ['automation-parsing', 'web-services'],
    stack: ['OpenAI / Claude / YandexGPT', 'RAG', 'pgvector', '.NET / Python', 'Telegram / WhatsApp / сайт'],
    text: {
      ru: {
        title: 'ИИ-ассистент на базе ваших документов',
        summary:
          'Чат-бот, который отвечает клиентам и сотрудникам по вашим прайсам, регламентам и базе знаний и передаёт сложные вопросы живому менеджеру.',
        edge: 'Готовые боты не знают ваших документов и не умеют вовремя звать человека.',
      },
      en: {
        title: 'AI assistant trained on your documents',
        summary:
          'A chatbot that answers customers and staff from your price lists, policies and knowledge base, and hands tricky questions to a human.',
        edge: 'Off-the-shelf bots know nothing about your documents and cannot hand off to a human at the right time.',
      },
    },
  },
  {
    slug: 'online-booking',
    demand: 4,
    gap: 2,
    icon: 'activity',
    services: ['web-services'],
    stack: ['Angular / React', '.NET', 'PostgreSQL', 'SignalR', 'Telegram / SMS / email'],
    text: {
      ru: {
        title: 'Онлайн-запись для салона, клиники или автосервиса',
        summary:
          'Клиенты сами выбирают услугу, мастера и свободное время, получают напоминания, а вы видите расписание всех сотрудников в одном окне.',
        edge: 'Сервисы записи есть, но берут абонентскую плату и не подстраиваются под филиалы, оборудование и предоплату.',
      },
      en: {
        title: 'Online booking for salons, clinics and service shops',
        summary:
          'Customers pick a service, a specialist and a free slot themselves and get reminders, while you see every employee’s schedule in one place.',
        edge: 'Booking services exist, but they charge monthly and do not bend to locations, equipment or prepayment rules.',
      },
    },
  },
  {
    slug: 'custom-crm',
    demand: 4,
    gap: 2,
    icon: 'layers',
    services: ['web-services'],
    stack: ['.NET', 'Angular', 'PostgreSQL', 'SignalR', 'REST API'],
    text: {
      ru: {
        title: 'CRM под ваш процесс продаж',
        summary:
          'Простая CRM ровно с теми полями, статусами и ролями, которые нужны вам, вместо громоздкой коробки, которую команда так и не начала использовать.',
        edge: 'Коробочных CRM много, но они навязывают свой процесс и берут плату за каждого сотрудника.',
      },
      en: {
        title: 'A CRM built around your sales process',
        summary:
          'A simple CRM with exactly the fields, stages and roles you need — instead of a bulky off-the-shelf box your team never really adopted.',
        edge: 'There are plenty of CRMs, but they impose their own process and charge per seat.',
      },
    },
  },
  {
    slug: '1c-crm-integration',
    demand: 5,
    gap: 5,
    icon: 'plug',
    services: ['automation-parsing', 'marketplaces-ecommerce'],
    stack: ['1С (OData / HTTP-сервисы)', 'amoCRM / Битрикс24 API', 'Ozon / Wildberries API', '.NET', 'Hangfire', 'RabbitMQ'],
    text: {
      ru: {
        title: 'Интеграция сайта, 1С, CRM и маркетплейсов',
        summary:
          'Связываю системы, между которыми сейчас вручную переносят данные: заказы, остатки, цены и клиенты синхронизируются сами.',
        edge: 'Коробки нет: у каждой компании своя связка 1С, CRM, сайта и маркетплейсов.',
      },
      en: {
        title: 'Website, ERP, CRM & marketplace integration',
        summary:
          'I connect the systems your team currently copies data between by hand: orders, stock, prices and customers sync on their own.',
        edge: 'There is no box for this: every company has its own mix of ERP, CRM, website and marketplaces.',
      },
    },
  },
  {
    slug: 'marketplace-seller-analytics',
    demand: 4,
    gap: 3,
    icon: 'cart',
    services: ['marketplaces-ecommerce', 'automation-parsing'],
    stack: ['Ozon / Wildberries API', '.NET', 'PostgreSQL / ClickHouse', 'Angular', 'Hangfire'],
    text: {
      ru: {
        title: 'Аналитика и автоматизация для селлеров Ozon и Wildberries',
        summary:
          'Свой сервис для продавцов на маркетплейсах: юнит-экономика по каждому товару, остатки, реклама и автоматическое обновление цен.',
        edge: 'Сервисы аналитики есть, но считают усреднённо, а не вашу себестоимость и правила.',
      },
      en: {
        title: 'Analytics & automation for marketplace sellers',
        summary:
          'Your own tool for marketplace sellers: unit economics per product, stock levels, ads and automatic price updates.',
        edge: 'Analytics services exist, but they use averages rather than your own costs and rules.',
      },
    },
  },
  {
    slug: 'client-portal',
    demand: 3,
    gap: 4,
    icon: 'lock',
    services: ['web-services'],
    stack: ['Angular', '.NET', 'PostgreSQL', 'SignalR', 'S3', 'ЮKassa / Stripe'],
    text: {
      ru: {
        title: 'Личный кабинет клиента',
        summary:
          'Кабинет, где клиенты сами видят статусы заказов, документы, счета и переписку, а менеджеры перестают отвечать на «а что там с моим заказом?».',
        edge: 'Готовых кабинетов под конкретную CRM или 1С почти нет — их собирают под процесс.',
      },
      en: {
        title: 'Customer portal',
        summary:
          'A portal where customers see order statuses, documents, invoices and messages themselves, so managers stop answering “what’s up with my order?”.',
        edge: 'Ready-made portals for a specific CRM or ERP barely exist — they are built around the process.',
      },
    },
  },
  {
    slug: 'price-monitoring',
    demand: 4,
    gap: 3,
    icon: 'code',
    services: ['automation-parsing'],
    stack: ['Playwright', '.NET / Python', 'Proxy rotation', 'Hangfire', 'PostgreSQL', 'Google Sheets API'],
    text: {
      ru: {
        title: 'Парсер и мониторинг цен конкурентов',
        summary:
          'Сервис, который регулярно собирает цены, наличие и карточки товаров с сайтов и маркетплейсов и присылает изменения в таблицу или Telegram.',
        edge: 'Готовые мониторинги не видят нужные сайты и плохо сопоставляют товары с вашим каталогом.',
      },
      en: {
        title: 'Web scraper & competitor price monitoring',
        summary:
          'A service that regularly collects prices, availability and product data from websites and marketplaces and sends changes to a spreadsheet or Telegram.',
        edge: 'Ready-made monitors miss the sites you need and match products to your catalog poorly.',
      },
    },
  },
  {
    slug: 'inventory-management',
    demand: 3,
    gap: 3,
    icon: 'database',
    services: ['web-services', 'desktop-apps'],
    stack: ['.NET', 'Angular', 'PostgreSQL', 'Сканеры штрихкодов', 'PWA / мобильное приложение'],
    text: {
      ru: {
        title: 'Складской учёт и управление заказами',
        summary:
          'Учёт товаров, остатков и движения по складам со сканером штрихкодов — для тех, кому 1С избыточна, а Excel уже не справляется.',
        edge: 'Между Excel и тяжёлой ERP почти ничего нет — небольшой учёт под свои операции делают сами.',
      },
      en: {
        title: 'Inventory & order management system',
        summary:
          'Track goods, stock and movements across warehouses with a barcode scanner — for teams that have outgrown spreadsheets but do not need a heavy ERP.',
        edge: 'There is little between Excel and a heavy ERP — small teams get a system built around their own operations.',
      },
    },
  },
  {
    slug: 'business-dashboard',
    demand: 4,
    gap: 3,
    icon: 'monitor',
    services: ['web-services', 'automation-parsing'],
    stack: ['.NET', 'Angular', 'PostgreSQL / ClickHouse', 'Google Sheets / 1С / CRM API', 'Telegram Bot API'],
    text: {
      ru: {
        title: 'Дашборд руководителя и автоматические отчёты',
        summary:
          'Все ключевые цифры бизнеса на одном экране: продажи, деньги, реклама и работа команды собираются автоматически, а сводка приходит в Telegram.',
        edge: 'BI-платформы мощные, но требуют аналитика; простой дашборд под ваши метрики проще сделать.',
      },
      en: {
        title: 'Executive dashboard & automated reporting',
        summary:
          'All the key numbers of your business on one screen: sales, cash, ads and team performance collected automatically, with a summary sent to Telegram.',
        edge: 'BI platforms are powerful but need an analyst; a simple dashboard for your metrics is easier to build.',
      },
    },
  },
];

/** Ranking score: demand counts double, the lack of ready-made alternatives adds on top. */
export function ideaScore(idea: ProjectIdea): number {
  return idea.demand * 2 + idea.gap;
}

/** The ideas from the most to the least wanted (stable for equal scores). */
export const RANKED_PROJECT_IDEAS: ProjectIdea[] = [...PROJECT_IDEAS].sort((a, b) => ideaScore(b) - ideaScore(a));

export function findProjectIdea(slug: string): ProjectIdea | undefined {
  return PROJECT_IDEAS.find((idea) => idea.slug === slug);
}
