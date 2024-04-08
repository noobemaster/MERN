import axios from "axios";
import { profile, signal, login, logout, update } from "./slice";
const baseURL = "https://mern-anro.onrender.com/house/";
//baseURL= "http://localhost:2000/house",
let port = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
export const fetch = (q) => async (dispatch) => {
  //fetches houses at first render and on every change and query
  if (q.page) {
    await port
      .get("/", { params: q })
      .then((res) => dispatch(update(res.data.house)))
      .catch((e) => console.log(e.response.data));
  } else {
    await port
      .get("/", {
        params: {
          "location.county": q.county,
          "location.sub_county": q.sub_county,
          price: q.price,
          type: q.type,
        },
      })
      .then((res) => dispatch(update(res.data.house)))
      .catch((e) => console.log(e.response.data));
  }
};

export const dbchange = (hao, mes, com, Uid, comment) => async (dispatch) => {
  port = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "Token"
      )} ${localStorage.getItem("refreshToken")}`,
      "Content-Type": "application/json",
    },
  });
  function Do(res) {
    res.data.newToken && localStorage.setItem("Token", res.data.newToken);
    res.data.newuser && dispatch(profile(res.data));
    dispatch(signal());
  }
  function errorHandling(e) {
    if (e.response.data == "refreshToken expired") {
      alert("Session expired. Please log-in");
      dispatch(logout());
    } else e.response.data ? console.log(e.response.data) : console.log(e);
  }
  switch (mes) {
    //manipulates house
    case "new":
      port
        .post("/", { ...hao })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    case "chhouse":
      alert("changes captured");
      port
        .put(`/${mes}`, { data: { value: hao, change: com } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    case "delete":
      port
        .delete("/", { data: { value: hao, user: com } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    //manipulates comments
    case "comments":
      port
        .put(`/${mes}`, { data: { value: hao, change: com, Uid } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    case "chcom":
      port
        .put(`/${mes}`, { data: { value: hao, change: com, comment: comment } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    case "delcom":
      port
        .put(`/${mes}`, { data: { value: hao, change: com } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;

    default:
      console.log(`${mes} method not found`);
      break;
  }
};
export const usercontroll = (details, act) => async (dispatch) => {
  port = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(
        "Token"
      )} ${localStorage.getItem("refreshToken")}`,
      "Content-Type": "application/json",
    },
  });
  switch (act) {
    case "sign-up":
      port
        .post("/users/new", { data: details })
        .then((res) => dispatch(login(res.data)))
        .catch((e) =>
          e.response.data ? alert(`${e.response.data}`) : console.log(e)
        );
      break;
    case "log-in":
      port
        .get("/users/login", { params: details })
        .then((res) => dispatch(login(res.data)))
        .catch((e) =>
          e.response.data ? alert(`${e.response.data}`) : console.log(e)
        );
      break;
    case "update":
      port
        .put(`/users/${act}`, { data: details })
        .then((res) => dispatch(profile(res.data)))
        .catch((e) =>
          e.response.data ? alert(`${e.response.data}`) : console.log(e)
        );
      break;
    case "delete":
      port
        .delete(`/users/${details}`)
        .then((res) => dispatch(logout()))
        .catch((e) =>
          e.response.data ? alert(`${e.response.data}`) : console.log(e)
        );
  }
};
/* REPLACED axios.post(`${baseurl}/users/login`,{headers: { "Content-Type": "application/json" },data: details,}) WITH port.post("/users/new", { data: details })*/
