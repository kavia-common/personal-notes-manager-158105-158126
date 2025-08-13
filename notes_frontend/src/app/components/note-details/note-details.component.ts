import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NavigationComponent } from '../../components/shared/navigation/navigation.component';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, NavigationComponent] as const,
  template: `
    <app-navigation></app-navigation>
    <div class="details-container" *ngIf="note">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ note.title }}</mat-card-title>
          <mat-card-subtitle>
            Last updated: {{ note.updatedAt | date:'medium' }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="note-content">{{ note.content }}</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button [routerLink]="['/notes', note.id, 'edit']" color="primary">
            <mat-icon>edit</mat-icon> Edit
          </button>
          <button mat-button (click)="onDelete()" color="warn">
            <mat-icon>delete</mat-icon> Delete
          </button>
          <button mat-button routerLink="/notes">
            <mat-icon>arrow_back</mat-icon> Back to Notes
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .details-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .note-content {
      margin: 2rem 0;
      white-space: pre-line;
      line-height: 1.6;
    }

    mat-card-actions {
      padding: 1rem;
    }

    button mat-icon {
      margin-right: 4px;
    }
  `]
})
export class NoteDetailsComponent {
  note: Note | undefined;

  constructor(
    private readonly notesService: NotesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = this.notesService.getNote(id);
      if (!this.note) {
        this.router.navigate(['/notes']);
      }
    }
  }

  onDelete(): void {
    if (this.note?.id) {
      this.notesService.deleteNote(this.note.id);
      this.router.navigate(['/notes']);
    }
  }
}
