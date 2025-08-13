import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NotesService } from '../../services/notes.service';
import { NavigationComponent } from '../../components/shared/navigation/navigation.component';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NavigationComponent
  ] as const,
  template: `
    <app-navigation></app-navigation>
    <div class="editor-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Note' : 'Create New Note' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="noteForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Title</mat-label>
              <input matInput formControlName="title" placeholder="Note title">
              <mat-error *ngIf="noteForm.get('title')?.hasError('required')">
                Title is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Content</mat-label>
              <textarea matInput formControlName="content" placeholder="Note content" rows="10"></textarea>
              <mat-error *ngIf="noteForm.get('content')?.hasError('required')">
                Content is required
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" (click)="onCancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="noteForm.invalid">
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .editor-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    textarea {
      resize: vertical;
    }
  `]
})
export class NoteEditorComponent {
  noteForm: FormGroup;
  isEditMode = false;
  noteId: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly notesService: NotesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.isEditMode = true;
      const note = this.notesService.getNote(this.noteId);
      if (note) {
        this.noteForm.patchValue(note);
      }
    }
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      if (this.isEditMode && this.noteId) {
        this.notesService.updateNote(this.noteId, this.noteForm.value);
      } else {
        this.notesService.addNote(this.noteForm.value);
      }
      this.router.navigate(['/notes']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/notes']);
  }
}
