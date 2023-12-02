import { Table, Group, ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { NoteResponse } from "../types/Note.type";
import { useDeleteNoteMutation } from "../redux/service/notes/notesApiService";
import { ClientErrorHanlder } from "../helpers/errorHanlder";
import { toastSuccess } from "../helpers/toast";
import { modals } from "@mantine/modals";
import { useModalsContext } from "../context/ModalsContext";
type Props = {
    noteData: NoteResponse;
};
export default function TableRow({ noteData }: Props) {
    const [DeleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
    const { setModalNoteData, openEditModal } = useModalsContext();
    async function handleDeleteNoteBtnClick(id: string) {
        try {
            const data = await DeleteNote(id).unwrap();
            toastSuccess(`The note with title "${data.title}" is deleted`);
        } catch (error) {
            ClientErrorHanlder(error as Error);
        }
    }

    function handleEditBtnClick() {
        setModalNoteData(noteData);
        openEditModal();
    }
    return (
        <Table.Tr>
            <Table.Td w={70} maw={200}>
                <Text truncate>{noteData.title}</Text>
            </Table.Td>
            <Table.Td maw={700}>
                <Text truncate>{noteData.body}</Text>
            </Table.Td>
            <Table.Td w={150}>{moment(noteData.updatedAt).fromNow()}</Table.Td>
            <Table.Td w={120}>
                <Group justify="center" wrap="nowrap">
                    <ActionIcon onClick={handleEditBtnClick}>
                        <IconEdit color="white" />
                    </ActionIcon>
                    <ActionIcon
                        bg={"red"}
                        onClick={() => {
                            modals.openConfirmModal({
                                title: `Delete Note "${noteData.title}"`,
                                centered: true,
                                children: <Text size="sm">Are you sure you want to delete this Note? This action is destructive.</Text>,
                                labels: { confirm: "Delete Note", cancel: "No don't delete it" },
                                confirmProps: { color: "red" },
                                onCancel: () => console.log("Cancel"),
                                onConfirm: () => handleDeleteNoteBtnClick(noteData._id),
                            });
                        }}
                        loading={isDeleting}
                    >
                        <IconTrash />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    );
}
