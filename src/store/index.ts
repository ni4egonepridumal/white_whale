import { configureStore } from "@reduxjs/toolkit";
import userRegistration from "./user/userRegistration.slice";
import userAuthorization, { JWT } from "./user/userAuthorization.slice";
import getAllMedia from "./media/getMediaFiles.slice";
import postMedia from "./media/postMediaFiles.slice";
import removeMedia from "./media/removeMediaFile.slice";
import logoutUser from "./user/userLogout.slice";
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    registration: userRegistration,
    authorization: userAuthorization,
    getAllMedia: getAllMedia,
    postMedia: postMedia,
    removeMedia: removeMedia,
    logoutUser: logoutUser,
  },
});
// синхронизация localStorage с store
store.subscribe(() => {
  saveState(store.getState().authorization.token, JWT);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
