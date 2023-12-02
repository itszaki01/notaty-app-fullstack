export type CreateNoteRequest = {
    title: string;
    body: string;
}

export type NoteResponse = CreateNoteRequest & {
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
};

export type UpdateNoteRequest = {
    _id:string
    title?: string;
    body?: string;
}

export type DeleteNoteRequest = {
    _id:string
}