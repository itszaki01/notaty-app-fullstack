import { Request } from "express";
export type NoteObject = {
    title: string;
    body: string;
};

export type UpdateNoteObject = {
    _id:string,
    title?: string;
    body?: string;
};

export type NoteSchema = NoteObject & {
    createdAt: Date;
    updatedAt: Date;
};

export type UpdateNoteSchema = Omit<UpdateNoteObject, '_id'> & {
    updatedAt: Date;
};

export type NotesPostRequest = Request<{}, {}, NoteObject>;
export type NotesPutRequest = Request<{}, {}, UpdateNoteObject>;
