import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminContentService, EMPTY_ADMIN_ID } from '../../core/content/admin-content.service';
import { ServiceAdmin } from '../../interfaces/admin-content';

// Feature lists are edited as one line per item in a textarea — simplest possible UI for what's
// a handful of short bullet points per service, no need for an add/remove-row list widget.
function linesToArray(text: string): string[] {
  return text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
}

@Component({
  selector: 'app-dashboard-services',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-services.html',
  styleUrl: './dashboard-services.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardServices implements OnInit {
  private readonly api = new AdminContentService<ServiceAdmin>(inject(HttpClient), 'services');
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly items = signal<ServiceAdmin[]>([]);
  protected readonly editingId = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    icon: this.fb.control('', Validators.required),
    titleEn: this.fb.control('', Validators.required),
    titleRu: this.fb.control('', Validators.required),
    descriptionEn: this.fb.control('', Validators.required),
    descriptionRu: this.fb.control('', Validators.required),
    featuresEn: this.fb.control(''),
    featuresRu: this.fb.control(''),
    audienceEn: this.fb.control('', Validators.required),
    audienceRu: this.fb.control('', Validators.required),
    sortOrder: this.fb.control(1, Validators.required),
  });

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.api.list().subscribe((items) => this.items.set(items));
  }

  startAdd(): void {
    this.editingId.set(EMPTY_ADMIN_ID);
    this.form.reset({
      icon: '', titleEn: '', titleRu: '', descriptionEn: '', descriptionRu: '',
      featuresEn: '', featuresRu: '', audienceEn: '', audienceRu: '',
      sortOrder: this.items().length + 1,
    });
  }

  startEdit(item: ServiceAdmin): void {
    this.editingId.set(item.id);
    this.form.reset({
      ...item,
      featuresEn: item.featuresEn.join('\n'),
      featuresRu: item.featuresRu.join('\n'),
    });
  }

  cancel(): void {
    this.editingId.set(null);
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editingId();
    if (id === null) return;

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const value: ServiceAdmin = {
      id,
      ...raw,
      featuresEn: linesToArray(raw.featuresEn),
      featuresRu: linesToArray(raw.featuresRu),
    };
    const request = id === EMPTY_ADMIN_ID ? this.api.create(value) : this.api.update(value);

    request.subscribe(() => {
      this.saving.set(false);
      this.editingId.set(null);
      this.refresh();
    });
  }

  remove(item: ServiceAdmin): void {
    if (!confirm(`Delete "${item.titleEn}"?`)) return;
    this.api.delete(item.id).subscribe(() => this.refresh());
  }
}
