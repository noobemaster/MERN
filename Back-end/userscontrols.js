import Express from "express";
import jswt from "jsonwebtoken";
import env from "dotenv";
import db from "mongoose";
import { hash, compare } from "bcrypt";
import { house, users } from "./model.js";
Express().use(Express.json());
env.config();
const Access_token = process.env.Access_token;
const Refresh_Token = process.env.Refresh_Token;
const db_url = process.env.Url;
await db.connect(db_url);
function token(asset) {
  return jswt.sign(asset, Access_token, { expiresIn: "30min" });
}
function refreshToken(mail) {
  return jswt.sign(mail, Refresh_Token, { expiresIn: "3d" });
}
let hashed;
let Token;
let Refresh;
export async function newUser(req, res) {
  try {
    const { email, password } = req.body.data;
    hashed = await hash(password, 10);
    await users.create({ email, password: hashed });
    const user = await users.findOne({ email });
    Token = token({ email });
    Refresh = refreshToken({ email });
    res.send({ user, Token, Refresh });
  } catch (e) {
    res.send({ mes: e.message });
  }
}
export async function login(req, res) {
  try {
    const reg = req.query;
    let user = await users.findOne({ email: reg?.email });
    if (!user) return res.status(404).send("no such user");
    if (await compare(reg.password, user.password)) {
      Token = token(reg);
      Refresh = refreshToken(reg);
      res.send({ user, Token, Refresh });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}
export function checkToken(req, res, next) {
  try {
    const auth = req.headers["authorization"]?.split(" ");
    Token = auth && auth[1];
    Refresh = auth && auth[2];
    if (!Token || Token == "null") return res.sendStatus(401);
    jswt.verify(Token, Access_token, (err, user) => {
      if (err && err.message === "jwt expired") {
        if (!Refresh || Refresh == "null") return res.sendStatus(401);
        jswt.verify(Refresh, Refresh_Token, (err, user) => {
          if (err?.message === "jwt expired") {
            return res.status(403).send("refreshToken expired");
          } else if (err) {
            return res.status(403).send(`${err.message}. Please Login!`);
          }
          Token = token({ email: user.email });
          req.toke1 = Token;
          next();
        });
      } else {
        next();
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ sucsess: false, mes: e });
  }
}
export async function update(req, res) {
  let newuser;
  try {
    const { id, password, ...user } = req.body.data;
    let User = await users.findOne({ _id: id });
    if (!User) return res.status(404).send("no such user");
    if (password) {
      if (await compare(password.old, User.password)) {
        hashed = await hash(password.new, 10);
        await users.updateOne(
          { _id: id },
          { $set: { password: hashed, ...user } }
        );
        newuser = await users.findOne({ _id: id });
        res.send({ newuser });
      } else {
        res.status(400).send("Wrong oldpassword");
      }
    } else {
      await users.updateOne({ _id: id }, { $set: { ...user } });
      newuser = await users.findOne({ _id: id });
      res.send({ newuser });
    }
  } catch (err) {
    res.sendStatus(404);
  }
}
export async function deluser(req, res) {
  const id = req.params.key;
  await house.deleteMany({ userId: id });
  await users.deleteOne({ _id: id });
  res.send({ mes: "sucsess" });
}
