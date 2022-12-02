import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
};

export const postUpdateSlice = createSlice({
  name: "postUpdate",
  initialState,
  reducers: {
    setCurrentId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setCurrentId } = postUpdateSlice.actions;
export default postUpdateSlice.reducer;
