import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminContentService, EMPTY_ADMIN_ID } from '../../core/content/admin-content.service';
import { ProcessStepAdmin } from '../../interfaces/admin-content';

@Component({
  selector: 'app-dashboard-process',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-process.html',
  styleUrl: './dashboard-process.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcess implements OnInit {
  private readonly api = new AdminContentService<ProcessStepAdmin>(inject(HttpClient), 'process-steps');
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly items = signal<ProcessStepAdmin[]>([]);
  protected readonly editingId = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    titleEn: this.fb.control('', Validators.required),
    titleRu: this.fb.control('', Validators.required),
    descriptionEn: this.fb.control('', Validators.required),
    descriptionRu: this.fb.control('', Validators.required),
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
    this.form.reset({ titleEn: '', titleRu: '', descriptionEn: '', descriptionRu: '', sortOrder: this.items().length + 1 });
  }

  startEdit(item: ProcessStepAdmin): void {
    this.editingId.set(item.id);
    this.form.reset(item);
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
    const value = { id, ...this.form.getRawValue() };
    const request = id === EMPTY_ADMIN_ID ? this.api.create(value) : this.api.update(value);

    request.subscribe(() => {
      this.saving.set(false);
      this.editingId.set(null);
      this.refresh();
    });
  }

  remove(item: ProcessStepAdmin): void {
    if (!confirm(`Delete "${item.titleEn}"?`)) return;
    this.api.delete(item.id).subscribe(() => this.refresh());
  }
}
