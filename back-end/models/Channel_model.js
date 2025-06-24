import mongoose from "mongoose";
const ChannelData = mongoose.Schema({
    "channelId":String,
    "channelName":String,
    "Owner":String,
    "description":String,
    "channelBanner":String,
    "subscribers":Number,
    "videos":Array
})
const ChannelModel = mongoose.model("ChannelData",ChannelData)
export default ChannelModel