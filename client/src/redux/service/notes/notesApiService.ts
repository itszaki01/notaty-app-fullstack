import axios from "axios";
import { ErrorResponse } from "../../../types/ErrorResponse.type";
import { NoteResponse } from "../../../types/Note.type";
import { apiService, baseUrl } from "../emtpyApiSplit/apiService";
import { QueryErrorHandler } from "../../../helpers/errorHanlder";
import { TAddNoteForm, TUpdateNoteForm } from "../../../types/Forms";

const apiServiceWithEndPoints = apiService.enhanceEndpoints({
    addTagTypes: ["Note", "Notes"],
});

export const notesApiService = apiServiceWithEndPoints.injectEndpoints({
    endpoints: (builder) => ({
        //1: GetAllNotes
        GetAllNotes: builder.query<NoteResponse[], {title?:string}>({
            queryFn: async ({title}) => {
                try {
                   if(title){
                    const { data } = await axios.get<NoteResponse[]>(`${baseUrl}/notes?title=${title}`);
                    return { data };
                   }else{
                    const { data } = await axios.get<NoteResponse[]>(`${baseUrl}/notes`);
                    return { data };
                   }
                } catch (error) {
                    throw QueryErrorHandler(error as ErrorResponse);
                }
            },
            providesTags: ["Note", "Notes"],
        }),
        //2:CreateNote
        CreateNote: builder.mutation<string,TAddNoteForm>({
            queryFn: async (noteData) => {
                try {
                    await axios.post(`${baseUrl}/notes`,noteData)
                    return { data: "ok" };
                } catch (error) {
                    throw QueryErrorHandler(error as ErrorResponse);
                }
            },
            invalidatesTags:['Notes']
        }),
        //3:UpdateNote
        UpdateNote: builder.mutation<string,TUpdateNoteForm>({
            queryFn:async (noteDate)=>{
                try{
                    await axios.put(`${baseUrl}/notes`,noteDate)
                    return { data: 'ok' }
                }catch(error){
                    throw QueryErrorHandler(error as ErrorResponse);
                }
            },
            invalidatesTags:['Notes']
        }),
        //4:DeleteNote
        DeleteNote: builder.mutation<NoteResponse, string>({
            queryFn: async (id) => {
                try {
                    const { data } = await axios.delete<NoteResponse>(`${baseUrl}/notes/${id}`);
                    return { data };
                } catch (error) {
                    return QueryErrorHandler(error as ErrorResponse);
                }
            },
            invalidatesTags: ["Notes"],
        }),
    }),
});

export const { useGetAllNotesQuery, useCreateNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApiService;
