import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ] as const,
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/notes">
        <mat-icon>note</mat-icon>
      </button>
      <span>Personal Notes</span>
      <span class="spacer"></span>
      <button mat-icon-button routerLink="/notes/new">
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }

    mat-toolbar {
      margin-bottom: 1rem;
    }
  `]
})
export class NavigationComponent {}
