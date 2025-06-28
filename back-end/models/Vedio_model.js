import mongoose from "mongoose";


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

const model = mongoose.model("Vedio",VedioSchema)
export default model