import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminContentService, EMPTY_ADMIN_ID } from '../../core/content/admin-content.service';
import { CaseStudyAdmin, CaseStudyResultAdmin } from '../../interfaces/admin-content';

// Each result (e.g. "Load time | Время загрузки | -40%") is one pipe-separated line — simplest
// UI for what's typically 2-4 metrics per case study, no nested add/remove-row list widget.
function resultsToText(results: CaseStudyResultAdmin[]): string {
  return results.map((r) => `${r.labelEn} | ${r.labelRu} | ${r.value}`).join('\n');
}

function textToResults(text: string): CaseStudyResultAdmin[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const [labelEn = '', labelRu = '', value = ''] = line.split('|').map((part) => part.trim());
      return { labelEn, labelRu, value };
    });
}

@Component({
  selector: 'app-dashboard-cases',
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-cases.html',
  styleUrl: './dashboard-cases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCases implements OnInit {
  private readonly api = new AdminContentService<CaseStudyAdmin>(inject(HttpClient), 'case-studies');
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly items = signal<CaseStudyAdmin[]>([]);
  protected readonly editingId = signal<string | null>(null);
  protected readonly saving = signal(false);

  protected readonly form = this.fb.group({
    titleEn: this.fb.control('', Validators.required),
    titleRu: this.fb.control('', Validators.required),
    taskEn: this.fb.control('', Validators.required),
    taskRu: this.fb.control('', Validators.required),
    solutionEn: this.fb.control('', Validators.required),
    solutionRu: this.fb.control('', Validators.required),
    results: this.fb.control(''),
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
      titleEn: '', titleRu: '', taskEn: '', taskRu: '', solutionEn: '', solutionRu: '',
      results: '', sortOrder: this.items().length + 1,
    });
  }

  startEdit(item: CaseStudyAdmin): void {
    this.editingId.set(item.id);
    this.form.reset({ ...item, results: resultsToText(item.results) });
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
    const value: CaseStudyAdmin = { id, ...raw, results: textToResults(raw.results) };
    const request = id === EMPTY_ADMIN_ID ? this.api.create(value) : this.api.update(value);

    request.subscribe(() => {
      this.saving.set(false);
      this.editingId.set(null);
      this.refresh();
    });
  }

  remove(item: CaseStudyAdmin): void {
    if (!confirm(`Delete "${item.titleEn}"?`)) return;
    this.api.delete(item.id).subscribe(() => this.refresh());
  }
}
