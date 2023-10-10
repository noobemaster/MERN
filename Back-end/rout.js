import exp from "express";
import { add, disp, upd, del, comment } from "./control.js";
const method = exp.Router();
method.route("/").post(add).get(disp).delete(del);
method.route("/:key").put(upd);
export default method;
