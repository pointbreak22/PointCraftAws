import { Directive, ElementRef, inject } from '@angular/core';

// Feeds the pointer position into --mx/--my so the `.spotlight` glow follows the cursor,
// and into --rx/--ry so cards that also carry `.tilt` lean slightly towards it.
// Host listeners only fire in the browser, so this is SSR-safe.
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class Spotlight {
  private static readonly maxTilt = 2.5; // degrees
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  protected onMove(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    const rect = this.el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const style = this.el.style;
    style.setProperty('--mx', `${x}px`);
    style.setProperty('--my', `${y}px`);
    style.setProperty('--ry', `${((x / rect.width - 0.5) * 2 * Spotlight.maxTilt).toFixed(2)}deg`);
    style.setProperty('--rx', `${((0.5 - y / rect.height) * 2 * Spotlight.maxTilt).toFixed(2)}deg`);
  }

  protected onLeave(): void {
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  }
}
