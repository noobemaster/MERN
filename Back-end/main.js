import express from "express";
import meth from "./rout.js";
const PORT = 2000;
const app = express();
app.use(express.json());
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.use("/house", meth);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
