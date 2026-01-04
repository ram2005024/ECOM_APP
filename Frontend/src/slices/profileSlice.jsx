import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setShowProfileOff: (state) => {
      state.showProfile = false;
    },
    setShowProfileOn: (state) => {
      state.showProfile = true;
    },
    setShowProfile: (state) => {
      state.showProfile = !state.showProfile;
    },
  },
});
export default profileSlice.reducer;
export const { setShowProfileOff, setShowProfileOn, setShowProfile } =
  profileSlice.actions;
