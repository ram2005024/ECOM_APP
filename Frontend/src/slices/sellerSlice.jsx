import { createSlice } from "@reduxjs/toolkit";
const sellerSlice = createSlice({
  name: "seller",
  initialState: { seller: null },
  reducers: {
    createSeller: (state, action) => {
      state.seller = action.payload;
    },
  },
});
export const { createSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
