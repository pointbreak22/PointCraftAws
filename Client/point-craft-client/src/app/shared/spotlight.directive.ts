import { Directive, ElementRef, inject } from '@angular/core';

// Feeds the pointer position into --mx/--my so the `.spotlight` glow follows the cursor.
// Host listeners only fire in the browser, so this is SSR-safe.
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
    '(pointermove)': 'onMove($event)',
  },
})
export class Spotlight {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
