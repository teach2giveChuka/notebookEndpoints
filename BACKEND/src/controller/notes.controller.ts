import { Request, Response } from "express";
import { notesAction } from "../services/notes.service";
//import service here
let noteService = new notesAction

export class notesController {
    //creating notes
    async createNotes(req: Request, res: Response) {
        try {
            let { title, content } = req.body
        }
        catch (error) {
            return res.json({
                error: error
            })
        }
    }
}

//Fetching one note

export async function getOneNote(req: Request, res: Response) {
    try {
        let { note_id } = req.params

        let response = await noteService.fetchOneNote(note_id)

        return res.status(201).json(response)
    }
    catch (error) {
        return res.json({
            error: error
        })
    }
}

//Fetch all notes
let getAllNotes = async (req: Request, res: Response) => {
    try {
        let notes = await noteService.fetchNotes

        return res.json(
            notes
        )
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export async function updateNote(req: Request, res: Response) {
    try {
        let note_id = req.params.note_id

        let { title, content } = req.body

        let note = {
            id: note_id,
            title,
            content
        }

        let response = await noteService.updateNote(note_id, note);

        return res.json(response)


    } catch (error) {
        return res.json({
            error: error
        })
    }
}
export {
    getAllNotes
}


