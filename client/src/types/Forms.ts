export type TAddNoteForm = {
    title: string;
    body: string;
};

export type TUpdateNoteForm = TAddNoteForm & {
    _id: string;
};
