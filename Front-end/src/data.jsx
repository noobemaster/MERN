import axios from "axios";
import { signal, login, logout } from "./slice";
const port = axios.create({
  baseURL: "http://localhost:2000/house",
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "Token"
    )} ${localStorage.getItem("refreshToken")}`,
    "Content-Type": "application/json",
  },
});
export async function fetch() {
  //fetches houses at first render and on every change
  let Data;
  await port
    .get("/")
    .then((res) => (Data = res.data.house))
    .catch((e) => console.log(e.response.data));

  return Data;
}
export const dbchange = (hao, mes, com, Uid, comment) => async (dispatch) => {
  function Do(res) {
    res.data.newToken && localStorage.setItem("Token", res.data.newToken);
    dispatch(signal());
  }
  function errorHandling(e) {
    console.log(e);
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
      port
        .put(`/${mes}`, { data: { value: hao, change: com } })
        .then((res) => Do(res))
        .catch((e) => errorHandling(e));
      break;
    case "delete":
      port
        .delete("/", { data: { value: hao } })
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
        .post("/users/login", { data: details })
        .then((res) => dispatch(login(res.data)))
        .catch((e) =>
          e.response.data ? alert(`${e.response.data}`) : console.log(e)
        );
      break;
  }
};
/* REPLACED axios.post(`${baseurl}/users/login`,{headers: { "Content-Type": "application/json" },data: details,}) WITH port.post("/users/new", { data: details })*/
