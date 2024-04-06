import exp from "express";
import { add, disp, upd, del } from "./hscontrol.js";
import {
  checkToken,
  newUser,
  login,
  update,
  deluser,
} from "./userscontrols.js";
const method = exp.Router();
method.route("/").get(disp);
method.route("/users/login").get(login);
method.route("/users/new").post(newUser);
method.use(checkToken);
method.route("/:key").put(upd);
method.route("/users/update").put(update);
method.route("/users/:key").delete(deluser);
method.route("/").delete(del).post(add);
export default method;
