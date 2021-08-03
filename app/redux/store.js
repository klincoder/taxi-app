// Import resources
import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

// Create store
export const store = configureStore({
  // Add slices to store reducer
  reducer: {
    nav: navReducer,
  },
});
