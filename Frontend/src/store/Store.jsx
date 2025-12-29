import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import sellerReducer from "../slices/sellerSlice.jsx";
export const store = configureStore({
  reducer: { auth: authReducer, seller: sellerReducer },
});
