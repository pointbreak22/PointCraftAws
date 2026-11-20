import { Locale } from '../interfaces/locale';

/** The long texts of an idea page (see project-ideas.ts), imported only by the lazy IdeaPage. */
export interface ProjectIdeaDetails {
  /** Opening paragraphs: the problem and how the solution covers it. */
  intro: string[];
  /** What the finished product does. */
  features: string[];
  /** Kinds of businesses that order this. */
  audience: string[];
  /** <title> of the idea page, written around what people type into search. */
  seoTitle: string;
  /** Snippet text, under ~160 characters. */
  seoDescription: string;
  keywords: string[];
}

export const PROJECT_IDEA_DETAILS: Record<string, Record<Locale, ProjectIdeaDetails>> = {
  'telegram-mini-app': {
    ru: {
      intro: [
        'Telegram Mini App — это полноценное веб-приложение, которое открывается внутри мессенджера. Клиенту не нужно скачивать приложение из стора или искать ваш сайт: он заходит в бота, листает каталог, оформляет заказ и оплачивает его в пару касаний.',
        'Это один из самых частых запросов на фриланс-биржах: бизнес уже ведёт канал или чат в Telegram и хочет продавать там же, где живёт аудитория. Делаю Mini App вместе с ботом для уведомлений и админ-панелью для владельца.',
      ],
      features: [
        'Каталог товаров или услуг с фильтрами и корзиной',
        'Оплата через Telegram Stars, ЮKassa или эквайринг банка',
        'Бот: статусы заказа, напоминания, рассылки по базе',
        'Авторизация по аккаунту Telegram — без паролей и SMS',
        'Админ-панель: заказы, товары, клиенты, статистика',
        'Выгрузка заказов в CRM, 1С или Google Таблицы',
      ],
      audience: ['Интернет-магазины и локальные бренды', 'Кафе, доставка еды, пекарни', 'Салоны, студии, онлайн-школы', 'Авторы каналов и инфобизнес'],
      seoTitle: 'Разработка Telegram Mini App и бота для бизнеса под ключ',
      seoDescription:
        'Создание Telegram Mini App: магазин, каталог, запись и оплата внутри Telegram, бот для уведомлений и рассылок, админ-панель, интеграция с CRM и 1С.',
      keywords: [
        'разработка Telegram Mini App',
        'мини-приложение Telegram',
        'магазин в Telegram',
        'телеграм бот для бизнеса',
        'создать телеграм бота',
        'Telegram Web App',
      ],
    },
    en: {
      intro: [
        'A Telegram Mini App is a full web application that opens inside the messenger. Customers do not need to download anything or find your website: they open the bot, browse the catalog, place an order and pay in a couple of taps.',
        'It is one of the most frequent requests on freelance marketplaces: the business already runs a Telegram channel or chat and wants to sell where its audience lives. I build the Mini App together with a notification bot and an admin panel for the owner.',
      ],
      features: [
        'Product or service catalog with filters and a cart',
        'Payments via Telegram Stars, Stripe or a bank acquirer',
        'Bot: order statuses, reminders, broadcasts to your audience',
        'Sign-in with the Telegram account — no passwords or SMS',
        'Admin panel: orders, products, customers, statistics',
        'Orders exported to your CRM, accounting system or Google Sheets',
      ],
      audience: ['Online stores and local brands', 'Cafés, food delivery, bakeries', 'Salons, studios, online schools', 'Channel owners and creators'],
      seoTitle: 'Telegram Mini App & bot development for business',
      seoDescription:
        'Custom Telegram Mini Apps: store, catalog, booking and payments inside Telegram, a bot for notifications and broadcasts, admin panel, CRM integration.',
      keywords: ['Telegram Mini App development', 'Telegram Web App', 'Telegram store', 'Telegram bot for business', 'custom Telegram bot'],
    },
  },
  'ai-assistant': {
    ru: {
      intro: [
        'Обычный чат-бот с кнопками быстро упирается в сценарии. ИИ-ассистент понимает вопрос своими словами и отвечает по вашим собственным материалам: прайсам, договорам, инструкциям, истории переписки. Ответы опираются на документы, а не на фантазию модели.',
        'Запросы на «ИИ-бота для поддержки» и «бота, который отвечает по базе знаний» — среди самых растущих на биржах. Главное в таком проекте — не сама нейросеть, а аккуратная интеграция: откуда брать данные, когда звать человека и как не раскрыть лишнего.',
      ],
      features: [
        'Ответы по вашим документам, сайту и базе знаний (RAG)',
        'Работает на сайте, в Telegram, WhatsApp или во внутреннем портале',
        'Передача диалога менеджеру, когда бот не уверен',
        'Квалификация заявок и запись данных в CRM',
        'Журнал диалогов и статистика: о чём спрашивают чаще всего',
        'Выбор модели: OpenAI, Claude, YandexGPT, GigaChat или локальная',
      ],
      audience: ['Службы поддержки и колл-центры', 'Интернет-магазины и сервисы', 'Компании с большой внутренней документацией', 'Онлайн-школы и консалтинг'],
      seoTitle: 'Разработка ИИ-ассистента и чат-бота с нейросетью для бизнеса',
      seoDescription:
        'ИИ-ассистент, который отвечает клиентам по вашим документам и базе знаний: сайт, Telegram, WhatsApp, передача оператору, интеграция с CRM.',
      keywords: ['ИИ-ассистент для бизнеса', 'чат-бот с нейросетью', 'бот на ChatGPT', 'RAG база знаний', 'ИИ-бот для поддержки', 'внедрение ИИ в бизнес'],
    },
    en: {
      intro: [
        'A classic button-driven chatbot quickly hits the limits of its scripts. An AI assistant understands free-form questions and answers from your own material: price lists, contracts, manuals, past conversations. Answers are grounded in documents, not in the model’s imagination.',
        'Requests for an “AI support bot” or a “bot that answers from our knowledge base” are among the fastest-growing on freelance marketplaces. What matters is not the model itself but careful integration: where the data comes from, when to call a human, and what must never be disclosed.',
      ],
      features: [
        'Answers grounded in your documents, website and knowledge base (RAG)',
        'Works on your website, in Telegram, WhatsApp or an internal portal',
        'Hands the conversation to a manager when it is not sure',
        'Lead qualification with data written to your CRM',
        'Conversation log and analytics: what people ask most',
        'Model of your choice: OpenAI, Claude, Gemini or self-hosted',
      ],
      audience: ['Support teams and call centers', 'Online stores and SaaS', 'Companies with lots of internal documentation', 'Online schools and consulting'],
      seoTitle: 'AI assistant & LLM chatbot development for business',
      seoDescription:
        'An AI assistant that answers customers from your documents and knowledge base: website, Telegram, WhatsApp, human handoff and CRM integration.',
      keywords: ['AI assistant development', 'AI chatbot for business', 'ChatGPT bot development', 'RAG knowledge base', 'AI customer support bot'],
    },
  },
  'online-booking': {
    ru: {
      intro: [
        'Пока клиенты записываются по телефону, часть заявок теряется в нерабочее время, а администратор тратит день на переписку. Онлайн-запись принимает клиентов круглосуточно и сама напоминает о визите, поэтому неявок становится меньше.',
        'Готовые сервисы записи берут ежемесячную плату и плохо подстраиваются под нестандартную логику: несколько филиалов, оборудование, разная длительность услуг, предоплата. Собственная система делает ровно то, что нужно вашему бизнесу.',
      ],
      features: [
        'Выбор услуги, специалиста и свободного слота онлайн',
        'Виджет на сайт, страница записи и запись через Telegram-бота',
        'Напоминания о визите в Telegram, по SMS или email',
        'Предоплата и депозиты, чтобы снизить неявки',
        'Расписание сотрудников, филиалы, ресурсы и кабинеты',
        'Карточки клиентов, история визитов и повторная запись',
      ],
      audience: ['Салоны красоты и барбершопы', 'Медицинские и стоматологические клиники', 'Автосервисы и шиномонтаж', 'Репетиторы, студии, фитнес'],
      seoTitle: 'Разработка системы онлайн-записи для салона, клиники и автосервиса',
      seoDescription:
        'Своя система онлайн-записи клиентов: выбор мастера и времени, напоминания в Telegram и SMS, предоплата, расписание сотрудников и филиалов.',
      keywords: ['система онлайн-записи', 'онлайн-запись клиентов', 'запись на услуги сайт', 'запись в салон красоты', 'CRM для салона', 'запись в автосервис'],
    },
    en: {
      intro: [
        'While bookings go through the phone, some requests are lost after hours and the front desk spends the day messaging. Online booking takes customers around the clock and sends visit reminders itself, so fewer people fail to show up.',
        'Off-the-shelf booking services charge monthly and bend poorly to non-standard logic: several locations, equipment, different service lengths, prepayments. A custom system does exactly what your business needs.',
      ],
      features: [
        'Pick a service, specialist and free time slot online',
        'Website widget, booking page and booking via a Telegram bot',
        'Visit reminders in Telegram, by SMS or email',
        'Prepayments and deposits to reduce no-shows',
        'Staff schedules, locations, rooms and resources',
        'Customer profiles, visit history and rebooking',
      ],
      audience: ['Beauty salons and barbershops', 'Medical and dental clinics', 'Car service shops', 'Tutors, studios, fitness'],
      seoTitle: 'Custom online booking system for salons, clinics & service shops',
      seoDescription:
        'A custom online appointment booking system: specialist and time slot selection, Telegram and SMS reminders, prepayments, staff and location schedules.',
      keywords: [
        'online booking system development',
        'appointment scheduling software',
        'custom booking app',
        'salon booking system',
        'clinic appointment system',
      ],
    },
  },
  'custom-crm': {
    ru: {
      intro: [
        'Коробочные CRM часто внедряют, а потом продолжают вести клиентов в Excel: слишком много лишних полей, неудобные воронки, платить нужно за каждого сотрудника. Собственная CRM повторяет ваш реальный процесс и растёт вместе с бизнесом.',
        'На биржах это один из стабильно популярных заказов — «CRM только с нужными полями», «учёт заявок и задач на 3–5 ролей». Начинаем с минимального рабочего ядра и добавляем функции по мере того, как команда в нём работает.',
      ],
      features: [
        'Воронки, статусы сделок и задачи с напоминаниями',
        'Роли и права: менеджер, руководитель, бухгалтерия',
        'Приём заявок с сайта, из Telegram, почты и телефонии',
        'Шаблоны документов: счета, договоры, КП',
        'Отчёты по менеджерам, источникам и конверсии',
        'Импорт из Excel и обмен с 1С, amoCRM или Битрикс24',
      ],
      audience: [
        'Отделы продаж в малом и среднем бизнесе',
        'Агентства и студии',
        'Производство и оптовая торговля',
        'Сервисные компании с выездными мастерами',
      ],
      seoTitle: 'Разработка CRM-системы на заказ под процессы вашего бизнеса',
      seoDescription:
        'Своя CRM вместо коробки: воронки, задачи, роли, заявки с сайта и Telegram, документы, отчёты по продажам, интеграция с 1С, amoCRM и Битрикс24.',
      keywords: ['разработка CRM на заказ', 'своя CRM система', 'CRM для малого бизнеса', 'учёт заявок', 'CRM система разработка', 'замена Excel на CRM'],
    },
    en: {
      intro: [
        'Off-the-shelf CRMs often get rolled out while customers keep living in Excel: too many fields, awkward pipelines and a fee for every seat. A custom CRM mirrors your real process and grows with the business.',
        'It is one of the steadily popular orders on freelance marketplaces — “a CRM with only the fields we need”, “lead and task tracking for 3–5 roles”. We start with a minimal working core and add features as the team uses it.',
      ],
      features: [
        'Pipelines, deal stages and tasks with reminders',
        'Roles and permissions: sales rep, manager, accounting',
        'Leads from the website, Telegram, email and telephony',
        'Document templates: invoices, contracts, proposals',
        'Reports by rep, lead source and conversion',
        'Excel import and sync with accounting, HubSpot or other systems',
      ],
      audience: ['Sales teams in small and mid-sized businesses', 'Agencies and studios', 'Manufacturing and wholesale', 'Field service companies'],
      seoTitle: 'Custom CRM development tailored to your business process',
      seoDescription:
        'A custom CRM instead of an off-the-shelf one: pipelines, tasks, roles, leads from your website and Telegram, documents, sales reports and integrations.',
      keywords: ['custom CRM development', 'bespoke CRM', 'CRM for small business', 'lead management system', 'replace Excel with CRM'],
    },
  },
  '1c-crm-integration': {
    ru: {
      intro: [
        'Типичная картина: заказ приходит на сайт, менеджер переносит его в CRM, бухгалтер — в 1С, а остатки на маркетплейсах обновляют вручную раз в день. Каждое ручное действие — это время и ошибки, а несинхронные остатки приводят к отменам и штрафам.',
        'Интеграции — самая частая задача в автоматизации, на биржах их заказывают постоянно. Делаю надёжный обмен с очередями и повторами: если одна из систем недоступна, данные не теряются, а дожидаются её.',
      ],
      features: [
        'Обмен заказами, остатками и ценами между сайтом и 1С',
        'Синхронизация с amoCRM, Битрикс24, RetailCRM',
        'Выгрузка товаров и остатков на Ozon, Wildberries, Яндекс Маркет',
        'Платёжные системы, доставка (СДЭК, Boxberry) и онлайн-кассы',
        'Очереди, повторы и журнал ошибок — данные не теряются',
        'Уведомления в Telegram, если обмен остановился',
      ],
      audience: ['Интернет-магазины на 1С', 'Селлеры маркетплейсов', 'Оптовые компании и дистрибьюторы', 'Бизнес, где данные живут в нескольких системах'],
      seoTitle: 'Интеграция сайта с 1С, CRM и маркетплейсами Ozon и Wildberries',
      seoDescription:
        'Интеграция 1С с сайтом, amoCRM, Битрикс24, Ozon и Wildberries: обмен заказами, остатками и ценами, доставка и оплата, очереди и журнал ошибок.',
      keywords: ['интеграция сайта с 1С', 'интеграция 1С и CRM', 'интеграция с Ozon', 'интеграция с Wildberries', 'API интеграция', 'обмен с 1С'],
    },
    en: {
      intro: [
        'A familiar picture: an order lands on the website, a manager re-enters it in the CRM, accounting types it into the ERP, and marketplace stock gets updated by hand once a day. Every manual step costs time and causes errors, and stale stock leads to cancellations and penalties.',
        'Integrations are the most common automation job and are ordered on freelance marketplaces all the time. I build reliable sync with queues and retries: if one of the systems is down, data is not lost but waits for it to come back.',
      ],
      features: [
        'Orders, stock and prices synced between your website and ERP/1C',
        'Sync with HubSpot, Pipedrive, amoCRM, Bitrix24',
        'Product and stock feeds for Amazon, Ozon, Wildberries and others',
        'Payment providers, shipping carriers and fiscal registers',
        'Queues, retries and an error log — no data gets lost',
        'Telegram alerts when a sync stops',
      ],
      audience: ['Online stores backed by an ERP', 'Marketplace sellers', 'Wholesalers and distributors', 'Any business whose data lives in several systems'],
      seoTitle: 'Website, 1C/ERP, CRM & marketplace API integration',
      seoDescription:
        'Integrating your website with ERP/1C, CRM and marketplaces: orders, stock and prices sync, shipping and payments, queues and an error log.',
      keywords: ['API integration services', 'ERP integration', '1C integration', 'CRM integration', 'marketplace integration', 'e-commerce integration'],
    },
  },
  'marketplace-seller-analytics': {
    ru: {
      intro: [
        'Селлеры собирают отчёты из личных кабинетов вручную и сводят их в таблицах, чтобы понять, какой товар реально приносит прибыль после комиссий, логистики, хранения и рекламы. Чем больше артикулов и магазинов, тем дороже это ручное сведение.',
        'Запросы «сделать аналитику для WB», «автоматизировать отчёты по Ozon», «следить за остатками на складах» — постоянный поток заказов от селлеров. Делаю внутренний сервис, который берёт данные через официальные API и показывает то, что важно именно вам.',
      ],
      features: [
        'Сбор продаж, заказов, возвратов и расходов через API Ozon и WB',
        'Юнит-экономика и чистая прибыль по каждому артикулу',
        'Остатки по складам и прогноз, когда товар закончится',
        'Учёт рекламных кампаний и ДРР',
        'Правила автоматического изменения цен',
        'Ежедневная сводка и тревоги в Telegram',
      ],
      audience: [
        'Селлеры Wildberries и Ozon',
        'Бренды с несколькими магазинами',
        'Менеджеры маркетплейсов и агентства',
        'Производители, выходящие на маркетплейсы',
      ],
      seoTitle: 'Разработка сервиса аналитики для селлеров Wildberries и Ozon',
      seoDescription:
        'Собственная аналитика для продавцов Ozon и Wildberries: юнит-экономика, прибыль по артикулам, остатки, реклама, автоцены и сводки в Telegram.',
      keywords: [
        'аналитика для селлеров',
        'аналитика Wildberries',
        'аналитика Ozon',
        'юнит-экономика маркетплейс',
        'автоматизация для селлеров',
        'API Wildberries',
      ],
    },
    en: {
      intro: [
        'Sellers export reports from their seller accounts by hand and merge them in spreadsheets to see which product actually makes money after fees, logistics, storage and ads. The more SKUs and stores, the more that manual work costs.',
        'Requests like “build analytics for my store”, “automate marketplace reports” or “track warehouse stock” come from sellers constantly. I build an internal service that pulls data through the official APIs and shows exactly what matters to you.',
      ],
      features: [
        'Sales, orders, returns and costs pulled through marketplace APIs',
        'Unit economics and net profit for every SKU',
        'Stock by warehouse and a forecast of when it runs out',
        'Ad campaign tracking and ad spend share',
        'Automatic repricing rules',
        'Daily summary and alerts in Telegram',
      ],
      audience: [
        'Amazon, Ozon and Wildberries sellers',
        'Brands running several stores',
        'Marketplace managers and agencies',
        'Manufacturers entering marketplaces',
      ],
      seoTitle: 'Marketplace seller analytics & automation tool development',
      seoDescription:
        'Custom analytics for marketplace sellers: unit economics, profit per SKU, stock levels, ads, automatic repricing and Telegram summaries.',
      keywords: ['marketplace seller analytics', 'seller dashboard development', 'unit economics marketplace', 'repricing tool', 'Wildberries Ozon API'],
    },
  },
  'client-portal': {
    ru: {
      intro: [
        'Когда клиентов становится много, менеджеры тонут в однотипных вопросах: какой статус, где счёт, пришлите акт. Личный кабинет снимает эту нагрузку: всё, что клиенту нужно знать, он видит сам и в любое время.',
        'Это одна из самых частых задач для B2B и сервисных компаний. Кабинет можно подключить к уже существующей CRM или 1С, чтобы данные не дублировались.',
      ],
      features: [
        'Вход по email, телефону или через Telegram',
        'Статусы заказов и заявок в реальном времени',
        'Счета, акты, договоры и закрывающие документы',
        'Онлайн-оплата и история платежей',
        'Чат с менеджером и уведомления',
        'Подключение к вашей CRM, 1С или учётной системе',
      ],
      audience: ['B2B-компании и поставщики', 'Сервисные и логистические компании', 'Агентства и подрядчики', 'Онлайн-школы и подписочные сервисы'],
      seoTitle: 'Разработка личного кабинета клиента для сайта и B2B-портала',
      seoDescription:
        'Личный кабинет клиента: статусы заказов, документы и счета, онлайн-оплата, чат с менеджером, интеграция с CRM и 1С. Для B2B и сервисных компаний.',
      keywords: ['разработка личного кабинета', 'личный кабинет клиента', 'B2B-портал', 'клиентский портал', 'личный кабинет на сайте'],
    },
    en: {
      intro: [
        'As the customer base grows, managers drown in repetitive questions: what is the status, where is the invoice, please send the certificate. A customer portal removes that load: customers see everything they need, any time.',
        'It is one of the most common projects for B2B and service companies. The portal can plug into your existing CRM or ERP so data is never duplicated.',
      ],
      features: [
        'Sign-in by email, phone or Telegram',
        'Real-time order and request statuses',
        'Invoices, contracts and closing documents',
        'Online payments and payment history',
        'Chat with a manager and notifications',
        'Connected to your CRM, ERP or accounting system',
      ],
      audience: ['B2B companies and suppliers', 'Service and logistics companies', 'Agencies and contractors', 'Online schools and subscription services'],
      seoTitle: 'Customer portal & B2B portal development',
      seoDescription:
        'A customer portal: order statuses, documents and invoices, online payments, chat with a manager, CRM and ERP integration. For B2B and service companies.',
      keywords: ['customer portal development', 'client portal', 'B2B portal development', 'self-service portal', 'customer account area'],
    },
  },
  'price-monitoring': {
    ru: {
      intro: [
        'Отслеживать цены конкурентов вручную долго и неточно, особенно если товаров сотни. Парсер обходит нужные сайты и маркетплейсы по расписанию, сопоставляет товары с вашими и показывает, где вы дороже или дешевле рынка.',
        '«Нужен парсер» — один из самых массовых заказов на биржах. Делаю не одноразовый скрипт, а устойчивый сервис: расписание, прокси, обход защиты в рамках правил сайтов, повторы при сбоях и понятный результат для менеджера.',
      ],
      features: [
        'Сбор цен, наличия, характеристик и отзывов',
        'Сайты конкурентов, маркетплейсы и агрегаторы',
        'Сопоставление товаров с вашим каталогом',
        'Расписание, прокси и повторы при ошибках',
        'Выгрузка в Excel, Google Таблицы или по API',
        'Уведомления в Telegram о резких изменениях цен',
      ],
      audience: ['Интернет-магазины и дистрибьюторы', 'Селлеры маркетплейсов', 'Производители, контролирующие РРЦ', 'Аналитики и маркетологи'],
      seoTitle: 'Разработка парсера и сервиса мониторинга цен конкурентов',
      seoDescription:
        'Парсер цен и мониторинг конкурентов: сайты и маркетплейсы по расписанию, сопоставление с вашим каталогом, выгрузка в таблицы и уведомления в Telegram.',
      keywords: ['парсер цен', 'мониторинг цен конкурентов', 'разработка парсера', 'парсинг сайтов на заказ', 'парсинг маркетплейсов', 'контроль РРЦ'],
    },
    en: {
      intro: [
        'Tracking competitor prices by hand is slow and inaccurate, especially with hundreds of products. A scraper visits the right websites and marketplaces on a schedule, matches products to yours and shows where you are above or below the market.',
        '“I need a scraper” is one of the most frequent requests on freelance marketplaces. I build not a one-off script but a robust service: schedules, proxies, retries on failure and a clear result for the manager.',
      ],
      features: [
        'Prices, availability, specs and reviews',
        'Competitor sites, marketplaces and aggregators',
        'Product matching against your catalog',
        'Schedules, proxies and retries on errors',
        'Export to Excel, Google Sheets or via API',
        'Telegram alerts on sharp price changes',
      ],
      audience: ['Online stores and distributors', 'Marketplace sellers', 'Brands enforcing MAP pricing', 'Analysts and marketers'],
      seoTitle: 'Web scraper & competitor price monitoring development',
      seoDescription:
        'Price scraping and competitor monitoring: websites and marketplaces on a schedule, product matching, export to spreadsheets and Telegram alerts.',
      keywords: ['web scraper development', 'competitor price monitoring', 'price tracking tool', 'custom web scraping', 'marketplace scraping'],
    },
  },
  'inventory-management': {
    ru: {
      intro: [
        'Пока склад ведётся в таблицах, остатки расходятся с реальностью, товар теряется, а сборка заказов зависит от памяти конкретного кладовщика. Небольшая учётная система с понятными экранами наводит порядок без многомесячного внедрения тяжёлой ERP.',
        'Запросы «учёт склада», «система заказов для производства», «приложение для кладовщика со сканером» регулярно встречаются на биржах. Система делается под ваши операции и при необходимости обменивается данными с 1С и сайтом.',
      ],
      features: [
        'Приход, расход, перемещения и инвентаризация',
        'Сканирование штрихкодов и QR с телефона или ТСД',
        'Остатки по складам, ячейкам и партиям',
        'Сборка и отгрузка заказов со статусами',
        'Минимальные остатки и автоматические заявки поставщикам',
        'Отчёты по движению и обмен с 1С, сайтом и маркетплейсами',
      ],
      audience: ['Небольшие склады и фулфилмент', 'Интернет-магазины и селлеры', 'Производство и мастерские', 'Оптовая торговля'],
      seoTitle: 'Разработка системы складского учёта и управления заказами',
      seoDescription:
        'Система складского учёта на заказ: приход и расход, штрихкоды со смартфона, остатки по складам, сборка заказов, интеграция с 1С и маркетплейсами.',
      keywords: ['система складского учёта', 'учёт склада программа', 'WMS на заказ', 'учёт товаров', 'управление заказами', 'складской учёт со штрихкодами'],
    },
    en: {
      intro: [
        'While the warehouse runs on spreadsheets, stock drifts away from reality, items go missing and order picking depends on one person’s memory. A focused inventory system with clear screens brings order without a months-long ERP rollout.',
        'Requests like “inventory tracking”, “order system for our workshop” or “a scanner app for the warehouse” appear on freelance marketplaces all the time. The system is built around your operations and can sync with your accounting system and website.',
      ],
      features: [
        'Receiving, issuing, transfers and stock counts',
        'Barcode and QR scanning from a phone or handheld',
        'Stock by warehouse, bin and batch',
        'Order picking and shipping with statuses',
        'Reorder points and automatic purchase requests',
        'Movement reports and sync with accounting, website and marketplaces',
      ],
      audience: ['Small warehouses and fulfillment', 'Online stores and sellers', 'Manufacturing and workshops', 'Wholesale trade'],
      seoTitle: 'Custom inventory & order management system development',
      seoDescription:
        'A custom inventory management system: receiving and issuing, barcode scanning from a phone, stock by warehouse, order picking, ERP and marketplace sync.',
      keywords: ['inventory management system development', 'custom WMS', 'stock tracking software', 'order management system', 'barcode inventory app'],
    },
  },
  'business-dashboard': {
    ru: {
      intro: [
        'Руководитель каждую неделю ждёт отчёты, которые сотрудники вручную собирают из CRM, 1С, рекламных кабинетов и таблиц. Пока отчёт готов, данные уже устарели, а на сведение уходят часы.',
        'Автоматизация отчётности и дашборды — одна из самых частых задач у малого бизнеса во всём мире. Подключаю ваши источники, считаю метрики по вашим правилам и показываю их там, где удобно: в веб-дашборде, в таблице или в Telegram.',
      ],
      features: [
        'Сбор данных из CRM, 1С, рекламы, маркетплейсов и таблиц',
        'Продажи, выручка, маржа, денежный поток и план-факт',
        'Метрики по менеджерам, каналам и филиалам',
        'Дашборд в браузере и на телефоне',
        'Ежедневная и еженедельная сводка в Telegram или на почту',
        'Тревоги, когда показатель выходит за рамки',
      ],
      audience: ['Собственники и руководители малого бизнеса', 'Коммерческие директора', 'Сети и компании с филиалами', 'Агентства с отчётами для клиентов'],
      seoTitle: 'Разработка дашборда руководителя и автоматизация отчётов',
      seoDescription:
        'Дашборд с ключевыми показателями бизнеса: данные из CRM, 1С, рекламы и маркетплейсов, план-факт, сводки в Telegram и тревоги. Без ручных отчётов.',
      keywords: [
        'дашборд руководителя',
        'автоматизация отчётов',
        'BI для малого бизнеса',
        'управленческая отчётность',
        'разработка дашборда',
        'аналитика продаж',
      ],
    },
    en: {
      intro: [
        'Every week the owner waits for reports that staff assemble by hand from the CRM, accounting, ad accounts and spreadsheets. By the time a report is ready the data is stale, and assembling it takes hours.',
        'Reporting automation and dashboards are among the most common small-business requests worldwide. I connect your sources, calculate metrics by your rules and show them where it is convenient: a web dashboard, a spreadsheet or Telegram.',
      ],
      features: [
        'Data from your CRM, accounting, ads, marketplaces and spreadsheets',
        'Sales, revenue, margin, cash flow and plan vs. actual',
        'Metrics by sales rep, channel and location',
        'Dashboard in the browser and on mobile',
        'Daily and weekly summaries in Telegram or by email',
        'Alerts when a metric goes out of range',
      ],
      audience: ['Small business owners and managers', 'Sales directors', 'Chains and multi-location businesses', 'Agencies reporting to clients'],
      seoTitle: 'Executive dashboard development & reporting automation',
      seoDescription:
        'A dashboard with your key business metrics: data from CRM, accounting, ads and marketplaces, plan vs. actual, Telegram summaries and alerts.',
      keywords: ['business dashboard development', 'reporting automation', 'BI for small business', 'KPI dashboard', 'sales analytics dashboard'],
    },
  },
};
