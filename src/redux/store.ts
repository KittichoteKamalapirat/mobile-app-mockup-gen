import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer, { CurrentUser } from "./slices/authReducer";
import postsReducer, { Post } from "./slices/postsReducer";

// interface Profile {
//   name: string;
//   email: string;
// }

interface Schema {
  post: Post[];
}

interface RootState {
  firebase: FirebaseReducer.Reducer<{}, Schema>;
  posts: Post[];
  auth: CurrentUser;
  firestore: any;
}

const rootReducer = combineReducers<RootState>({
  posts: postsReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export default store;
