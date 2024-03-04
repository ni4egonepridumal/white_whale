// если logout в reducer не используешь нигде, то удали его
import { createSlice } from "@reduxjs/toolkit";
import { fetchAuthorization } from "./user.actions";
import { IAuthorization } from "./user.types";

export const JWT = "jwt";

const initialState: IAuthorization = {
  isLoaded: false,
  isError: null,
  token: null,
  status: "",
};

export const userAuthorization = createSlice({
  name: "userAuthorization",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorization.pending, (state) => {
        state.status = "";
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchAuthorization.fulfilled, (state, action) => {
        // console.log("Данные которые пришли, после регистрации", action.payload);
        state.token = action.payload?.token;
        localStorage.setItem("token", action.payload?.token);
        state.status = "success";
        state.isLoaded = false;
      })
      .addCase(fetchAuthorization.rejected, (state, action) => {
        console.log(action.error);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export const { logout } = userAuthorization.actions;
export default userAuthorization.reducer;
