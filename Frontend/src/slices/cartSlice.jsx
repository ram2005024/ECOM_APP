import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItemCount: 0,
};
const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {
    increaseCartItem: (state) => {
      state.cartItemCount = state.cartItemCount + 1;
    },
    decreaseCartItem: (state) => {
      state.cartItemCount = state.cartItemCount - 1;
    },
  },
});
export default cartSlice.reducer;
export const { increaseCartItem, decreaseCartItem } = cartSlice.actions;
