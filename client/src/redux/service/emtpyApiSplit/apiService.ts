import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = 'http://localhost:8080'
export const apiService = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: () => ({}),
});
