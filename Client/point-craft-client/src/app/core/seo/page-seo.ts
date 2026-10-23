import { Locale } from '../../interfaces/locale';

export interface PageSeo {
  /** Full <title>, written around the queries people actually type ("разработка маркетплейса…"). */
  title: string;
  /** Snippet text, kept under ~160 characters so search engines show it whole. */
  description: string;
  keywords: string[];
}

// Search-oriented title/description/keywords for the service and case-study pages, keyed by
// slug. The CMS title stays the on-page H1; this only shapes how the page shows up in Google and
// Yandex. A service or case study the admin adds later has no entry here and falls back to its
// CMS title and description (see servicePageSeo / projectPageSeo).
const SERVICES: Record<string, Record<Locale, PageSeo>> = {
  'web-services': {
    ru: {
      title: 'Разработка веб-сервисов, SaaS и личных кабинетов на .NET и Angular',
      description: 'Разработка веб-сервисов, SaaS, B2B-порталов и личных кабинетов под ключ: .NET, Angular с SSR, API, админ-панель, деплой в облако.',
      keywords: ['разработка веб-сервиса', 'разработка SaaS', 'личный кабинет', 'B2B-портал', 'веб-приложение на заказ', '.NET', 'Angular'],
    },
    en: {
      title: 'Web service, SaaS & client portal development on .NET and Angular',
      description: 'Custom web services, SaaS products, B2B portals and client dashboards: .NET backend, Angular with SSR, APIs, admin panel and cloud deployment.',
      keywords: ['web service development', 'SaaS development', 'client portal', 'B2B portal', 'custom web application', '.NET', 'Angular'],
    },
  },
  'marketplaces-ecommerce': {
    ru: {
      title: 'Разработка маркетплейса и интернет-магазина под ключ',
      description: 'Создание маркетплейсов и интернет-магазинов с SEO из коробки: каталог с фильтрами, личные кабинеты продавцов, оплата, доставка, админ-панель.',
      keywords: ['разработка маркетплейса', 'создать маркетплейс', 'разработка интернет-магазина', 'оптовый интернет-магазин', 'e-commerce', 'SSR'],
    },
    en: {
      title: 'Marketplace & online store development',
      description: 'Multi-vendor marketplaces and online stores built SEO-first: filtered catalog, seller accounts, payments, delivery and a full admin panel.',
      keywords: ['marketplace development', 'build a marketplace', 'online store development', 'e-commerce development', 'multi-vendor platform'],
    },
  },
  'realtime-apps': {
    ru: {
      title: 'Разработка мессенджера, чата и видеозвонков (SignalR, WebRTC)',
      description: 'Разработка real-time приложений: мессенджеры, чаты в сервисе, видеозвонки, онлайн-уведомления и живые дашборды на SignalR и WebRTC.',
      keywords: ['разработка мессенджера', 'чат для сайта', 'видеозвонки WebRTC', 'SignalR', 'real-time приложение', 'онлайн-уведомления'],
    },
    en: {
      title: 'Messenger, chat & video call app development (SignalR, WebRTC)',
      description: 'Real-time apps: messengers, in-app chat, video calls, live notifications and dashboards built on SignalR and WebRTC.',
      keywords: ['messenger development', 'chat app development', 'WebRTC video calls', 'SignalR', 'real-time application', 'live notifications'],
    },
  },
  'desktop-apps': {
    ru: {
      title: 'Разработка десктоп-приложений для Windows, macOS и Linux на C#',
      description: 'Разработка настольных программ на C# и Avalonia: автоматизация, работа с оборудованием и звуком, офлайн-режим, плагины, кроссплатформенность.',
      keywords: ['разработка десктоп-приложения', 'программа для Windows на заказ', 'кроссплатформенное приложение', 'Avalonia', 'C#', 'WPF'],
    },
    en: {
      title: 'Desktop app development for Windows, macOS & Linux in C#',
      description: 'Cross-platform desktop software in C# and Avalonia: automation, hardware and audio, offline work and plugin architectures.',
      keywords: ['desktop application development', 'custom Windows software', 'cross-platform desktop app', 'Avalonia', 'C#'],
    },
  },
  'automation-parsing': {
    ru: {
      title: 'Парсинг сайтов, автоматизация браузера и интеграции на заказ',
      description: 'Парсинг сайтов и сбор данных, автоматизация рутины в браузере на Playwright, интеграции с CRM, 1С и API. Очереди задач, прокси, мониторинг.',
      keywords: ['парсинг сайтов на заказ', 'парсер', 'автоматизация браузера', 'Playwright', 'интеграция с CRM', 'интеграция API'],
    },
    en: {
      title: 'Web scraping, browser automation & integrations',
      description: 'Website scraping and data collection, browser automation with Playwright, CRM and API integrations, with task queues, proxies and monitoring.',
      keywords: ['web scraping service', 'data scraping', 'browser automation', 'Playwright', 'API integration', 'CRM integration'],
    },
  },
  'legacy-migration': {
    ru: {
      title: 'Миграция с PHP/Laravel на .NET и рефакторинг legacy-кода',
      description: 'Перенос устаревших проектов на PHP, Laravel и монолитов на .NET и Angular без остановки бизнеса: сохраняем данные, пользователей и SEO.',
      keywords: ['миграция с Laravel на .NET', 'переписать проект', 'рефакторинг legacy', 'модернизация сайта', 'перенос с PHP'],
    },
    en: {
      title: 'PHP/Laravel to .NET migration & legacy refactoring',
      description: 'Move aging PHP, Laravel or monolithic projects to .NET and Angular without downtime, keeping data, users and search rankings.',
      keywords: ['Laravel to .NET migration', 'legacy modernization', 'legacy refactoring', 'rewrite PHP application', 'monolith migration'],
    },
  },
  'seo-performance': {
    ru: {
      title: 'Технический SEO-аудит и ускорение сайта (PageSpeed, SSR)',
      description: 'Технический SEO-аудит и ускорение сайта: SSR, Core Web Vitals, PageSpeed 90+, микроразметка, индексация. Исправляем проблемы в коде.',
      keywords: ['SEO-аудит сайта', 'технический SEO', 'ускорение сайта', 'PageSpeed', 'Core Web Vitals', 'SSR для SEO'],
    },
    en: {
      title: 'Technical SEO audit & website speed optimization',
      description: 'Technical SEO audits and speed work: SSR, Core Web Vitals, PageSpeed 90+, structured data and indexing, fixed at the code level.',
      keywords: ['technical SEO audit', 'website speed optimization', 'PageSpeed', 'Core Web Vitals', 'SSR SEO'],
    },
  },
  'devops-cloud': {
    ru: {
      title: 'DevOps, CI/CD и деплой в AWS и Azure на Docker',
      description: 'Настройка DevOps: Docker, CI/CD на GitHub Actions, деплой в AWS и Azure, HTTPS, бэкапы и мониторинг, чтобы релизы проходили без простоев.',
      keywords: ['DevOps на заказ', 'настройка CI/CD', 'деплой в AWS', 'Azure', 'Docker', 'GitHub Actions'],
    },
    en: {
      title: 'DevOps, CI/CD & deployment to AWS and Azure with Docker',
      description: 'DevOps setup: Docker, GitHub Actions CI/CD, AWS and Azure hosting, HTTPS, backups and monitoring for downtime-free releases.',
      keywords: ['DevOps services', 'CI/CD setup', 'AWS deployment', 'Azure', 'Docker', 'GitHub Actions'],
    },
  },
};

