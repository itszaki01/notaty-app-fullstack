import { useForm } from "react-hook-form";
import { TAddNoteForm } from "../types/Forms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import { useCreateNoteMutation } from "../redux/service/notes/notesApiService";
import "./AddNoteForm.css";
import { toastSuccess } from "../helpers/toast";
import { ClientErrorHanlder } from "../helpers/errorHanlder";
import { useModalsContext } from "../context/ModalsContext";
const AddNoteFormSchema = yup.object().shape({
    title: yup.string().min(5).required("This fiels is required"),
    body: yup.string().min(15).required("This fiels is required"),
});
export default function AddNoteForm() {
    const [CreateNote, { isLoading: isCreating }] = useCreateNoteMutation();
    const {closeAddModal} = useModalsContext()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAddNoteForm>({
        mode: "all",
        resolver: yupResolver(AddNoteFormSchema),
    });

    const onSubmit = async (data: TAddNoteForm) => {
        try {
            CreateNote(data).unwrap();
            toastSuccess("Note Created Successfuly");
            closeAddModal()
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
                <Button type="submit" fullWidth loading={isCreating}>Create Note</Button>
            </Stack>
        </form>
    );
}
