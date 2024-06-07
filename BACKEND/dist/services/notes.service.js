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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesAction = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_config_1 = require("../config/sql.config");
const db_helpers_1 = __importDefault(require("../db/db.helpers"));
class notesAction {
    //createnote
    createNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            // let pool = await mssql.connect(sqlConfig);
            let id = note.note_id;
            id = (0, uuid_1.v4)();
            let result = (yield db_helpers_1.default.execute("createNote", { id: id, title: note.title, content: note.content, createdAT: new Date().getTime().toString() })).rowsAffected;
            if (result[0] == 1) {
                return {
                    message: "Note created succesfuly :)"
                };
            }
            else {
                return {
                    error: "Error making note :("
                };
            }
        });
    }
    //getOneNote
    fetchOneNote(note_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let note = yield (yield db_helpers_1.default.query(`SELECT * FROM notes WHERE note_id = '${note_id}'`)).recordset;
            if (!note[0].id) {
                return {
                    error: "Notenot found"
                };
            }
            else {
                return {
                    Note: note[0]
                };
            }
        });
    }
    fetchNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = (yield db_helpers_1.default.query('SELECT * FROM notes')).recordset;
            return {
                Notes: response
            };
        });
    }
    //allNotes
    fetchAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let result = (yield pool.request().execute("getAllNotes")).recordset;
            if (result.length == 0) {
                return {
                    message: "No notes Found"
                };
            }
            else {
                return {
                    notes: result
                };
            }
        });
    }
    deleteNote(note_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let response = (yield pool.request().query(`SELECT * FROM notes WHERE note_id = '${note_id}'`)).recordset;
            if (response.length < 1) {
                return {
                    error: "Note not existing in Database"
                };
            }
            else {
                yield pool.request().query(`DELETE FROM notes WHERE note_id = '${note_id}'`);
                return {
                    message: "Note deleted successfully"
                };
            }
        });
    }
    updateNote(note_id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            let pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            let noteExists = yield (yield pool.request().query(`SELECT * FROM notes WHERE id='${note_id}'`)).recordset;
            let result = (yield pool.request()
                .input("id", noteExists[0].id)
                .input("title", note.title)
                .input("Content", note.content));
            //error handling to be added
        });
    }
}
exports.notesAction = notesAction;
