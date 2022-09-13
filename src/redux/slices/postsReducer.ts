import { createSlice } from "@reduxjs/toolkit";
export interface Post {
  id: string;
  title: string;
  body: string;
}

const initialState: Post[] = [
  {
    id: "1111111",
    title: "post 1",
    body: "this is body of post 1",
  },
  {
    id: "2222222",
    title: "post 2",
    body: "this is body of post 2",
  },
];

// slice basically has state, actions, and reducers
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost(state, action) {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    deletePost(state, action) {
      const todos = state.filter((post) => post.id !== action.payload);
      return todos;
    },
  },
});

export const { createPost, deletePost } = postsSlice.actions; // action creators are generated for each case in reducer function

export default postsSlice.reducer;
