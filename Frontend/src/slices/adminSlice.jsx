import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    section: "dashboard", //default section
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});
export const { setSection } = adminSlice.actions;
export default adminSlice.reducer;
