import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.isAuthenticated = true), (state.user = action.payload);
    },
    logout: (state) => {
      (state.isAuthenticated = false), (state.user = null);
    },
  },
});
export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
