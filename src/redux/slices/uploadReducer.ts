import { createSlice } from "@reduxjs/toolkit";
import { UploadedFile } from "../../components/DropzoneField";

const initialState: UploadedFile = {
  name: "",
  key: "",
  presignedUrl: "",
  uploadedAt: new Date(),
};
// slice basically has state, actions, and reducers
export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    createUpload(state, action) {
      console.log(action.payload);

      return action.payload;
    },
    deleteUpload(state, action) {
      return initialState;
    },
  },
});

export const { createUpload, deleteUpload } = uploadSlice.actions; // action creators are generated for each case in reducer function

export default uploadSlice.reducer;
