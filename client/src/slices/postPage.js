import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: null,
};

export const postPageSlice = createSlice({
  name: "postPage",
  initialState,
  reducers: {
    setPostPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPostPage } = postPageSlice.actions;
export default postPageSlice.reducer;
