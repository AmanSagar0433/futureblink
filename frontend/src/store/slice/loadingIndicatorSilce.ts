import { createSlice } from "@reduxjs/toolkit";

export const loadingIndicatorSlice = createSlice({
  initialState: false,
  name: "loadingIndicator",
  reducers: {
    setVissible: () => true,
    setInvissible: () => false,
  },
});

export const { setVissible, setInvissible } = loadingIndicatorSlice.actions;
export default loadingIndicatorSlice.reducer;
