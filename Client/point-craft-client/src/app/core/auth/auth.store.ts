import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'pointcraft:auth-token';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Read synchronously (not via afterNextRender like ThemeStore/LocaleStore) — route guards
  // evaluate isAuthenticated() during the app's initial navigation, before any "next render"
  // callback would have fired, so deferring the read would make the guard misfire on refresh.
  private readonly _token = signal<string | null>(
    this.isBrowser ? localStorage.getItem(STORAGE_KEY) : null,
  );

  readonly isAuthenticated = computed(() => this._token() !== null);
  readonly token = this._token.asReadonly();

  login(token: string): void {
    this._token.set(token);
    if (this.isBrowser) localStorage.setItem(STORAGE_KEY, token);
  }

  logout(): void {
    this._token.set(null);
    if (this.isBrowser) localStorage.removeItem(STORAGE_KEY);
  }
}
