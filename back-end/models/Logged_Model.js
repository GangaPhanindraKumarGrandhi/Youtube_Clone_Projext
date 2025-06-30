import mongoose from "mongoose";
// Schema for tracking logged-in users
const LoggedUser =mongoose.Schema({
    "Username":String,
    "Email":String,
    "Password":String
})
// Create and export model
const LoggedModel = mongoose.model("Logged",LoggedUser)
export default LoggedModel
