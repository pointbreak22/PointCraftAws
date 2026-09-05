import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  imports: [],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebar {}