const PROJECTS: Record<string, Record<Locale, PageSeo>> = {
  'realtime-messenger': {
    ru: {
      title: 'Кейс: мессенджер с видеозвонками на .NET, SignalR и WebRTC',
      description: 'Как мы сделали мессенджер с личными и групповыми чатами, вложениями, онлайн-статусами, аудио- и видеозвонками на .NET, SignalR, WebRTC и Azure.',
      keywords: ['мессенджер на .NET', 'видеозвонки WebRTC', 'SignalR чат', 'разработка мессенджера кейс'],
    },
    en: {
      title: 'Case study: messenger with video calls on .NET, SignalR & WebRTC',
      description: 'How we built a messenger with private and group chats, attachments, presence and audio/video calls on .NET, SignalR, WebRTC and Azure.',
      keywords: ['.NET messenger', 'WebRTC video calls', 'SignalR chat', 'messenger case study'],
    },
  },
  'seo-link-marketplace': {
    ru: {
      title: 'Кейс: биржа SEO-ссылок, миграция с Laravel на .NET и Angular',
      description: 'Перенос биржи размещения ссылок с Laravel + Vue на .NET + Angular с сохранением пользователей и балансов, плюс новые модули.',
      keywords: ['миграция с Laravel на .NET', 'биржа ссылок', 'маркетплейс SEO-ссылок', 'кейс миграции'],
    },
    en: {
      title: 'Case study: SEO link marketplace migrated from Laravel to .NET',
      description: 'Porting a link-building marketplace from Laravel + Vue to .NET + Angular while keeping every user and balance, and adding new modules.',
      keywords: ['Laravel to .NET migration', 'link-building marketplace', 'migration case study'],
    },
  },
  'msys-music-workstation': {
    ru: {
      title: 'Кейс: Msys, музыкальная программа на C# и Avalonia с плагинами',
      description: 'Кроссплатформенная музыкальная студия в духе FL Studio на C# и Avalonia: плагины-инструменты, синтез, таймлайн, микширование и экспорт.',
      keywords: ['музыкальная программа на C#', 'Avalonia', 'DAW', 'десктоп-приложение кейс', 'NAudio'],
    },
    en: {
      title: 'Case study: Msys, a plugin-based music workstation in C# & Avalonia',
      description: 'A cross-platform DAW in the spirit of FL Studio built with C# and Avalonia: instrument plugins, synth engine, timeline, mixing and export.',
      keywords: ['C# music software', 'Avalonia', 'DAW development', 'desktop app case study', 'NAudio'],
    },
  },
  'wholesale-ecommerce-store': {
    ru: {
      title: 'Кейс: оптовый интернет-магазин на Angular SSR и .NET',
      description: 'SEO-дружелюбный оптовый магазин: каталог с фильтрами, корзина, региональная доставка и оплата, отзывы и админ-панель на Angular SSR и .NET.',
      keywords: ['оптовый интернет-магазин', 'интернет-магазин на Angular', 'Angular SSR', 'e-commerce кейс'],
    },
    en: {
      title: 'Case study: wholesale online store on Angular SSR & .NET',
      description: 'An SEO-friendly wholesale store: filtered catalog, cart, regional delivery and payment, reviews and an admin panel on Angular SSR and .NET.',
      keywords: ['wholesale online store', 'Angular e-commerce', 'Angular SSR', 'e-commerce case study'],
    },
  },
  'browser-automation-platform': {
    ru: {
      title: 'Кейс: платформа автоматизации браузера на Playwright и .NET',
      description: 'Сервис массового запуска сценариев в браузере: много аккаунтов, прокси, расписания, очереди задач на Hangfire и живые логи для оператора.',
      keywords: ['автоматизация браузера', 'Playwright .NET', 'парсинг кейс', 'очереди задач Hangfire'],
    },
    en: {
      title: 'Case study: browser automation platform on Playwright & .NET',
      description: 'A service running browser scenarios at scale: many accounts, proxies, schedules, Hangfire task queues and live logs for operators.',
      keywords: ['browser automation', 'Playwright .NET', 'scraping case study', 'Hangfire task queues'],
    },
  },
  'artstil-advertising-store': {
    ru: {
      title: 'Кейс: интернет-магазин АРТстиль на Next.js и NestJS с обменом с 1С',
      description: 'Замена WordPress-сайта рекламного агентства собственным магазином: корзина и заказы, заявки на услуги, 3 языка, 4 валюты и обмен с 1С.',
      keywords: ['интернет-магазин с 1С', 'интеграция сайта с 1С', 'переезд с WordPress', 'Next.js', 'NestJS', 'интернет-магазин кейс'],
    },
    en: {
      title: 'Case study: ARTstil online store on Next.js & NestJS with 1C sync',
      description: "Replacing an advertising agency's WordPress site with a custom store: cart and orders, service leads, 3 languages, 4 currencies and 1C sync.",
      keywords: ['online store with 1C integration', 'WordPress migration', 'Next.js', 'NestJS', 'e-commerce case study'],
    },
  },
};

export function servicePageSeo(slug: string, locale: Locale): PageSeo | undefined {
  return SERVICES[slug]?.[locale];
}

export function projectPageSeo(slug: string, locale: Locale): PageSeo | undefined {
  return PROJECTS[slug]?.[locale];
}

/** Cuts a CMS text down to a snippet-sized description at a word boundary. */
export function snippet(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:—-]+$/, '') + '…';
}
