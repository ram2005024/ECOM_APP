import { createSlice } from "@reduxjs/toolkit";
const sellerSlice = createSlice({
  name: "seller",
  initialState: { seller: null, section: "dashboard" },
  reducers: {
    createSeller: (state, action) => {
      state.seller = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});
export const { createSeller, setSection } = sellerSlice.actions;
export default sellerSlice.reducer;
