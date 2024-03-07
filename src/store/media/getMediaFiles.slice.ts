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
        state.allMedia = action.payload.files;
        state.isLoaded = false;
      })
      .addCase(fetchGetFiles.rejected, (state, action) => {
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export default getAllMedia.reducer;
