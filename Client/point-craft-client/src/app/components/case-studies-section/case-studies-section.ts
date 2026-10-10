import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-case-studies-section',
  imports: [Icon, RevealOnScroll, RouterLink],
  templateUrl: './case-studies-section.html',
  styleUrl: './case-studies-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseStudiesSection {
  protected readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  protected readonly t = this.localeStore.t;
  protected readonly prefix = this.localeStore.prefix;
}
