import { Injectable, afterNextRender, signal } from '@angular/core';
import { ThemeName } from '../interfaces/theme';

const STORAGE_KEY = 'pointcraft:theme';
const DEFAULT_THEME: ThemeName = 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  private readonly _theme = signal<ThemeName>(DEFAULT_THEME);
  readonly theme = this._theme.asReadonly();

  constructor() {
    // afterNextRender never runs during SSR, so this is the only place that
    // touches localStorage/document — the server-rendered markup already
    // matches DEFAULT_THEME via styles.css, no [data-theme] attribute needed.
    afterNextRender(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      this.setTheme(stored ?? DEFAULT_THEME);
    });
  }

  setTheme(theme: ThemeName): void {
    this._theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }
}
