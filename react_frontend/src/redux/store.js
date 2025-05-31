import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // ✅ make sure this file also exists

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
