import { Locale } from '../interfaces/locale';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Translations {
  seo: {
    homeTitle: string;
    homeDescription: string;
    organizationDescription: string;
    serviceTitleSuffix: string;
    projectTitleSuffix: string;
  };
  nav: {
    services: string;
    stack: string;
    process: string;
    cases: string;
    faq: string;
    discussProject: string;
    openMenu: string;
    language: string;
    home: string;
  };
  theme: {
    switchToLight: string;
    switchToDark: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    heading: string;
    subheading: string;
    more: string;
  };
  stack: {
    heading: string;
    subheading: string;
  };
  process: {
    heading: string;
    subheading: string;
  };
  cases: {
    heading: string;
    subheading: string;
    empty: string;
    taskLabel: string;
    solutionLabel: string;
    more: string;
  };
  faq: {
    heading: string;
    subheading: string;
    items: FaqItem[];
  };
  detail: {
    servicesCrumb: string;
    projectsCrumb: string;
    whatsIncluded: string;
    forWhom: string;
    relatedProjects: string;
    otherServices: string;
    task: string;
    solution: string;
    architecture: string;
    stack: string;
    results: string;
    relatedServices: string;
    otherProjects: string;
    viewProject: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
    loading: string;
    notFoundTitle: string;
    notFoundText: string;
    backHome: string;
  };
  contact: {
    heading: string;
    subheading: string;
    successMessage: string;
    nameLabel: string;
    nameError: string;
    contactLabel: string;
    contactError: string;
    projectTypeLabel: string;
    projectTypePlaceholder: string;
    messageLabel: string;
    messageError: string;
    submit: string;
    submitting: string;
  };
  footer: {
    tagline: string;
  };
}

const en: Translations = {
  seo: {
    homeTitle: 'POINTBREAK22 Lab — web services, marketplaces, real-time & desktop app development',
    homeDescription:
      'POINTBREAK22 Lab builds web services, SaaS, marketplaces, real-time apps with chat and video calls, ' +
      'and cross-platform desktop software on .NET and Angular — with SSR and SEO out of the box.',
    organizationDescription:
      'Development studio: web services, SaaS, marketplaces, real-time and desktop applications on .NET and Angular.',
    serviceTitleSuffix: 'POINTBREAK22 Lab',
    projectTitleSuffix: 'POINTBREAK22 Lab case study',
  },
  nav: {
    services: 'Services',
    stack: 'Stack',
    process: 'Process',
    cases: 'Projects',
    faq: 'FAQ',
    discussProject: 'Discuss your project',
    openMenu: 'Open menu',
    language: 'Language',
    home: 'Home',
  },
  theme: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  hero: {
    badge: 'POINTBREAK22 Lab · development studio',
    title: 'Web services, marketplaces, and desktop apps for problems a template can’t solve',
    subtitle:
      'From SSR catalogs and SaaS dashboards to messengers with video calls and plugin-based desktop software. ' +
      'Clean architecture, tests, and SEO are part of every project, not an extra.',
    ctaPrimary: 'Get a project estimate',
    ctaSecondary: 'See projects',
  },
  services: {
    heading: 'Services organized by the problem, not the stack',
    subheading: 'Pick a direction based on your business goal — we choose the technology to fit it.',
    more: 'Learn more',
  },
  stack: {
    heading: 'A stack chosen for reliability, speed, and SEO',
    subheading: 'Every part of the stack solves a specific business problem, not just a technical one.',
  },
  process: {
    heading: 'A transparent way of working',
    subheading: 'Every stage ends with a concrete, checkable result.',
  },
  cases: {
    heading: 'Projects',
    subheading: 'Systems we designed and built — with the architecture behind them.',
    empty: "We're collecting our first case studies — real project results will show up here soon.",
    taskLabel: 'Task:',
    solutionLabel: 'Solution:',
    more: 'Architecture in detail',
  },
  faq: {
    heading: 'Frequently asked questions',
    subheading: 'Short answers to what clients usually ask before we start.',
    items: [
      {
        question: 'How much does it cost to build a web service?',
        answer:
          'It depends on the scope: the number of user roles, integrations, and screens. We give a free estimate ' +
          'after a short call — with a list of features, a timeline, and a fixed price per stage.',
      },
      {
        question: 'How long does development take?',
        answer:
          'An MVP usually takes 3–6 weeks. Larger systems — marketplaces, messengers, desktop software — are built ' +
          'in iterations with a working demo every one or two weeks.',
      },
      {
        question: 'Who owns the source code?',
        answer:
          'You do. We hand over the repository, deployment access, and documentation, so your own team or another ' +
          'contractor can continue the project without a rewrite.',
      },
      {
        question: 'Can you take over or migrate an existing project?',
        answer:
          'Yes. We start with a code audit, then refactor or port the project — for example from PHP/Laravel to ' +
          '.NET and Angular — preserving all users and data.',
      },
      {
        question: 'Will the site be visible in Google and Yandex?',
        answer:
          'Public pages are rendered on the server, have their own URLs in every language, a sitemap, and ' +
          'structured data. We also set up Google Search Console and Yandex Webmaster.',
      },
      {
        question: 'Do you build desktop apps for macOS and Linux?',
        answer:
          'Yes. With Avalonia, Electron, or Tauri one codebase runs on Windows, macOS, and Linux. When deep ' +
          'Windows integration matters we build a native WPF or WinForms app.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We stay in touch: we fix bugs, monitor errors (alerts come to Telegram), update dependencies, and ' +
          'develop new features on request.',
      },
    ],
  },
  detail: {
    servicesCrumb: 'Services',
    projectsCrumb: 'Projects',
    whatsIncluded: 'What’s included',
    forWhom: 'Who it’s for',
    relatedProjects: 'Projects in this area',
    otherServices: 'Other services',
    task: 'Task',
    solution: 'Solution',
    architecture: 'Architecture',
    stack: 'Stack',
    results: 'In numbers',
    relatedServices: 'Related services',
    otherProjects: 'Other projects',
    viewProject: 'Open project',
    ctaHeading: 'Need something similar?',
    ctaText: 'Tell us about your task — we’ll reply with a timeline and cost estimate.',
    ctaButton: 'Discuss your project',
    loading: 'Loading…',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page doesn’t exist or has moved.',
    backHome: 'Back to home',
  },
  contact: {
    heading: "Let's discuss your project",
    subheading: "Tell us what you need — we'll reply with a timeline and cost estimate.",
    successMessage: "Request sent. We'll get back to you shortly.",
    nameLabel: 'Name',
    nameError: 'Please enter your name',
    contactLabel: 'Email or Telegram',
    contactError: 'Please enter an email or Telegram handle',
    projectTypeLabel: 'Project type',
    projectTypePlaceholder: "Not sure yet, I'd like a consultation",
    messageLabel: 'What do you need built',
    messageError: 'Describe the task — even in a couple of sentences',
    submit: 'Send request',
    submitting: 'Sending…',
  },
  footer: {
    tagline: 'POINTBREAK22 Lab. Web services, real-time and desktop apps.',
  },
};

