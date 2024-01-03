import express from "express";
import meth from "./rout.js";
import cors from "cors";
const PORT = 2000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/house", meth);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
