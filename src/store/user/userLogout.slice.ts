// если logout в reducer не используешь нигде, то удали его
// добавь типизацию
import { createSlice } from "@reduxjs/toolkit";
import { fetchLogout } from "./user.actions";
import { loadState, saveState } from "../storage";

export const JWT = "jwt";

const initialState = {
  isLoaded: false,
  isError: null,
  //   token: loadState(JWT) ?? null,
  status: "",
};

export const logoutUser = createSlice({
  name: "logoutUser",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.token = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        // console.log(
        //   "Данные которые пришли, после выхода из профиля",
        //   action.payload
        // );
        // localStorage.removeItem("token");
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

export const { logout } = logoutUser.actions;
export default logoutUser.reducer;
