import mongoose from "mongoose";
import { NoteSchema } from "../types/Notes.type";

const noteSchema = new mongoose.Schema<NoteSchema>({
    title: { type: "String", required: true },
    body: { type: "string", required: true },
    createdAt: { type: "Date", required: true },
    updatedAt: { type: "Date", required: true },
});

export const Note = mongoose.model("Note", noteSchema);
