import db from "mongoose";
const hsSchema = db.Schema({
  type: { type: String },
  picture: String,
  description: String,
  price: Number,
  location: {
    county: String,
    sub_county: String,
    residence: String,
  },
  comments: [{ id: db.ObjectId, comment: String }],
  contacts: { type: Number, required: true },
  occupied: { type: Boolean, required: true },
});
const house = db.model("house", hsSchema);
export default house;
