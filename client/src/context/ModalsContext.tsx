import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { createContext, useContext, useState } from "react";
import { NoteResponse } from "../types/Note.type";
import AddNoteForm from "../components/AddNoteForm";
import UpdateNoteForm from "../components/UpdateNoteForm";
type ModalsContextType = {
    openAddModal: () => void;
    closeAddModal: () => void;
    openEditModal: () => void;
    closeEditModal: () => void;
    ModalNoteData: NoteResponse;
    setModalNoteData: React.Dispatch<React.SetStateAction<NoteResponse>>;
};
const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType);
export default function ModalsContextProvider({ children }: { children: React.ReactNode }) {
    const [addModalOpened, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
    const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
    const [ModalNoteData, setModalNoteData] = useState<NoteResponse>({} as NoteResponse);
    
    return (
        <ModalsContext.Provider value={{ openAddModal, closeAddModal, openEditModal, closeEditModal, ModalNoteData, setModalNoteData }}>
            <Modal opened={addModalOpened} onClose={closeAddModal} title="Create New Note">
                <AddNoteForm/>
            </Modal>


            <Modal opened={editModalOpened} onClose={closeEditModal} title="Authentication">
                <UpdateNoteForm/>
            </Modal>

            {children}
        </ModalsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalsContext = () => useContext(ModalsContext);
