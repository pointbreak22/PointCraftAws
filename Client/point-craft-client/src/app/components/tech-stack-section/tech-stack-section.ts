import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-tech-stack-section',
  imports: [Icon, RevealOnScroll],
  templateUrl: './tech-stack-section.html',
  styleUrl: './tech-stack-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackSection {
  protected readonly contentStore = inject(ContentStore);
  protected readonly t = inject(LocaleStore).t;
}
