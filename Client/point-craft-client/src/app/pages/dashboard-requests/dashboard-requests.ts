import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactRequestListItem } from '../../interfaces/content';

@Component({
  selector: 'app-dashboard-requests',
  imports: [DatePipe],
  templateUrl: './dashboard-requests.html',
  styleUrl: './dashboard-requests.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardRequests implements OnInit {
  private readonly contactService = inject(ContactService);

  protected readonly requests = signal<ContactRequestListItem[]>([]);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.contactService.list().subscribe((value) => {
      this.requests.set(value);
      this.loading.set(false);
    });
  }
}
