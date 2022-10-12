import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../api/auth";
import { boardsApi } from "../api/board";
import { groupsApi } from "../api/groups";
import { predictionsApi } from "../api/predictions";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      groupsApi.middleware,
      boardsApi.middleware,
      predictionsApi.middleware
    ),
});

setupListeners(store.dispatch);
