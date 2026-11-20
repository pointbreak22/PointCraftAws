import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { IdeaMeter } from '../idea-meter/idea-meter';
import { RANKED_PROJECT_IDEAS } from '../../i18n/project-ideas';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';
import { Spotlight } from '../../shared/spotlight.directive';

// "Projects I can take on at any moment" — ten in-demand product ideas between the case studies
// and the contact form, ranked by demand and by how few ready-made alternatives exist. The top
// three get large cards. Static content, so every card is in the server-rendered HTML and links
// to its own indexable page at /ideas/:slug.
@Component({
  selector: 'app-project-ideas-section',
  imports: [Icon, IdeaMeter, RevealOnScroll, RouterLink, Spotlight],
  templateUrl: './project-ideas-section.html',
  styleUrl: './project-ideas-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectIdeasSection {
  private readonly localeStore = inject(LocaleStore);
  protected readonly t = this.localeStore.t;
  protected readonly prefix = this.localeStore.prefix;
  protected readonly home = this.localeStore.home;

  private readonly ideas = computed(() => {
    const locale = this.localeStore.locale();
    return RANKED_PROJECT_IDEAS.map((idea, index) => ({
      slug: idea.slug,
      icon: idea.icon,
      demand: idea.demand,
      gap: idea.gap,
      stack: idea.stack.slice(0, 4),
      rank: String(index + 1).padStart(2, '0'),
      ...idea.text[locale],
    }));
  });
  protected readonly top = computed(() => this.ideas().slice(0, 3));
  protected readonly rest = computed(() => this.ideas().slice(3));
}
