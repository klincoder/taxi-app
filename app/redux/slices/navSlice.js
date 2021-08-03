// Import resources
import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

// Create nav slice
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

// Defien action creators for each case reducer function
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

// Define selectors for each action
// Selectors are used to select the current state
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

// Export nav slice as default
export default navSlice.reducer;
