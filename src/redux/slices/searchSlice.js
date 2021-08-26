import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    subscribeSearchKeyword: (state, action) => {
      state = action.payload;
      return state;
    },
    unSubscribeSearchKeyword: (state, action) => {
      state = [];
      return state;
    },
  },
});

//destructuring of our actions
export const { subscribeSearchKeyword, unSubscribeSearchKeyword } =
  searchSlice.actions;

export const searchState = (state) => state.search;

//generate reducer and export
export default searchSlice.reducer;
