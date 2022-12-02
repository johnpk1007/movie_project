import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AUTH: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
    },
    LOGOUT: (state) => {
      localStorage.clear();
      state.authData = null;
    },
  },
});

export const { AUTH, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
