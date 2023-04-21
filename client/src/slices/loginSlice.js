import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: JSON.parse(localStorage.getItem("profile")) ? true : false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
