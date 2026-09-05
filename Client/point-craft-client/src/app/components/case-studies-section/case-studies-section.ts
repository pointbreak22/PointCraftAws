import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-case-studies-section',
  imports: [Icon, RevealOnScroll],
  templateUrl: './case-studies-section.html',
  styleUrl: './case-studies-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesSection {
  protected readonly contentStore = inject(ContentStore);
  protected readonly t = inject(LocaleStore).t;
}
