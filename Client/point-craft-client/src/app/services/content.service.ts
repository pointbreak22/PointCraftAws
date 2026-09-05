import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CaseStudy,
  ProcessStep,
  ServiceCategory,
  TechStackArea,
  TrustPoint,
} from '../interfaces/content';
import { Locale } from '../interfaces/locale';

interface LocalizedContent {
  trustPoints: TrustPoint[];
  services: ServiceCategory[];
  techStack: TechStackArea[];
  processSteps: ProcessStep[];
  caseStudies: CaseStudy[];
}

const EN: LocalizedContent = {
  trustPoints: [
    { icon: 'check', label: 'PageSpeed 90+ out of the box' },
    { icon: 'server', label: 'SSR on Angular, Next.js, or Nuxt' },
    { icon: 'layers', label: 'Ready-made integrations: 1C, CRM, payment gateways' },
    { icon: 'zap', label: 'Project launch in 3–6 weeks' },
  ],
  services: [
    {
      id: 'web-service',
      icon: 'layers',
      title: 'Web services & custom systems',
      description: 'Client dashboards and internal services built on complex business logic.',
      features: [
        'Client dashboard with role-based access',
        'REST API and integrations with external systems',
        'PWA — install the site as an app',
        'Architecture designed to scale with load',
      ],
      audience: 'SaaS products, B2B portals, booking services',
    },
    {
      id: 'desktop',
      icon: 'monitor',
      title: 'Desktop apps: Windows & cross-platform',
      description: 'Desktop software for process automation, hardware integration, and local databases.',
      features: [
        'Cross-platform (Windows/macOS/Linux) with Tauri or Electron — one codebase, every OS',
        'Native Windows apps on .NET MAUI/WPF for deep OS integration',
        'Works with local hardware, files, and offline databases',
        'Auto-updates and signed builds for distribution',
      ],
      audience: 'Businesses with internal processes, hardware, or offline requirements',
    },
    {
      id: 'ecommerce',
      icon: 'cart',
      title: 'SEO catalog & e-commerce',
      description: "A catalog search engines rank well and shoppers can navigate fast.",
      features: [
        'SSR rendering (Angular, Next.js, Nuxt)',
        'Smart filters with no page reloads',
        'Payment processing and sync with 1C/MoySklad',
        'Dynamic sitemap and query-targeted landing pages',
      ],
      audience: 'Online stores and B2B portals',
    },
    {
      id: 'seo-audit',
      icon: 'activity',
      title: 'SEO audit & performance',
      description: "We find what's holding your site back in search and fix it.",
      features: [
        'Core Web Vitals audit and optimization',
        'Fixing indexing errors',
        'Schema.org structured data',
        'A prioritized roadmap of fixes',
      ],
      audience: 'Live sites with declining traffic',
    },
  ],
  techStack: [
    {
      id: 'frontend',
      icon: 'zap',
      area: 'Frontend',
      technologies: ['Angular', 'Next.js (React)', 'Nuxt (Vue)'],
      benefit: 'SSR out of the box — search engines get fully rendered HTML and index it faster.',
    },
    {
      id: 'styling',
      icon: 'layers',
      area: 'Styling',
      technologies: ['Tailwind CSS', 'Component UI libraries'],
      benefit: 'Fast styling, responsive by default, and a minimal CSS payload.',
    },
    {
      id: 'backend',
      icon: 'server',
      area: 'Backend',
      technologies: ['.NET (C#)', 'Node.js', 'Python'],
      benefit: 'Solid business logic, microservices, and integrations that hold up under load.',
    },
    {
      id: 'desktop',
      icon: 'monitor',
      area: 'Desktop',
      technologies: ['Tauri', 'Electron', '.NET MAUI'],
      benefit: 'Cross-platform desktop apps on a web stack — one codebase, three operating systems.',
    },
    {
      id: 'data',
      icon: 'database',
      area: 'Data & cache',
      technologies: ['PostgreSQL', 'Redis', 'Entity Framework Core'],
      benefit: 'Reliable data storage and fast responses even under heavy traffic.',
    },
  ],
  processSteps: [
    { step: 1, title: 'Discovery & scope', description: 'We break down the business problem and pin down requirements and boundaries.' },
    { step: 2, title: 'Prototyping', description: 'We put together the structure and interface, and align on them before development starts.' },
    { step: 3, title: 'Development', description: 'Backend and frontend move in parallel, in short iterations with demos.' },
    { step: 4, title: 'SEO setup & testing', description: 'We configure indexing and structured data, and verify performance.' },
    { step: 5, title: 'Launch & support', description: 'We ship the project, hand over the source code, and stay reachable.' },
  ],
  // No cases shipped yet — the section renders an empty state instead of placeholder
  // numbers so nothing here looks like a real client result.
  caseStudies: [],
};

