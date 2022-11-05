import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const matchesApi = createApi({
  reducerPath: "matchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/matches`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActiveMatches: builder.query({
      query: () => `/`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    getMatchById: builder.query({
      query: (matchId) => `/${matchId}`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    getMatchPredictionsById: builder.query({
      query: ({ matchId, group_id }) =>
        `/${matchId}/group/${group_id}/predictions`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetActiveMatchesQuery,
  useGetMatchByIdQuery,
  useGetMatchPredictionsByIdQuery,
} = matchesApi;
