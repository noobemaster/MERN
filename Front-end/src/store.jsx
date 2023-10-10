import { configureStore } from "@reduxjs/toolkit";
import { hao } from "./slice";
export const store = configureStore({
  reducer: {
    data: hao,
  },
});
