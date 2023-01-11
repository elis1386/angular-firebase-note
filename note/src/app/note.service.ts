import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private afs: Firestore) {}

  //Add Note
  addNote(note: Note) {
    note.id = doc(collection(this.afs, 'id')).id;
    return addDoc(collection(this.afs, 'Note'), note);
  }

  //Get Notes
  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.afs, 'Note');
    return collectionData(notesRef, { idField: 'id' }) as unknown as Observable<Note[]>;
  }
  //Delete Note
  deleteNote(note: Note) {
    let docRef = doc(this.afs, `Note/${note.id}`);
    return deleteDoc(docRef);
  }

  //Update Note
  updateNote(note: Note, notes: any) {
    const docRef = doc(this.afs, `Note/${note.id}`);
    return updateDoc(docRef, notes);
  }
}