import Video from "../models/Vedio_model.js"; // This is the function that fetches videos
import mongoose from "mongoose";
export async function FetchVedios(req, res) {
  try {
    const AllVideos = await Video.find();  // ✅ Await the async function
    res.status(200).json(AllVideos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
}
export async function getVideoById(req,res){
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"Invalid Vedio Id Format"})
  }
  try{
    const video = await Video.findById(id);
    if(video) {
      res.json(video)
    }else{
      res.status(400).json({menubar:"Vidoe Not Fount"})
    }
  }catch(err){
    console.error("Error Fetching video by Id",err)
    res.status(400).json({message:"Server Error while fetching video"})
  }
}

// Add Comment
export async function addComment(req, res) {
  const { id } = req.params;
  const { userId, text } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      commentId: new mongoose.Types.ObjectId().toString(),
      userId,
      text,
      timestamp: new Date(),
    };

    video.comments.push(newComment);
    await video.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment", error: err.message });
  }
}

// Update Comment
export async function updateComment(req, res) {
  const { id, commentId } = req.params;
  const { text } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.find(c => c.commentId === commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.text = text;
    await video.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment", error: err.message });
  }
}

// Delete Comment
export async function deleteComment(req, res) {
  const { id, commentId } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.comments = video.comments.filter(c => c.commentId !== commentId);
    await video.save();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
}
