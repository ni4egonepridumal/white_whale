import { createSlice } from "@reduxjs/toolkit";
import { fetchRemoveMedia } from "./media.actions";

const initialState = {
  isLoaded: false,
  isError: null,
};

export const removeMedia = createSlice({
  name: "removeMedia",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoveMedia.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchRemoveMedia.fulfilled, (state, action) => {
        console.log(
          "Данные которые пришли, после !!!УДАЛЕНИЯ!!! файла",
          action.payload
        );
        state.isLoaded = false;
      })
      .addCase(fetchRemoveMedia.rejected, (state, action) => {
        console.log(action.error);
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  },
});

export default removeMedia.reducer;
