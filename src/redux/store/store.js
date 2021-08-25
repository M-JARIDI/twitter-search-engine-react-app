import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../reducers/rootReducer";

export default configureStore({
  reducer: RootReducer,
});