import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup;
  editForm!: FormGroup;
  notes: any = []
  noteObj: Note = 
  {
    id: '',
    note_title: '',
    note_description: ''
  }
  constructor(private note_service: NoteService, private formBuilder: FormBuilder) {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editForm = this.formBuilder.group({
      edited_title: ['', Validators.required],
      edited_description: ['', Validators.required],
    });
  }
  ngOnInit(){
    this.getAllNotes()
  }

  addNote()
  {
    const {value} = this.noteForm
    console.log(value);
    
    this.noteObj.id = ''
    this.noteObj.note_title = value.title
    this.noteObj.note_description = value.description 

    this.note_service.addNote(this.noteObj).then((note) =>{
      if(note)
      {
        alert('Note added successfully')
        this.noteForm.reset()
      }
    })
  }

  getAllNotes()
  {
    this.note_service.getNotes().subscribe((res: Note[])=>{
      console.log(res);
      this.notes = res
    })
  }
  deleteNote(note: Note)
  {
    let decision = confirm('Are you really want to delete this note?')
    if(decision === true)
    {
      this.note_service.deleteNote(note)
    }
  }

  updateNote(note: Note)
  {
    const {value} = this.editForm
    console.log(value);
  }
}
