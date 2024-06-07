"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("../controller/notes.controller");
exports.action = (0, express_1.default)();
//controller
exports.action.post('/create', notes_controller_1.notesController.createNotes);
exports.action.get('/allnotes');
exports.action.get('/:id');
exports.action.put('/update/:note_id');
exports.action.delete('/delete/:note_id');