const ru: Translations = {
  seo: {
    homeTitle: 'POINTBREAK22 Lab — разработка веб-сервисов, маркетплейсов, real-time и десктоп-приложений',
    homeDescription:
      'POINTBREAK22 Lab разрабатывает веб-сервисы, SaaS, маркетплейсы, мессенджеры с видеозвонками и ' +
      'кроссплатформенные десктоп-приложения на .NET и Angular — с SSR и SEO из коробки.',
    organizationDescription:
      'Студия разработки: веб-сервисы, SaaS, маркетплейсы, real-time и десктоп-приложения на .NET и Angular.',
    serviceTitleSuffix: 'POINTBREAK22 Lab',
    projectTitleSuffix: 'кейс POINTBREAK22 Lab',
  },
  nav: {
    services: 'Услуги',
    stack: 'Стек',
    process: 'Процесс',
    cases: 'Проекты',
    faq: 'Вопросы',
    discussProject: 'Обсудить проект',
    openMenu: 'Открыть меню',
    language: 'Язык',
    home: 'Главная',
  },
  theme: {
    switchToLight: 'Включить светлую тему',
    switchToDark: 'Включить тёмную тему',
  },
  hero: {
    badge: 'POINTBREAK22 Lab · студия разработки',
    title: 'Веб-сервисы, маркетплейсы и десктоп-приложения для задач, которые не решить шаблоном',
    subtitle:
      'От SSR-каталогов и SaaS-кабинетов до мессенджеров с видеозвонками и десктоп-программ на плагинах. ' +
      'Чистая архитектура, тесты и SEO — часть каждого проекта, а не опция.',
    ctaPrimary: 'Рассчитать стоимость проекта',
    ctaSecondary: 'Смотреть проекты',
  },
  services: {
    heading: 'Услуги по решаемой задаче, а не по стеку',
    subheading: 'Выбирайте направление по цели бизнеса — технологии подберём под неё.',
    more: 'Подробнее',
  },
  stack: {
    heading: 'Стек, который выбирают ради надёжности, скорости и SEO',
    subheading: 'Каждая часть стека решает конкретную бизнес-задачу — не только техническую.',
  },
  process: {
    heading: 'Прозрачный процесс работы',
    subheading: 'Каждый этап заканчивается понятным результатом, который можно проверить.',
  },
  cases: {
    heading: 'Проекты',
    subheading: 'Системы, которые мы спроектировали и построили, — и архитектура за ними.',
    empty: 'Мы собираем первые кейсы — совсем скоро здесь появятся реальные результаты проектов.',
    taskLabel: 'Задача:',
    solutionLabel: 'Решение:',
    more: 'Архитектура подробно',
  },
  faq: {
    heading: 'Частые вопросы',
    subheading: 'Коротко о том, что обычно спрашивают перед стартом.',
    items: [
      {
        question: 'Сколько стоит разработка веб-сервиса?',
        answer:
          'Зависит от объёма: количества ролей пользователей, интеграций и экранов. Оценку делаем бесплатно ' +
          'после короткого созвона — со списком функций, сроками и фиксированной ценой по этапам.',
      },
      {
        question: 'Сколько времени занимает разработка?',
        answer:
          'MVP — обычно 3–6 недель. Крупные системы — маркетплейсы, мессенджеры, десктоп-программы — делаем ' +
          'итерациями с рабочим демо каждые одну-две недели.',
      },
      {
        question: 'Кому принадлежит исходный код?',
        answer:
          'Вам. Передаём репозиторий, доступы к серверу и документацию — проект сможет продолжить ваша команда ' +
          'или другой подрядчик без переписывания.',
      },
      {
        question: 'Можно доработать или перенести существующий проект?',
        answer:
          'Да. Начинаем с аудита кода, затем рефакторим или переносим проект — например, с PHP/Laravel на ' +
          '.NET и Angular — с сохранением всех пользователей и данных.',
      },
      {
        question: 'Будет ли сайт виден в Google и Яндексе?',
        answer:
          'Публичные страницы рендерятся на сервере, у каждой есть свой адрес на каждом языке, sitemap и ' +
          'микроразметка. Также настраиваем Google Search Console и Яндекс Вебмастер.',
      },
      {
        question: 'Делаете ли вы десктоп-приложения под macOS и Linux?',
        answer:
          'Да. На Avalonia, Electron или Tauri один код работает на Windows, macOS и Linux. Если нужна глубокая ' +
          'интеграция с Windows — делаем нативное приложение на WPF или WinForms.',
      },
      {
        question: 'Что происходит после запуска?',
        answer:
          'Остаёмся на связи: исправляем ошибки, следим за сбоями (оповещения приходят в Telegram), обновляем ' +
          'зависимости и развиваем новые функции по запросу.',
      },
    ],
  },
  detail: {
    servicesCrumb: 'Услуги',
    projectsCrumb: 'Проекты',
    whatsIncluded: 'Что входит',
    forWhom: 'Для кого',
    relatedProjects: 'Проекты по направлению',
    otherServices: 'Другие услуги',
    task: 'Задача',
    solution: 'Решение',
    architecture: 'Архитектура',
    stack: 'Стек',
    results: 'В цифрах',
    relatedServices: 'Связанные услуги',
    otherProjects: 'Другие проекты',
    viewProject: 'Открыть проект',
    ctaHeading: 'Нужно что-то похожее?',
    ctaText: 'Расскажите о задаче — ответим с оценкой сроков и стоимости.',
    ctaButton: 'Обсудить проект',
    loading: 'Загрузка…',
    notFoundTitle: 'Страница не найдена',
    notFoundText: 'Такой страницы нет или она переехала.',
    backHome: 'На главную',
  },
  contact: {
    heading: 'Обсудим ваш проект',
    subheading: 'Расскажите, что нужно — ответим с оценкой сроков и стоимости.',
    successMessage: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    nameLabel: 'Имя',
    nameError: 'Укажите имя',
    contactLabel: 'Email или Telegram',
    contactError: 'Укажите email или Telegram',
    projectTypeLabel: 'Тип проекта',
    projectTypePlaceholder: 'Не уверен(а), нужна консультация',
    messageLabel: 'Что нужно сделать',
    messageError: 'Опишите задачу — хотя бы в двух словах',
    submit: 'Отправить заявку',
    submitting: 'Отправляем…',
  },
  footer: {
    tagline: 'POINTBREAK22 Lab. Веб-сервисы, real-time и десктоп-приложения.',
  },
};

export const TRANSLATIONS: Record<Locale, Translations> = { en, ru };
