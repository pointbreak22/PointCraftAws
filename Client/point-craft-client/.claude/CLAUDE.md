# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

```bash
ng serve   # dev server, http://localhost:4200
ng build   # production build (browser + server bundles) to dist/
ng test    # unit tests via Vitest
```

**Windows/this machine gotcha:** the `npm`/`node`/`ng` shims on PATH (`C:\Users\...\AppData\Roaming\npm\node.ps1`) are broken (`No such file or directory`). Invoke the real node directly instead:
```bash
"C:\nvm4w\nodejs\node.exe" "node_modules\@angular\cli\bin\ng.js" build
"C:\nvm4w\nodejs\node.exe" "node_modules\@angular\cli\bin\ng.js" serve --port 4200
```

## Project

Angular 21 (standalone components, signals) **SSR** app — `@angular/ssr` + Express (`src/server.ts`, `src/main.server.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.server.ts`), started 2026-09-03. Deployment target is **AWS, initially on the free tier** — no infra provisioned yet, don't assume a specific AWS service until told. A backend may be added later; as of now there is no API, no auth provider, and no data layer — don't scaffold speculative HTTP/auth code for it.

Architecture and visual style are deliberately modeled on the user's other project, **MessengerAzure** (`E:\Projects\My Projects\MessengerAzure\Client\messenger-client`, a plain SPA, not SSR), with two differences: no right sidebar, and a switchable color palette instead of a hardcoded one. When a structural question comes up with no obvious answer, check the equivalent file over there first.

**Structure convention** (mirrors MessengerAzure): `pages/` = routed, top-level views; `components/` = reusable pieces embedded in pages; `core/` = cross-cutting infra (auth, http, realtime — none exist yet, add as the backend is defined); `services/` = thin HTTP wrappers, one per resource, no state; `stores/` = signal-based state, the only thing components inject; `shared/` = pure helper functions; `interfaces/` = DTOs/types. Every component uses the 3-file split (`.ts`+`.html`+`.css`), even when the `.css` ends up empty because styling is Tailwind utility classes in the template.

**Routing/shell:** `app.routes.ts` — `''` → `Landing` (eager, it's the entry point), `dashboard` → `Dashboard` (lazy `loadComponent`), `**` → redirect to `''`. `pages/dashboard/dashboard.html` is the app shell: `Header` on top, `LeftSidebar` on the left, a `<router-outlet>` for the main content — **no right sidebar** (the one deliberate divergence from MessengerAzure's shell).

**Theming (Tailwind v4, CSS-first, flexible palette):** no `tailwind.config.js`. Color tokens are CSS custom properties in an `@theme` block in `src/styles.css` (same token names as MessengerAzure: `background`/`surface`/`surface-alt`/`surface-elevated`/`surface-hover`, `border`/`border-strong`, `foreground`/`muted-foreground`/`faint-foreground`, `accent-400/500/600`/`accent2-400/500/600`, `online`/`danger`/`danger-600`/`busy`) — never hardcode hex colors in templates. Unlike MessengerAzure, palettes are swappable: the `@theme` block holds the `dark` (default) values, and `[data-theme='light']` in the same file overrides the same custom properties. `src/app/stores/theme.store.ts` (`ThemeStore`) holds the active `ThemeName` signal and `setTheme()`, which sets `document.documentElement`'s `data-theme` attribute and persists to `localStorage` (browser-only, wrapped in `afterNextRender` since this runs under SSR — the server-rendered HTML always matches the `dark` default with no attribute set, avoiding a server/client markup mismatch). `src/app/shared/theme-options.ts` lists the available `ThemeOption`s for UI (e.g. the toggle in `Header`); adding a new palette is: one more entry there + one more `[data-theme='name']` block in `styles.css` — nothing else changes. `src/app/interfaces/theme.ts` defines `ThemeName`/`ThemeOption`.

**Icons:** one SVG sprite, `public/svg/icons.svg`, symbols consumed via the `Icon` component (`src/app/components/icon/icon.ts`, selector `svg[appIcon]`, hijacks the host `<svg>` tag) — `<svg appIcon="sun" class="h-4 w-4"></svg>`. Note the component's own inline template must use `<svg:use>` not `<use>` (Angular compiler otherwise throws `NG8001`, since an inline template doesn't inherit SVG-namespace context). Add new icons as `<symbol id="...">` to the sprite, never inline `<svg><path>` markup in feature templates.

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
