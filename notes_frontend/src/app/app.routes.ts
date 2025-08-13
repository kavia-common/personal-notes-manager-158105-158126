import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  {
    path: 'notes',
    loadComponent: () => import('./components/notes-list/notes-list.component')
      .then(m => m.NotesListComponent)
  },
  {
    path: 'notes/new',
    loadComponent: () => import('./components/note-editor/note-editor.component')
      .then(m => m.NoteEditorComponent)
  },
  {
    path: 'notes/:id',
    loadComponent: () => import('./components/note-details/note-details.component')
      .then(m => m.NoteDetailsComponent)
  },
  {
    path: 'notes/:id/edit',
    loadComponent: () => import('./components/note-editor/note-editor.component')
      .then(m => m.NoteEditorComponent)
  }
];
