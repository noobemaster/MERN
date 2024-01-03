import Express from "express";
import { users } from "./model.js";
import { hash, compare } from "bcrypt";
import jswt from "jsonwebtoken";
import env from "dotenv";
import db from "mongoose";
await db.connect("mongodb://0.0.0.0:27017/saka-keja");
env.config();
const app = Express();
app.use(Express.json());
export async function newUser(req, res) {
  try {
    const { email, password } = req.body.data;
    const hashed = await hash(password, 10);
    await users.create({ email, password: hashed });
    const user = await users.findOne({ email });
    const Token = token({ email });
    const Refresh = jswt.sign(email, process.env.Refresh_Token);
    res.send({ user, Token, Refresh });
  } catch (e) {
    console.log(e);
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
      const Refresh = jswt.sign(reg, process.env.Refresh_Token, {
        expiresIn: "72h",
      });
      res.send({ user, Token, Refresh });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}
export async function user(req, res) {
  const user = await users.find0ne();
  //let user = await users.findOne({ name: req.user });
  res.send({ data: user });
}
export function checkToken(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  const refresh = auth && auth.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jswt.verify(token, process.env.Access_token, (err, user) => {
    if (err) return res.status(403).send("session expired");
    req.user = user.name;
    next();
  });
}
app.post("/token", async (req, res) => {
  const { name, refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);
  jswt.verify(refreshToken, process.env.Refresh_Token, (err, user) => {
    if (err) return res.status(403).send("No refresh token. Please Login!");
    const toke = token({ name: user.name });
    res.send({ toke });
  });
});
app.delete("/token", async (req, res) => {
  const { Id } = req.body;
  await users.deleteOne({ Id: _id });
  res.sendStatus(204);
});
function token(asset) {
  return jswt.sign(asset, process.env.Access_token, { expiresIn: "25min" });
}
