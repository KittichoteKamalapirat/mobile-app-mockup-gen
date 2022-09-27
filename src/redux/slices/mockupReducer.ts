import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
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
      const userDocRef = doc(
        firestore as any,
        "users",
        auth.currentUser?.uid as string
      ); // TODO
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
    [createMockup.pending as any]: (state, action) => {
      // TODO
      console.log("pending state", state);
    },
    [createMockup.fulfilled as any]: (state, action) => {
      // TODO
      console.log("fulfileed state", state);
    },
    [createMockup.rejected as any]: (state, action) => {
      // TODO
      console.log("rejected state", state);
    },
  },
});

export const { updateMockups } = mockupSlice.actions;

export default mockupSlice.reducer;
