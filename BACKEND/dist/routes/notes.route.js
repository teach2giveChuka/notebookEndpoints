"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = void 0;
const express_1 = __importDefault(require("express"));
exports.action = (0, express_1.default)();
//controller
exports.action.post('/create');
exports.action.get('/allnotes');
exports.action.get('/:id');
exports.action.put('.update/:id');
