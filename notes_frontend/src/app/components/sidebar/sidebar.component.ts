import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  providers: [],
  template: `
    <div class="sidebar">
      <mat-nav-list>
        <a mat-list-item routerLink="/notes" routerLinkActive="active">
          <mat-icon>list</mat-icon>
          <span>All Notes</span>
        </a>
        <a mat-list-item routerLink="/notes/new" routerLinkActive="active">
          <mat-icon>add</mat-icon>
          <span>New Note</span>
        </a>
      </mat-nav-list>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100%;
      background-color: white;
      border-right: 1px solid #e0e0e0;
    }
    
    .mat-nav-list {
      padding-top: 1rem;
    }

    .mat-nav-list a {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #424242;
      height: 48px;
    }

    .mat-nav-list a.active {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    mat-icon {
      color: inherit;
    }
  `]
})
export class SidebarComponent {}
