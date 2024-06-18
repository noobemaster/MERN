import express from "express";
import meth from "./rout.js";
import cors from "cors";
export const PORT = 2000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/house", meth);
app.use("/house-image",express.static("upload/house_image"));
app.listen(PORT, () => {
  console.log('listening...');
});
