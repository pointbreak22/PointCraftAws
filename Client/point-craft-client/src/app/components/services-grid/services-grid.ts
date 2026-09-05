import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-services-grid',
  imports: [Icon, RevealOnScroll],
  templateUrl: './services-grid.html',
  styleUrl: './services-grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesGrid {
  protected readonly contentStore = inject(ContentStore);
  protected readonly t = inject(LocaleStore).t;
}
