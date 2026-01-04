import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setShowProfile: (state) => {
      state.showProfile = !state.showProfile;
    },
  },
});
export default profileSlice.reducer;
export const { setShowProfile } = profileSlice.actions;
