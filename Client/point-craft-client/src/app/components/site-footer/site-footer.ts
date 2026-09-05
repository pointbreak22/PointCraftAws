import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocaleStore } from '../../stores/locale.store';

@Component({
  selector: 'app-site-footer',
  imports: [NgOptimizedImage],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
  protected readonly t = inject(LocaleStore).t;
}
