// есть логи, почекай их
import { createSlice } from "@reduxjs/toolkit";
import { fetchRegistration } from "./user.actions";
import { IRegistrationData } from "./user.types";

const initialState: IRegistrationData = {
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
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        console.log("Данные которые пришли, после регистрации", action.payload);
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
