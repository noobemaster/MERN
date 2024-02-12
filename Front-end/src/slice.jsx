import { createSlice } from "@reduxjs/toolkit";
const keja = createSlice({
  name: "keja",
  initialState: { Data: [], signal: 0 },
  reducers: {
    update: (state, { payload }) => {
      state.Data = payload;
    },
    signal: (state) => {
      state.signal++;
    },
  },
});
const users = createSlice({
  name: "user",
  initialState: localStorage.getItem("User")
    ? { user: JSON.parse(localStorage.getItem("User")) }
    : {},
  reducers: {
    login: (state, { payload }) => {
      state.user = { ...payload.user };
      localStorage.setItem("User", JSON.stringify(payload.user));
      localStorage.setItem("Token", payload.Token);
      localStorage.setItem("refreshToken", payload.Refresh);
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});
export const { login, logout } = users.actions;
export const { update, signal } = keja.actions;
export const user = users.reducer;
export const hao = keja.reducer;
