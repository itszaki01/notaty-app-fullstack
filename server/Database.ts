import mongoose, { Error } from "mongoose";
import { NoteObject, NoteSchema, UpdateNoteObject, UpdateNoteSchema } from "./types/Notes.type";
import { Note } from "./schemas/note";
import dotenv from "dotenv";
import errorHandler from "./helpers/errorHandler";
dotenv.config();
class Database {
    Url = `${process.env.MONGOO_DB}`;

    //Connect To DB
    async connect() {
        try {
            await mongoose.connect(this.Url);
            console.log("Database connected");
        } catch (error) {
            errorHandler(error as Error);
        }
    }

    // Create New Note
    async addNote(note: NoteObject) {
        const newNoteSchema: NoteSchema = {
            ...note,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        try {
            const newNote = new Note(newNoteSchema);
            const doc = await newNote.save();
            return doc;
        } catch (error) {
            errorHandler(error as Error);
        }
    }

    //GetAllNotes
    // 
    async getAllNotes(findObject:{title?:RegExp} = {}) {
        try {
            const data = await Note.find(findObject);
            return data;
        } catch (error) {
            errorHandler(error as Error);
        }
    }

    //GetNoteByID
    async getNoteByID(id: string) {
        try {
            const data = await Note.findById(id);
            return data;
        } catch (error) {
            errorHandler(error as Error);
        }
    }

    //UpdateNote
    async updateNote(updatedNote: UpdateNoteObject) {
        const newUpdatedNote: UpdateNoteSchema = {
            title: updatedNote.title,
            body: updatedNote.body,
            updatedAt: new Date(),
        };
        try {
            const data = await Note.findByIdAndUpdate(updatedNote._id, newUpdatedNote);
            return data;
        } catch (error) {
            errorHandler(error as Error);
        }
    }

    //UpdateNote
    async deleteNote(id: string) {
        try {
            const data = await Note.findByIdAndDelete(id);
            if (!data) throw new Error(`ObjectId failed`);
            return data;
        } catch (error) {
            errorHandler(error as Error);
        }
    }
}

export const db = new Database();
