"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotes = exports.updateNote = exports.getOneNote = exports.notesController = void 0;
const notes_service_1 = require("../services/notes.service");
//import service here
let noteService = new notes_service_1.notesAction;
class notesController {
    //creating notes
    createNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { title, content } = req.body;
            }
            catch (error) {
                return res.json({
                    error: error
                });
            }
        });
    }
}
exports.notesController = notesController;
//Fetching one note
function getOneNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { note_id } = req.params;
            let response = yield noteService.fetchOneNote(note_id);
            return res.status(201).json(response);
        }
        catch (error) {
            return res.json({
                error: error
            });
        }
    });
}
exports.getOneNote = getOneNote;
//Fetch all notes
let getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let notes = yield noteService.fetchNotes;
        return res.json(notes);
    }
    catch (error) {
        return res.json({
            error: error
        });
    }
});
exports.getAllNotes = getAllNotes;
function updateNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let note_id = req.params.note_id;
            let { title, content } = req.body;
            let note = {
                id: note_id,
                title,
                content
            };
            let response = yield noteService.updateNote(note_id, note);
            return res.json(response);
        }
        catch (error) {
            return res.json({
                error: error
            });
        }
    });
}
exports.updateNote = updateNote;
