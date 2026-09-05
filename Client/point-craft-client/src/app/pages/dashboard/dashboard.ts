import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { LeftSidebar } from '../../components/left-sidebar/left-sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [Header, LeftSidebar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
