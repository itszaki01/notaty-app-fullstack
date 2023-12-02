import { useForm } from "react-hook-form";
import { TUpdateNoteForm } from "../types/Forms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useUpdateNoteMutation } from "../redux/service/notes/notesApiService";
import { toastSuccess } from "../helpers/toast";
import { ClientErrorHanlder } from "../helpers/errorHanlder";
import { useModalsContext } from "../context/ModalsContext";
const UpdateNoteFormSchema = yup.object().shape({
    title: yup.string().min(5).required("This fiels is required"),
    body: yup.string().min(15).required("This fiels is required"),
    _id: yup.string().required(),
});
export default function UpdateNoteForm() {
    const [UpdateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();
    const { closeEditModal, ModalNoteData } = useModalsContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TUpdateNoteForm>({
        mode: "all",
        defaultValues: {
            title: ModalNoteData.title,
            body: ModalNoteData.body,
            _id: ModalNoteData._id,
        },
        resolver: yupResolver(UpdateNoteFormSchema),
    });

    const onSubmit = async (data: TUpdateNoteForm) => {
        try {
            await UpdateNote(data).unwrap();
            toastSuccess("Note Updated Successfuly");
            closeEditModal();
        } catch (error) {
            ClientErrorHanlder(error as Error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput label="Note Title" error={errors?.title?.message} {...register("title")} placeholder="Title ..." />
                <Textarea
                    label="Note Content"
                    mih={150}
                    autosize
                    error={errors?.body?.message}
                    {...register("body")}
                    placeholder="Write somthing ..."
                />
                <Button type="submit" fullWidth loading={isUpdating}>
                    Update Note
                </Button>
            </Stack>
        </form>
    );
}
