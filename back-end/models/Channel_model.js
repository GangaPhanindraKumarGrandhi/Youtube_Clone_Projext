import mongoose from "mongoose";
// Define schema for channel data
const ChannelData = mongoose.Schema({
    "channelId":String,
    "channelName":String,
    "Owner":String,
    "description":String,
    "channelBanner":String,
    "subscribers":Number,
    "videos":Array
})
// Create and export model
const ChannelModel = mongoose.model("ChannelData",ChannelData)
export default ChannelModel