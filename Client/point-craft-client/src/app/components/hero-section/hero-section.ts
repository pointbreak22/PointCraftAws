import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';
import { Spotlight } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-hero-section',
  imports: [Icon, RevealOnScroll, RouterLink, Spotlight],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly contentStore = inject(ContentStore);
  private readonly localeStore = inject(LocaleStore);
  protected readonly t = this.localeStore.t;
  protected readonly home = this.localeStore.home;

  // Every technology from the stack section, de-duplicated and doubled so the
  // marquee track can loop seamlessly by scrolling exactly half its width.
  protected readonly technologies = computed(() => {
    const unique = [...new Set(this.contentStore.techStack().flatMap((area) => area.technologies))];
    return unique.length ? [...unique, ...unique] : [];
  });
}
