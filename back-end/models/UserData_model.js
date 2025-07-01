import mongoose from "mongoose";
// Define schema for user data
const UserSchema = new mongoose.Schema({
  UserId: { type: String, required: true },
  UserName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  avtar: { type: String,default:"" },
  channels: { type: Array, default: [] }
});

// Create and export model
const UserModel = mongoose.model("UserData", UserSchema);

export default UserModel;
