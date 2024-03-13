import db from "mongoose";
import { house, users } from "./model.js";
await db.connect("mongodb://0.0.0.0:27017/saka-keja");
let get;
export async function add(req, res) {
  const {
    type,
    picture,
    price,
    location,
    contacts,
    occupied,
    description,
    userId,
  } = req.body;
  const page = Math.ceil((await house.count()) / 15);
  try {
    const post = await house.create({
      type,
      picture,
      price,
      description,
      location,
      contacts,
      comments: [],
      occupied,
      userId,
      page,
    });
    get = await users.findOneAndUpdate(
      { _id: userId },
      { $push: { houseIds: JSON.parse(JSON.stringify(post._id)) } },
      { returnDocument: "after" }
    );
    res.send({ succes: true, newuser: get, newToken: req.toke1 });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
}
export const disp = async (req, res) => {
  const p = req.query;
  get = Object.keys(p);
  for (const key of get) {
    if (p[key] == "undefined") {
      delete p[key];
    }
  }
  try {
    if (p) {
      get = await house.find({ ...p });
    } else {
      get = await house.find();
    }
    res.send({ success: true, house: get, message: "found" });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
};
export const upd = async (req, res) => {
  try {
    const { value, change, comment, Uid } = req.body.data;
    switch (req.params.key) {
      case "comments":
        get = await house.updateOne(
          { _id: value },
          { $push: { comments: { comment: change, UID: Uid } } }
        );
        break;
      case "chcom":
        get = await house.updateOne(
          { "comments._id": change },
          { $set: { "comments.$.comment": comment } }
        );
        break;
      case "delcom":
        get = await house.updateOne(
          { _id: value },
          { $pull: { comments: { _id: change } } }
        );
        break;
      case "chhouse":
        get = await house.updateOne({ _id: value }, { $set: { ...change } });
        break;
      default:
        throw new Error(` ${req.params.key} don't exist`);
    }

    res.send({
      succes: true,
      newToken: req.toke1,
    });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
};
export async function del(req, res) {
  const { value, user } = req.body;
  try {
    await house.deleteOne({ _id: value });
    await users.updateOne({ _id: user }, { $pull: { houseIds: value } });
    res.send({ succes: true, message: " deleted" });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
}
