import { createSlice } from "@reduxjs/toolkit";
import { fetchGetFiles } from "./media.actions";

const initialState = {
  allMedia: [],
  isLoaded: false,
  isError: null,
};

export const getAllMedia = createSlice({
  name: "getAllMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFiles.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchGetFiles.fulfilled, (state, action) => {
        // console.log("Данные которые пришли, после регистрации", action.payload);
        state.allMedia = action.payload.files;
        state.isLoaded = false;
      })
      .addCase(fetchGetFiles.rejected, (state, action) => {
        console.log(action.error);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export default getAllMedia.reducer;