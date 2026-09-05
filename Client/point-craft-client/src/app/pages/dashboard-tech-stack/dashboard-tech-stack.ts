import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminContentService, EMPTY_ADMIN_ID } from '../../core/content/admin-content.service';
import { TechStackAreaAdmin } from '../../interfaces/admin-content';

function linesToArray(text: string): string[] {
  return text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
}

@Component({
  selector: 'app-dashboard-tech-stack',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-tech-stack.html',
  styleUrl: './dashboard-tech-stack.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTechStack implements OnInit {
  private readonly api = new AdminContentService<TechStackAreaAdmin>(inject(HttpClient), 'tech-stack');
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly items = signal<TechStackAreaAdmin[]>([]);
  protected readonly editingId = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    icon: this.fb.control('', Validators.required),
    areaEn: this.fb.control('', Validators.required),
    areaRu: this.fb.control('', Validators.required),
    technologies: this.fb.control(''),
    benefitEn: this.fb.control('', Validators.required),
    benefitRu: this.fb.control('', Validators.required),
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
      icon: '', areaEn: '', areaRu: '', technologies: '', benefitEn: '', benefitRu: '',
      sortOrder: this.items().length + 1,
    });
  }

  startEdit(item: TechStackAreaAdmin): void {
    this.editingId.set(item.id);
    this.form.reset({ ...item, technologies: item.technologies.join('\n') });
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
    const value: TechStackAreaAdmin = { id, ...raw, technologies: linesToArray(raw.technologies) };
    const request = id === EMPTY_ADMIN_ID ? this.api.create(value) : this.api.update(value);

    request.subscribe(() => {
      this.saving.set(false);
      this.editingId.set(null);
      this.refresh();
    });
  }

  remove(item: TechStackAreaAdmin): void {
    if (!confirm(`Delete "${item.areaEn}"?`)) return;
    this.api.delete(item.id).subscribe(() => this.refresh());
  }
}
