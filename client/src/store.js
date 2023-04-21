import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/postsSlice";
import postUpdateReducer from "./slices/postUpdateSlice";
import authReducer from "./slices/authSlice";
import postShareReducer from "./slices/postShare";
import postPageReducer from "./slices/postPage";
import loginReducer from "./slices/loginSlice";
import commentsReducer from "./slices/commentsSlice";
import accessTokenReducer from "./slices/accessTokenSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    postUpdate: postUpdateReducer,
    auth: authReducer,
    postShare: postShareReducer,
    postPage: postPageReducer,
    login: loginReducer,
    comments: commentsReducer,
    accessToken: accessTokenReducer,
  },
  devTools: {
    actionSanitizer: (action) =>
      action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
        ? { ...action, data: "<<LONG_BLOB>>" }
        : action,
    stateSanitizer: (state) =>
      state.data ? { ...state, data: "<<LONG_BLOB>>" } : state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
