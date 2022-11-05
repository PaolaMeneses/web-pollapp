import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/groups`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    groupList: builder.query({
      query: (code) => {
        return {
          url: "/search",
          params: { code },
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    allGroupList: builder.query({
      query: () => {
        return {
          url: "/",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    groupById: builder.query({
      query: (groupId) => `/${groupId}`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    getPositionsByGroup: builder.query({
      query: (groupId) => `/${groupId}/positions`,
      transformResponse: ({ data }) => {
        return data;
      },
    }),
    createGroup: builder.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/",
          body: payload,
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useGroupListQuery,
  useLazyGroupListQuery,
  useGroupByIdQuery,
  useAllGroupListQuery,
  useGetPositionsByGroupQuery,
  useCreateGroupMutation,
} = groupsApi;
