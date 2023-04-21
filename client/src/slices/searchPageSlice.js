import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchPage: null,
};

export const searchPageSlice = createSlice({
  name: "searchPage",
  initialState,
  reducers: {
    setSearchPage: (state, action) => {
      state.searchPage = action.payload;
    },
  },
});

export const { setSearchPage } = searchPageSlice.actions;
export default searchPageSlice.reducer;
