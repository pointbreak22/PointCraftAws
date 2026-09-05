import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebar {
  protected readonly links = [
    { path: '/dashboard/requests', label: 'Contact requests' },
    { path: '/dashboard/services', label: 'Services' },
    { path: '/dashboard/tech-stack', label: 'Tech stack' },
    { path: '/dashboard/process', label: 'Process' },
    { path: '/dashboard/cases', label: 'Case studies' },
    { path: '/dashboard/trust-points', label: 'Trust points' },
  ];
}
