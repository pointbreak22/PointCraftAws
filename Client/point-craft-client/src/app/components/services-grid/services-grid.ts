import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-services-grid',
  imports: [Icon, RevealOnScroll, RouterLink],
  templateUrl: './services-grid.html',
  styleUrl: './services-grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesGrid {
  protected readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  protected readonly t = this.localeStore.t;
  protected readonly prefix = this.localeStore.prefix;
}
