import { createSlice } from "@reduxjs/toolkit";

export interface Mockup {
  url: string;
}
const initialState: Mockup[] = [];

export const mockupSlice = createSlice({
  name: "mockups",
  initialState,
  reducers: {
    mockups: (state) => {
      return state;
    },
    // payload = {url: url}
    createMockup: (state, action) => {
      state.push({
        url: action.payload,
      });
    },
  },
});

export const { mockups, createMockup } = mockupSlice.actions;

export default mockupSlice.reducer;
