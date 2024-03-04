// есть логи, почекай их
import { createSlice } from "@reduxjs/toolkit";
import { fetchRegistration } from "./user.actions";

const initialState = {
  isError: null,
  isLoaded: false,
};

export const userRegistration = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchRegistration.fulfilled, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.payload;
      });
  },
});

export default userRegistration.reducer;
