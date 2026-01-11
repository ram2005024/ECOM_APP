import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
  showProfileProtected: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setShowProfile: (state, action) => {
      state.showProfile =
        action.payload !== undefined ? action.payload : !state.showProfile;
    },
    setShowProfileProtected: (state, action) => {
      state.showProfileProtected =
        action.payload !== undefined
          ? action.payload
          : !state.showProfileProtected;
    },
  },
});
export default profileSlice.reducer;
export const { setShowProfile, setShowProfileProtected } = profileSlice.actions;
