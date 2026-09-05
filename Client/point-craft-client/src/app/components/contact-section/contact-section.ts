import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icon } from '../icon/icon';
import { ContactService } from '../../services/contact.service';
import { ContentStore } from '../../stores/content.store';
import { LocaleStore } from '../../stores/locale.store';
import { RevealOnScroll } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, Icon, RevealOnScroll],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSection {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);
  protected readonly contentStore = inject(ContentStore);
  protected readonly t = inject(LocaleStore).t;

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.group({
    name: this.fb.control('', Validators.required),
    contact: this.fb.control('', Validators.required),
    projectType: this.fb.control(''),
    message: this.fb.control('', Validators.required),
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.contactService.send(this.form.getRawValue()).subscribe(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form.reset();
    });
  }
}
