import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Data from "./data";
const baseurl = "http://localhost:2000/house";
export const dbchange = (hao, mes, com, comment) => async (dispatch) => {
  switch (mes) {
    case "new":
      axios
        .post(`${baseurl}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: hao,
        })
        .then((res) => console.log(res.data.success))
        .catch((e) => console.log(e.response.data));

      break;
    case "delete":
      axios
        .delete(`${baseurl}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { value: hao },
        })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;
    case "delcom":
      axios
        .put(`${baseurl}/delcom`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { value: hao, change: com },
        })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e.response.data));
      break;
    case "comments":
      axios
        .put(`${baseurl}/comments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { value: hao, change: com },
        })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;
    case "chcom":
      axios
        .put(`${baseurl}/chcom`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { value: hao, change: com, comment: comment },
        })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e.response.data));
      break;
    case "chhouse":
      axios
        .put(`${baseurl}/chhouse`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { value: hao, change: com },
        })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;

    default:
      console.log(`${mes} method not found`);
      break;
  }
};
export const usercontroll = (details, act, token) => async (dispatch) => {
  switch (act) {
    case "sign-in":
      axios
        .post(`${baseurl}/users`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: details,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("Token", res.data.Token);
          localStorage.setItem("refreshToken", res.data.Refresh);
        })
        .catch((e) => alert(`${e.response.data}`));
      break;
    case "log-in":
      axios
        .post(`${baseurl}/users/login`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: details,
        })
        .then(async (res) => {
          await localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("Token", res.data.Token);
          localStorage.setItem("refreshToken", res.data.Refresh);
        })
        .catch((e) => alert(`${e.response.data}`));
      break;
  }
};

export const keja = createSlice({
  name: "keja",
  initialState: Data,
  reducers: {},
});
export const users = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    login: (state, { payload }) => {
      state.push(payload);
      //localStorage.removeItem("user");
    },
    logout: (state) => {
      state.pop();
    },
  },
});
export const { login, logout } = users.actions;
export const user = users.reducer;
export const hao = keja.reducer;
