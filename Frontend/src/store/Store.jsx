import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import sellerReducer from "../slices/sellerSlice.jsx";
import adminReducer from "../slices/adminSlice.jsx";
export const store = configureStore({
  reducer: { auth: authReducer, seller: sellerReducer, admin: adminReducer },
});