const RU: LocalizedContent = {
  trustPoints: [
    { icon: 'check', label: 'PageSpeed 90+ из коробки' },
    { icon: 'server', label: 'SSR на Angular, Next.js или Nuxt' },
    { icon: 'layers', label: 'Готовые интеграции: 1С, CRM, эквайринг' },
    { icon: 'zap', label: 'Запуск проекта за 3–6 недель' },
  ],
  services: [
    {
      id: 'web-service',
      icon: 'layers',
      title: 'Веб-сервис и кастомные системы',
      description: 'Личные кабинеты и внутренние сервисы со сложной бизнес-логикой.',
      features: [
        'Личный кабинет и ролевая модель доступа',
        'REST API и интеграции с внешними системами',
        'PWA — установка сайта как приложения',
        'Проектирование с запасом под рост нагрузки',
      ],
      audience: 'SaaS-продукты, B2B-порталы, сервисы бронирования',
    },
    {
      id: 'desktop',
      icon: 'monitor',
      title: 'Desktop-приложения: Windows и кроссплатформенные',
      description: 'Настольные решения для автоматизации процессов, работы с оборудованием и локальными базами данных.',
      features: [
        'Кроссплатформенно (Windows/macOS/Linux) на Tauri или Electron — один код, все ОС',
        'Нативные Windows-приложения на .NET MAUI/WPF при глубокой интеграции с ОС',
        'Работа с локальным оборудованием, файлами и офлайн-базами данных',
        'Автообновление и подписанные сборки для дистрибуции',
      ],
      audience: 'Бизнес с внутренними процессами, оборудованием или задачами без постоянного интернета',
    },
    {
      id: 'ecommerce',
      icon: 'cart',
      title: 'SEO-каталог и e-commerce',
      description: 'Каталог, который поисковики хорошо ранжируют, а покупатели быстро находят нужный товар.',
      features: [
        'SSR-рендеринг (Angular, Next.js, Nuxt)',
        'Умные фильтры без перезагрузки страницы',
        'Приём оплаты и синхронизация с 1С/МойСклад',
        'Динамический sitemap и страницы под запросы',
      ],
      audience: 'Интернет-магазины и B2B-порталы',
    },
    {
      id: 'seo-audit',
      icon: 'activity',
      title: 'SEO-аудит и ускорение',
      description: 'Находим, что мешает сайту расти в поиске, и устраняем это.',
      features: [
        'Аудит и оптимизация Core Web Vitals',
        'Исправление ошибок индексации',
        'Микроразметка Schema.org',
        'План приоритетных доработок',
      ],
      audience: 'Действующие сайты с просевшим трафиком',
    },
  ],
  techStack: [
    {
      id: 'frontend',
      icon: 'zap',
      area: 'Frontend',
      technologies: ['Angular', 'Next.js (React)', 'Nuxt (Vue)'],
      benefit: 'SSR из коробки — поисковики получают готовый HTML и быстрее индексируют сайт.',
    },
    {
      id: 'styling',
      icon: 'layers',
      area: 'Стилизация',
      technologies: ['Tailwind CSS', 'Компонентные UI-библиотеки'],
      benefit: 'Быстрая вёрстка, адаптивность из коробки и минимальный вес стилей.',
    },
    {
      id: 'backend',
      icon: 'server',
      area: 'Backend',
      technologies: ['.NET (C#)', 'Node.js', 'Python'],
      benefit: 'Устойчивая бизнес-логика, микросервисы и интеграции без компромиссов в нагрузке.',
    },
    {
      id: 'desktop',
      icon: 'monitor',
      area: 'Desktop',
      technologies: ['Tauri', 'Electron', '.NET MAUI'],
      benefit: 'Кроссплатформенные десктоп-приложения на веб-стеке — один код, три ОС.',
    },
    {
      id: 'data',
      icon: 'database',
      area: 'Данные и кэш',
      technologies: ['PostgreSQL', 'Redis', 'Entity Framework Core'],
      benefit: 'Надёжное хранение данных и быстрый отклик даже при высокой посещаемости.',
    },
  ],
  processSteps: [
    { step: 1, title: 'Анализ и ТЗ', description: 'Разбираем задачу бизнеса, фиксируем требования и границы проекта.' },
    { step: 2, title: 'Прототипирование', description: 'Собираем структуру и интерфейс, согласовываем до начала разработки.' },
    { step: 3, title: 'Разработка', description: 'Параллельно ведём backend и frontend короткими итерациями с демо.' },
    { step: 4, title: 'SEO-настройка и тестирование', description: 'Настраиваем индексацию, микроразметку и проверяем производительность.' },
    { step: 5, title: 'Релиз и поддержка', description: 'Выкатываем проект, передаём исходники и остаёмся на связи.' },
  ],
  caseStudies: [],
};

const CONTENT: Record<Locale, LocalizedContent> = { en: EN, ru: RU };

// Static bilingual data today; each method already returns what a future
// `GET /content/...?locale=..` endpoint would, so swapping the body for an
// HttpClient call later won't require touching ContentStore or any component.
@Injectable({ providedIn: 'root' })
export class ContentService {
  getTrustPoints(locale: Locale): Observable<TrustPoint[]> {
    return of(CONTENT[locale].trustPoints);
  }

  getServiceCategories(locale: Locale): Observable<ServiceCategory[]> {
    return of(CONTENT[locale].services);
  }

  getTechStack(locale: Locale): Observable<TechStackArea[]> {
    return of(CONTENT[locale].techStack);
  }

  getProcessSteps(locale: Locale): Observable<ProcessStep[]> {
    return of(CONTENT[locale].processSteps);
  }

  getCaseStudies(locale: Locale): Observable<CaseStudy[]> {
    return of(CONTENT[locale].caseStudies);
  }
}
