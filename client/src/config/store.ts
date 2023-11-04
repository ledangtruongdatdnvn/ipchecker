import { configureStore } from "@reduxjs/toolkit";
import DarkModeReducer from "../slice/darkModeSlice";
import DialogMessageReducer from "../slice/dialogMessageSlice";
import loginReducer from "../slice/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    darkMode: DarkModeReducer,
    dialogMessage: DialogMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
