import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    currentUser: builder.mutation({
      query: () => "/current_user",
    }),
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

export const { useCurrentUserMutation, useLoginMutation } = authApi;
