import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input, numberAttribute } from '@angular/core';

// Fades an element in as it scrolls into view. The hidden state is only ever applied
// client-side inside afterNextRender — never as a static/host class — so the
// server-rendered HTML is always fully visible and nothing depends on JS to be seen.
@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScroll implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private observer?: IntersectionObserver;

  // Optional stagger delay in ms, e.g. `[appRevealOnScroll]="i * 80"` in a `@for`.
  // `numberAttribute` lets the bare attribute form (no `[...]`, used for a plain
  // reveal with no stagger) bind too — its empty-string value transforms to 0.
  readonly appRevealOnScroll = input(0, { transform: numberAttribute });

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.el.style.transitionDelay = `${this.appRevealOnScroll()}ms`;
      this.el.classList.add('reveal-hidden', 'reveal-transition');

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.el.classList.remove('reveal-hidden');
            this.observer?.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      this.observer.observe(this.el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
