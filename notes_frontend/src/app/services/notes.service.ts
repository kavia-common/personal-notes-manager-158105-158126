import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    // Initialize with some sample notes
    this.notes = [
      {
        id: '1',
        title: 'Welcome Note',
        content: 'Welcome to your personal notes manager!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.notesSubject.next(this.notes);
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  getNote(id: string): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [...this.notes, newNote];
    this.notesSubject.next(this.notes);
  }

  updateNote(id: string, updates: Partial<Note>): void {
    this.notes = this.notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }
}
