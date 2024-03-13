import { configureStore } from "@reduxjs/toolkit";
import { hao, user } from "./slice";
export const store = configureStore({
  reducer: {
    houses: hao,
    user,
  },
});
