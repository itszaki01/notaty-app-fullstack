import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrl = 'https://notaty-fullstack-a22730cb9363.herokuapp.com'
export const apiService = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: () => ({}),
});
