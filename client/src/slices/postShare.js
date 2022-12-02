import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
};

export const postShareSlice = createSlice({
  name: "postShare",
  initialState,
  reducers: {
    postShare: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { postShare } = postShareSlice.actions;
export default postShareSlice.reducer;
