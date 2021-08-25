import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    subscribeSearchQuery: (state, action) => {
      state = action.payload;
      return state;
    },
    unSubscribeSearchQuery: (state, action) => {
      state = "";
      return state;
    },
  },
});

//destructuring of our actions
export const { subscribeSearchQuery, unSubscribeSearchQuery } =
  searchSlice.actions;

export const searchState = (state) => state.search;

//generate reducer and export
export default searchSlice.reducer;
