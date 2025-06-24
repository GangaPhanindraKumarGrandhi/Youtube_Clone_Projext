import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  UserName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  avtar: { type: String },
  channels: { type: Array, default: [] }
});

// Model name is "UserData", and it will be stored as a collection like "userdatas" in MongoDB
const UserModel = mongoose.model("UserData", UserSchema);

export default UserModel;
