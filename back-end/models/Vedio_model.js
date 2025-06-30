import mongoose from "mongoose";
// Schema for storing video data

const VedioSchema =  mongoose.Schema({
  VedioId: String,
  title: String,
  category:String,
  thumbnailUrl: String,
  src: String,
  description: String,
  channelId: String,
  channelLogo: String,
  uploader: String,
  views: String,
  likes: String,
  dislikes: String,
  uploadDate: { type: Date, default: Date.now },
   comments: {
  type: Array,
    default: [],
  }
});
// Create and export model
const model = mongoose.model("Vedio",VedioSchema)
export default model