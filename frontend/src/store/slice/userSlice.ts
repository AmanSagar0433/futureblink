import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  initialState: false,
  name: "isUserLoggedIn",
  reducers: {
    loginUser: () => true,
    logoutUser: () => false,
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
