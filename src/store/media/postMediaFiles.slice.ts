import { createSlice } from "@reduxjs/toolkit";
import { fetchPostFiles } from "./media.actions";

const initialState = {
  files: null,
  isLoaded: false,
  isError: null,
};

export const postMedia = createSlice({
  name: "postMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostFiles.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchPostFiles.fulfilled, (state, action) => {
        console.log(
          "Данные которые пришли, после отправки файла",
          action.payload
        );
        state.files = action.payload;
        state.isLoaded = false;
      })
      .addCase(fetchPostFiles.rejected, (state, action) => {
        console.log(action.error);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export default postMedia.reducer;
