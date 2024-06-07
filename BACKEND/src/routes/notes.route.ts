import Router from 'express';
import {notesController, getOneNote, getAllNotes, updateNote }  from '../controller/notes.controller'

export const action = Router();

//controller
action.post('/create', notesController.createNotes);
action.get('/allnotes', );
action.get('/:id',);
action.put('/update/:note_id');
action.delete('/delete/:note_id')



