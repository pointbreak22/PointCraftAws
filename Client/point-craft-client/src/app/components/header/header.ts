import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '../icon/icon';
import { ThemeStore } from '../../stores/theme.store';
import { AuthStore } from '../../core/auth/auth.store';

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly themeStore = inject(ThemeStore);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  protected readonly theme = this.themeStore.theme;

  toggleTheme(): void {
    this.themeStore.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  logout(): void {
    this.authStore.logout();
    this.router.navigateByUrl('/');
  }
}
