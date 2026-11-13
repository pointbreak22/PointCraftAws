import { Component, computed, input } from '@angular/core';

// Bump whenever public/svg/icons.svg changes. The sprite has a fixed name and is cached by
// browsers for an hour (see src/server.ts), so without a new URL returning visitors keep the
// old sprite and newly added symbols render as empty boxes.
const SPRITE_URL = '/svg/icons.svg?v=2026-11-13';

@Component({
  selector: 'svg[appIcon]',
  template: `<svg:use [attr.href]="href()" />`,
})
export class Icon {
  readonly appIcon = input.required<string>();
  protected readonly href = computed(() => `${SPRITE_URL}#${this.appIcon()}`);
}
