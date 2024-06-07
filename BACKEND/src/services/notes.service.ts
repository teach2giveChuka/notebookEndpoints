import mssql from 'mssql';
import { v4 } from 'uuid';
import { note } from '../interfaces/notes.interface';
import { sqlConfig } from '../config/sql.config';
import Connection from '../db/db.helpers';

export class notesAction {
    //createnote
    async createNote(note: note) {
        // let pool = await mssql.connect(sqlConfig);
        let id = note.note_id;
        id = v4();
        let result = (await Connection.execute("createNote", { id: id, title: note.title, content: note.content, createdAT: new Date().getTime().toString() })).rowsAffected

        if (result[0] == 1) {
            return {
                message: "Note created succesfuly :)"
            }

        }
        else {
            return {
                error: "Error making note :("
            }
        }
    }

    //getOneNote
    async fetchOneNote(note_id: string) {
        let note = await (await Connection.query(`SELECT * FROM notes WHERE note_id = '${note_id}'`)).recordset

        if (!note[0].id) {
            return {
                error: "Notenot found"
            }
        } else {
            return {
                Note: note[0]
            }
        }
    }
    async fetchNotes() {

        let response = (await Connection.query('SELECT * FROM notes')).recordset
        return {
            Notes: response
        }
    }

    //allNotes
    async fetchAllNotes() {
        let pool = await mssql.connect(sqlConfig)

        let result = (await pool.request().execute("getAllNotes")).recordset

        if (result.length == 0) {
            return {
                message: "No notes Found"
            }
        } else {
            return {
                notes: result
            }
        }
    }

    async deleteNote(note_id: string) {
        let pool = await mssql.connect(sqlConfig)
        let response = (await pool.request().query(`SELECT * FROM notes WHERE note_id = '${note_id}'`)).recordset

        if (response.length < 1) {
            return {
                error: "Note not existing in Database"
            }
        } else {
            await pool.request().query(`DELETE FROM notes WHERE note_id = '${note_id}'`)
            return {
                message: "Note deleted successfully"
            }
        }

    }

    async updateNote(note_id: string, note: note) {
        let pool = await mssql.connect(sqlConfig)

        let noteExists = await (await pool.request().query(`SELECT * FROM notes WHERE id='${note_id}'`)).recordset

        let result = (await pool.request()
            .input("id", noteExists[0].id)
            .input("title", note.title)
            .input("Content", note.content)
        )

        //error handling to be added

    }


}



