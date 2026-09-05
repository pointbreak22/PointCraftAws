import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ThemeStore } from '../../stores/theme.store';

@Component({
  selector: 'app-header',
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly themeStore = inject(ThemeStore);
  protected readonly theme = this.themeStore.theme;

  toggleTheme(): void {
    this.themeStore.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
