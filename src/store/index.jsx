import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../api/auth";
import { boardsApi } from "../api/board";
import { groupsApi } from "../api/groups";
import { matchesApi } from "../api/matches";
import { predictionsApi } from "../api/predictions";
import { teamsApi } from "../api/teams";

import appSlice from "./app";
import authSlice from "./auth";

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [predictionsApi.reducerPath]: predictionsApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      groupsApi.middleware,
      boardsApi.middleware,
      predictionsApi.middleware,
      matchesApi.middleware,
      teamsApi.middleware
    ),
});

setupListeners(store.dispatch);
