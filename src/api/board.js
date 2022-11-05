import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const boardsApi = createApi({
  reducerPath: "boardApi",
  tagTypes: ["Board"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/boards`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    validateBoard: builder.query({
      query: (boardId) => `/${boardId}`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    getBoardActiveDetail: builder.query({
      query: (boardId) => `/${boardId}/matches/active`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    getBoardClosedDetail: builder.query({
      query: (boardId) => `/${boardId}/matches/closed`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    requestABoard: builder.mutation({
      query: (payload) => ({
        url: `/`,
        method: "POST",
        body: payload,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    activateBoard: builder.mutation({
      query: (boardId) => ({
        url: `/${boardId}/activate`,
        method: "POST",
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useValidateBoardQuery,
  useGetBoardActiveDetailQuery,
  useGetBoardClosedDetailQuery,
  useRequestABoardMutation,
  useActivateBoardMutation,
} = boardsApi;
