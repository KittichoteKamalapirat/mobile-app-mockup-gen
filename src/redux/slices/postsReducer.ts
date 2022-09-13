import { createSlice } from "@reduxjs/toolkit";
export interface Post {
  id: string;
  title: string;
  body: string;
}

const initialState: Post[] = [];

// slice basically has state, actions, and reducers
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost(state, action) {
      console.log("create post action");
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    deletePost(state, action) {
      const posts = state.filter((post) => post.id !== action.payload);
      return posts;
    },
  },
});

export const { createPost, deletePost } = postsSlice.actions; // action creators are generated for each case in reducer function

export default postsSlice.reducer;
