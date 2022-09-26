import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerText: "",
  showMenu: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppConfig(state, action) {
      // console.log(state, action);
      return { ...state, ...action.payload };
    },
  },
});

export const { setAppConfig } = appSlice.actions;

export default appSlice.reducer;
