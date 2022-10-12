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
      providesTags: ["Board"],
    }),
    getBoardActiveDetail: builder.query({
      query: (boardId) => `/${boardId}/matches/active`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useValidateBoardQuery, useGetBoardActiveDetailQuery } =
  boardsApi;
