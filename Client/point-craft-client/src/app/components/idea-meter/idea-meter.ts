import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// A labelled 1–5 meter ("Demand ▮▮▮▮▯") for the project ideas. The segments are decorative;
// screen readers get "Demand: 4 out of 5" from the visually hidden text.
@Component({
  selector: 'app-idea-meter',
  templateUrl: './idea-meter.html',
  styleUrl: './idea-meter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex max-w-sm items-center gap-2' },
})
export class IdeaMeter {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  /** Localized "out of". */
  readonly outOf = input.required<string>();
  readonly max = input(5);

  protected readonly segments = computed(() => Array.from({ length: this.max() }, (_, i) => i < this.value()));
}
