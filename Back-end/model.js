import db from "mongoose";
const hsSchema = db.Schema(
  {
    type: { type: String },
    picture: String,
    description: String,
    price: Number,
    location: {
      county: String,
      sub_county: String,
      residence: String,
    },
    userId: String,
    page: Number,
    comments: [{ id: db.ObjectId, comment: String, UID: String }],
    contacts: { type: Number, required: true },
    occupied: { type: Boolean, required: true },
  },
  { timestamps: true }
);
const usersSchema = db.Schema({
  telephone: Number,
  name: String,
  email: String,
  password: String,
  houseIds: [],
});
export const house = db.model("house", hsSchema);
export const users = db.model("Users", usersSchema);
