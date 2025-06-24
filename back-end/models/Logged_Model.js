import mongoose from "mongoose";
const LoggedUser =mongoose.Schema({
    "Username":String,
    "Email":String,
    "Password":String
})
const LoggedModel = mongoose.model("Logged",LoggedUser)
export default LoggedModel
