import Express from "express";
import jswt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import env from "dotenv";
import db from "mongoose";
import { users } from "./model.js";
await db.connect("mongodb://0.0.0.0:27017/saka-keja");
env.config();
Express().use(Express.json());
function token(asset) {
  return jswt.sign(asset, process.env.Access_token, { expiresIn: "30min" });
}
function refreshToken(mail) {
  return jswt.sign(mail, process.env.Refresh_Token, { expiresIn: "3d" });
}
export async function newUser(req, res) {
  try {
    const { email, password } = req.body.data;
    const hashed = await hash(password, 10);
    await users.create({ email, password: hashed });
    const user = await users.findOne({ email });
    const Token = token({ email });
    const Refresh = refreshToken({ email });
    res.send({ user, Token, Refresh });
  } catch (e) {
    res.send(e.message);
  }
}
export async function login(req, res) {
  try {
    const reg = req.body.data;
    let user = await users.findOne({ email: reg.email });
    if (!user) return res.status(404).send("no such user");
    if (await compare(reg.password, user.password)) {
      const Token = token(reg);
      const Refresh = refreshToken(reg);
      res.send({ user, Token, Refresh });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (err) {
    res.sendStatus(404);
  }
}
export function checkToken(req, res, next) {
  const auth = req.headers["authorization"].split(" ");
  const token1 = auth && auth[1];
  const refresh = auth && auth[2];
  if (!token1 || token1 == "null") return res.sendStatus(401);
  jswt.verify(token1, process.env.Access_token, (err, user) => {
    if (err && err.message === "jwt expired") {
      if (!refresh || refresh == "null") return res.sendStatus(401);
      jswt.verify(refresh, process.env.Refresh_Token, (err, user) => {
        if (err && err.message === "jwt expired") {
          return res.status(403).send("refreshToken expired");
        } else if (err) {
          return res.status(403).send(`${err.message}. Please Login!`);
        }
        const toke = token({ email: user.email });
        req.toke1 = toke;
        next();
      });
    } else {
      next();
    }
  });
}
