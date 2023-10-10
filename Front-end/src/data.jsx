import axios from "axios";

export const port = axios.create({
  baseURL: "http://localhost:2000/house",
  headers: {
    "Content-Type": "application/json",
  },
});
let Data;
await port
  .get("/")
  .then((res) => (Data = res.data))
  .catch((e) => console.log(e.response.data));
console.log("fetched");
export default Data;
