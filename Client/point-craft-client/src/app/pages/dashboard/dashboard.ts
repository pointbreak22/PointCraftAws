import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/left-sidebar/left-sidebar';
import { ContactService } from '../../services/contact.service';
import { ContactRequestListItem } from '../../interfaces/content';

@Component({
  selector: 'app-dashboard',
  imports: [Header, LeftSidebar, RouterOutlet, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
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
