import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

// Questions live in translations.ts (not the CMS): they double as the page's FAQPage JSON-LD,
// built in Landing from the same list, so the visible answers and the markup can't drift apart.
@Component({
  selector: 'app-faq-section',
  imports: [Icon, RevealOnScroll],
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSection {
  protected readonly t = inject(LocaleStore).t;
}
