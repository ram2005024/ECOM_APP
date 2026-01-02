import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};
const product = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});
export default product.reducer;
export const { setProduct } = product.actions;
