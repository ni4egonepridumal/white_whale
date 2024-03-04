import { createSlice } from "@reduxjs/toolkit";
import { fetchLogout } from "./user.actions";

export const JWT = "jwt";

const initialState = {
  isLoaded: false,
  isError: null,
  status: "",
};

export const logoutUser = createSlice({
  name: "logoutUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isLoaded = false;
        state.status = "success";
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        console.log(action.error);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export default logoutUser.reducer;
