//import e from "express";
import multer from "multer";
import path from "path";
import { PORT } from "./main.js";
import fs from "fs";
//const app=e();
//const meth=e.Router();
const storage = multer.diskStorage({
  destination: "./upload/house_image",
  filename: (req, file, callback) => {
    return callback(
      null,
      `${req.user}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
export const upld = multer({ storage }); //multer({dest:"./upload/image"});//saves in binary
export function upload(req, res) {
  try {
    const houseurl = [];
    req.files.forEach((el) => {
      houseurl.push(`http://localhost:${PORT}/house-image/${el.filename}`);
    });
    res.send({ houseurl: houseurl });
  } catch (e) {
    console.log(e.message);
    res.status(404).send({ error: `${e.message}` });
  }
}
//app.use("/profile",e.static("upload/image"));
//meth.route("/upload").post(upld.single("file"),upload)
//app.use("/p",meth);
//app.listen(1500,()=>console.log("running"));
