import { createSlice } from '@reduxjs/toolkit';
import { fetchRemoveMedia } from './media.actions';

const initialState = {
  isLoaded: false,
  isError: null
};

export const removeMedia = createSlice({
  name: 'removeMedia',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRemoveMedia.pending, (state) => {
        state.isLoaded = true;
        state.isError = null;
      })
      .addCase(fetchRemoveMedia.fulfilled, (state) => {
        state.isLoaded = false;
      })
      .addCase(fetchRemoveMedia.rejected, (state, action) => {
        state.isLoaded = false;
        // @ts-ignore
        state.isError = action.error.message;
      });
  }
});

export default removeMedia.reducer;
