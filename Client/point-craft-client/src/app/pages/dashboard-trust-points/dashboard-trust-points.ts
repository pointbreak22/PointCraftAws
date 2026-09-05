import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminContentService, EMPTY_ADMIN_ID } from '../../core/content/admin-content.service';
import { TrustPointAdmin } from '../../interfaces/admin-content';

@Component({
  selector: 'app-dashboard-trust-points',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-trust-points.html',
  styleUrl: './dashboard-trust-points.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTrustPoints implements OnInit {
  private readonly api = new AdminContentService<TrustPointAdmin>(inject(HttpClient), 'trust-points');
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly items = signal<TrustPointAdmin[]>([]);
  protected readonly editingId = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    icon: this.fb.control('', Validators.required),
    labelEn: this.fb.control('', Validators.required),
    labelRu: this.fb.control('', Validators.required),
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
    this.form.reset({ icon: '', labelEn: '', labelRu: '', sortOrder: this.items().length + 1 });
  }

  startEdit(item: TrustPointAdmin): void {
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

  remove(item: TrustPointAdmin): void {
    if (!confirm(`Delete "${item.labelEn}"?`)) return;
    this.api.delete(item.id).subscribe(() => this.refresh());
  }
}
