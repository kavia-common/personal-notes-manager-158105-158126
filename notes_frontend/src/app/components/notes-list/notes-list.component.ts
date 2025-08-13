import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NavigationComponent } from '../../components/shared/navigation/navigation.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, NavigationComponent] as const,
  template: `
    <app-navigation></app-navigation>
    <div class="notes-list">
      <h2>My Notes</h2>
      <div class="notes-grid">
        <mat-card *ngFor="let note of notes" class="note-card">
          <mat-card-header>
            <mat-card-title>{{ note.title }}</mat-card-title>
            <mat-card-subtitle>
              {{ note.updatedAt | date:'medium' }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ note.content | slice:0:100 }}{{ note.content.length > 100 ? '...' : '' }}</p>
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button [routerLink]="['/notes', note.id]" color="primary">
              <mat-icon>visibility</mat-icon> View
            </button>
            <button mat-button [routerLink]="['/notes', note.id, 'edit']" color="accent">
              <mat-icon>edit</mat-icon> Edit
            </button>
            <button mat-button (click)="deleteNote(note.id)" color="warn">
              <mat-icon>delete</mat-icon> Delete
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .notes-list {
      padding: 2rem;
    }

    h2 {
      color: #424242;
      margin-bottom: 2rem;
    }

    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .note-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
      padding: 1rem 0;
    }

    mat-card-actions {
      padding: 1rem;
    }

    button mat-icon {
      margin-right: 4px;
    }
  `]
})
export class NotesListComponent {
  notes: Note[] = [];

  constructor(private readonly notesService: NotesService) {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  deleteNote(id: string | undefined): void {
    if (id) {
      this.notesService.deleteNote(id);
    }
  }
}
