import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";

const sliceName = "auth";
const auth = JSON.parse(localStorage.getItem(sliceName));
const initialAuth = {
  user: "",
  token: "",
  expires_at: "",
};

const initialState = {
  ...(auth || initialAuth),
};

export const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(sliceName);
      return { ...state, ...initialAuth };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem(sliceName, JSON.stringify(payload));
        return { ...state, ...payload };
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem(sliceName, JSON.stringify(payload));
        return { ...state, ...payload };
      }
    );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
