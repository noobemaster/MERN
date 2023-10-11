import db from "mongoose";
import house from "./model.js";
await db.connect("mongodb://0.0.0.0:27017/saka-keja");
let get;
export async function add(req, res) {
  const { type, picture, price, location, contacts, occupied, description } =
    req.body;
  console.log(type);
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
    res.send({ succes: true, data: `added ${post.type}` });
  } catch (e) {
    res.send({ succes: false, msg: e.message });
  }
}
export const disp = async (req, res) => {
  try {
    if (!req.body) {
      get = await house.find();
    } else {
      const { search, value } = req.body;
      if (search == "location") {
        get = await house.find({ [search]: { county: value } });
      } else {
        get = await house.find({ [search]: value });
      }
    }
    if (get.length === 0) {
      return res.status(404).send({ success: false, data: "page not found" });
    }
    res.send({ success: true, house: get });
  } catch (e) {
    res.send({ succes: false, msg: e.message });
  }
};
export const upd = async (req, res) => {
  try {
    const { value, change, comment } = req.body;
    get = await house.findOne({ _id: value });

    switch (req.params.key) {
      case "type":
        get.type = change;
        break;
      case "picture":
        get.picture = change;
        break;
      case "contacts":
        get.contacts = change;
        break;
      case "price":
        get.price = change;
        break;
      case "location":
        get.location = change;
        break;
      case "occupied":
        get.occupied = change;
        break;
      case "comments":
        get.comments.push({ comment: change });
        break;
      case "delcom":
        get.comments.pull({ _id: change });
        break;
      case "chcom":
        await house.updateOne(
          { "comments._id": change },
          { $set: { "comments.$.comment": comment } }
        );
        break;
      case "chhouse":
        let up = await house.findOneAndUpdate(
          { _id: value },
          { $set: { ...change } }
        );
        break;
      default:
        throw new Error(` ${req.params.key} don't exist`);
    }

    await get.save();
    res.send({
      succes: true,
      data: `changed: ${req.params.key} to: ${change}`,
    });
  } catch (e) {
    res.status(404).send({ succes: false, msg: e.message });
  }
};
export const del = async (req, res) => {
  const { value } = req.body;
  try {
    get = await house.deleteOne({ _id: value });
    res.send({ succes: true, data: { deleted: get.deletedCount } });
  } catch (e) {
    console.log(e.message);
    res.send({ succes: false, msg: e.message });
  }
};
