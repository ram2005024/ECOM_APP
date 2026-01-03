import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import sellerReducer from "../slices/sellerSlice.jsx";
import adminReducer from "../slices/adminSlice.jsx";
import productReducer from "../slices/productSlice.jsx";
import cartReducer from "../slices/cartSlice.jsx";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer,
    admin: adminReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
