import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (auth) => ({
        url: "/login",
        method: "post",
        body: auth,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
