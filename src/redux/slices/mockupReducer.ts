import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/client";

export interface Mockup {
  id: string;
  name: string;
  url: string;
}
const initialState: Mockup[] = [];

export const createMockup = createAsyncThunk(
  "mockups/createMockup",
  async (mockup: Mockup) => {
    try {
      const newMockup: Mockup = {
        id: uuidv4(),
        name: mockup.name,
        url: mockup.url,
      };
      const userDocRef = doc(firestore, "users", auth.currentUser?.uid);
      const mockupColRef = collection(userDocRef, "mockups");

      const docRef = await addDoc(mockupColRef, newMockup);

      console.log("docRef", docRef);
      return docRef;
    } catch (error) {
      console.log("error", error);
    }
  }
);
export const mockupSlice = createSlice({
  name: "mockups",
  initialState,
  reducers: {
    updateMockups: (state, action) => {
      return action.payload;
    },
    // payload = {url: url}
    // createMockup: (state, action) => {
    //   console.log("redux create mockup");
    //   state.push({
    //     url: action.payload,
    //   });
    // },
  },
  extraReducers: {
    [createMockup.pending]: (state, action) => {
      console.log("pending state", state);
    },
    [createMockup.fulfilled]: (state, action) => {
      console.log("fulfileed state", state);
    },
    [createMockup.rejected]: (sstate, action) => {
      console.log("rejected state", state);
    },
  },
});

export const { updateMockups } = mockupSlice.actions;

export default mockupSlice.reducer;
