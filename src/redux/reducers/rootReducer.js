import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "../slices/searchSlice";
import userReducer from "../slices/userSlice";

export default combineReducers({
  search: searchReducer,
  user: userReducer,
});
