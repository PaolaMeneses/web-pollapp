import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
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
    register: builder.mutation({
      query: (payload) => ({
        url: "/",
        method: "post",
        body: payload,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useCurrentUserMutation, useLoginMutation, useRegisterMutation } =
  authApi;
