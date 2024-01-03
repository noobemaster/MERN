import db from "mongoose";
import house from "./model.js";
await db.connect("mongodb://0.0.0.0:27017/saka-keja");
let get;
export async function add(req, res) {
  const { type, picture, price, location, contacts, occupied, description } =
    req.body;
  try {
    const post = await house.create({
      type: type,
      picture: picture,
      price: price,
      description: description,
      location: location,
      contacts: contacts,
      comments: [],
      occupied: occupied,
    });
    post.save();
    res.send({ succes: true, message: `added ${post.type}` });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
}
export const disp = async (req, res) => {
  try {
    get = await house.find();

    res.send({ success: true, house: get, message: "found" });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
};
export const upd = async (req, res) => {
  try {
    const { value, change, comment } = req.body.data;
    switch (req.params.key) {
      case "comments":
        get = await house.updateOne(
          { _id: value },
          { $push: { comments: { comment: change } } }
        );
        break;
      case "delcom":
        get = await house.updateOne(
          { _id: value },
          { $pull: { comments: { _id: change } } }
        );
        break;
      case "chcom":
        get = await house.updateOne(
          { "comments._id": change },
          { $set: { "comments.$.comment": comment } }
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
      // message: `Found ${get.matchedCount} changed: ${get.modifiedCount}`,
    });
  } catch (e) {
    res.status(404).send({ succes: false, message: e.message });
  }
};
export const del = async (req, res) => {
  const { value } = req.body;
  try {
    get = await house.deleteOne({ _id: value });
    res.send({ succes: true, message: { deleted: get.deletedCount } });
  } catch (e) {
    res.send({ succes: false, message: e.message });
  }
};
