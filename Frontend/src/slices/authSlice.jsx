import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  subscription: null,
  isAuthenticated: false,
  loading: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    setSubscription: (state, action) => {
      state.subscription = action.payload;
    },
    authFinished: (state) => {
      state.loading = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export default authSlice.reducer;
export const {
  login,
  logout,
  authFinished,
  setAuthenticated,
  setSubscription,
} = authSlice.actions;
