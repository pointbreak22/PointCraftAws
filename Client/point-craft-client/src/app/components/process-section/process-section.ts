import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-process-section',
  imports: [RevealOnScroll],
  templateUrl: './process-section.html',
  styleUrl: './process-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessSection {
  protected readonly contentStore = inject(ContentStore);
  protected readonly t = inject(LocaleStore).t;
}
