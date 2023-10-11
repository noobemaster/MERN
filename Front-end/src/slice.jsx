import { createSlice } from "@reduxjs/toolkit";
import Data, { port } from "./data";
export const dbchange = (hao, mes, com, comment) => async (dispatch) => {
  switch (mes) {
    case "new":
      await port
        .post("/", hao)
        .then((res) => console.log(res.data.success))
        .catch((e) => console.log(e.response.data));
      console.log(listen);
      break;
    case "delete":
      await port
        .delete("/", { data: { value: hao } })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;
    case "delcom":
      await port
        .put("/delcom", { value: hao, change: com })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e.response.data));
      break;
    case "comments":
      await port
        .put("/comments", { value: hao, change: com })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;
    case "chcom":
      await port
        .put("/chcom", { value: hao, change: com, comment: comment })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;
    case "chhouse":
      await port
        .put("/chhouse", { value: hao, change: com })
        .then((res) => console.log(res.data.succes))
        .catch((e) => console.log(e.response.data));
      break;

    default:
      console.log(`${mes} method not found`);
      break;
  }
  /*
    //let h = await port.get("/");*/

  // console.log(hao, mes);
  //dispatch(add(h.data));
};

export const keja = createSlice({
  name: "keja",
  initialState: Data,
  reducers: {
    add: (state, { payload }) => {
      state = payload;
    },
    refresh: (state) => {
      state = listen.data;
    },
  },
});
export const hao = keja.reducer;
export const { refresh } = keja.actions;
