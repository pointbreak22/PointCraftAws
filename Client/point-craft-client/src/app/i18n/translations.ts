import { Locale } from '../interfaces/locale';

export interface Translations {
  nav: {
    services: string;
    stack: string;
    process: string;
    cases: string;
    discussProject: string;
    openMenu: string;
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
  nav: {
    services: 'Services',
    stack: 'Stack',
    process: 'Process',
    cases: 'Case studies',
    discussProject: 'Discuss your project',
    openMenu: 'Open menu',
  },
  theme: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  hero: {
    badge: 'Web & desktop development',
    title: 'Web services and desktop apps built for non-standard business problems',
    subtitle:
      'For the web — catalogs, SaaS, and dashboards with SSR and clean indexing out of the box. ' +
      'For desktop — cross-platform apps that integrate with your hardware and processes.',
    ctaPrimary: 'Get a project estimate',
    ctaSecondary: 'How we work',
  },
  services: {
    heading: 'Services organized by the problem, not the stack',
    subheading: 'Pick a direction based on your business goal — we choose the technology to fit it.',
  },
  stack: {
    heading: 'A stack chosen for speed and SEO',
    subheading: 'Every part of the stack solves a specific business problem, not just a technical one.',
  },
  process: {
    heading: 'A transparent way of working',
    subheading: 'Every stage ends with a concrete, checkable result.',
  },
  cases: {
    heading: 'Case studies',
    subheading: 'Real business problems and results in numbers.',
    empty: "We're collecting our first case studies — real project results will show up here soon.",
    taskLabel: 'Task:',
    solutionLabel: 'Solution:',
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
    tagline: 'PointCraft. Websites, web services, and desktop apps.',
  },
};

const ru: Translations = {
  nav: {
    services: 'Услуги',
    stack: 'Стек',
    process: 'Процесс',
    cases: 'Кейсы',
    discussProject: 'Обсудить проект',
    openMenu: 'Открыть меню',
  },
  theme: {
    switchToLight: 'Включить светлую тему',
    switchToDark: 'Включить тёмную тему',
  },
  hero: {
    badge: 'Веб- и десктоп-разработка',
    title: 'Веб-сервисы и десктоп-приложения, которые решают нетиповые задачи бизнеса',
    subtitle:
      'Для веба — каталоги, SaaS и личные кабинеты с SSR и чистой индексацией из коробки. ' +
      'Для десктопа — кроссплатформенные приложения с интеграциями под ваше оборудование и процессы.',
    ctaPrimary: 'Рассчитать стоимость проекта',
    ctaSecondary: 'Как мы работаем',
  },
  services: {
    heading: 'Услуги по решаемой задаче, а не по стеку',
    subheading: 'Выбирайте направление по цели бизнеса — технологии подберём под неё.',
  },
  stack: {
    heading: 'Стек, который выбирают ради скорости и SEO',
    subheading: 'Каждая часть стека решает конкретную бизнес-задачу — не только техническую.',
  },
  process: {
    heading: 'Прозрачный процесс работы',
    subheading: 'Каждый этап заканчивается понятным результатом, который можно проверить.',
  },
  cases: {
    heading: 'Кейсы',
    subheading: 'Реальные задачи бизнеса и результаты в цифрах.',
    empty: 'Мы собираем первые кейсы — совсем скоро здесь появятся реальные результаты проектов.',
    taskLabel: 'Задача:',
    solutionLabel: 'Решение:',
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
    tagline: 'PointCraft. Разработка сайтов, веб-сервисов и десктоп-приложений.',
  },
};

export const TRANSLATIONS: Record<Locale, Translations> = { en, ru };
