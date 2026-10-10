import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    // Keeps fragment scrolling (#services, #contact…) from tucking section headings under the
    // 64px sticky SiteHeader.
    inject(ViewportScroller).setOffset([0, 80]);
  }
}
