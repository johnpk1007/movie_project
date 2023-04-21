import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};

export const accessTokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
