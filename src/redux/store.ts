import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsReducer";
import uploadReducer from "./slices/uploadReducer";
import mockupReducer from "./slices/mockupReducer";

// ...
const store = configureStore({
  reducer: {
    posts: postsReducer,
    upload: uploadReducer,
    mockups: mockupReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
