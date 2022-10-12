import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const predictionsApi = createApi({
  reducerPath: "predictionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/predictions`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    updatePredictionGoals: builder.mutation({
      query: ({ predictionId, payload }) => ({
        url: `/${predictionId}`,
        method: "PATCH",
        body: payload,
      }),
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useUpdatePredictionGoalsMutation } = predictionsApi;
