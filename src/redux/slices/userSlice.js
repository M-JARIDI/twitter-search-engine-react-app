import { createSlice } from "@reduxjs/toolkit";

export const temperatureSlice = createSlice({
  name: "temperature",
  initialState: 0,
  reducers: {
    subscribeTemperature: (state, action) => {
      state = action.payload;
      return state;
    },
    unsubscribeTemperature: (state) => (state = 0),
  },
});

//destructuring of our actions
export const { subscribeTemperature, unsubscribeTemperature } =
  temperatureSlice.actions;

export const temperatureState = (state) => state.temperature;

//generate reducer and export
export default temperatureSlice.reducer;
