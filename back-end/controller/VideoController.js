import Video from "../models/Vedio_model.js";
import mongoose from "mongoose";

// Fetch all videos
export async function FetchVedios(req, res) {
  try {
    const AllVideos = await Video.find(); // Retrieve all videos from DB
    res.status(200).json(AllVideos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
}

// Get video by ID
export async function getVideoById(req, res) {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Video Id Format" });
  }

  try {
    const video = await Video.findById(id);
    if (video) {
      res.json(video);
    } else {
      res.status(404).json({ message: "Video Not Found" });
    }
  } catch (err) {
    console.error("Error fetching video by ID", err);
    res.status(500).json({ message: "Server Error while fetching video" });
  }
}

// Add a comment to a video
export async function addComment(req, res) {
  const { id } = req.params;
  const { userId, text } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const newComment = {
      commentId: new mongoose.Types.ObjectId().toString(), // Generate unique comment ID
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

// Update a comment
export async function updateComment(req, res) {
  const { id, commentId } = req.params;
  const { text } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = video.comments.find(c => c.commentId === commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.text = text; // Update comment text
    await video.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment", error: err.message });
  }
}

// Delete a comment
export async function deleteComment(req, res) {
  const { id, commentId } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.comments = video.comments.filter(c => c.commentId !== commentId); // Remove comment
    await video.save();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment", error: err.message });
  }
}

// Create a new video
export async function createVideo(req, res) {
  try {
    const newVideo = new Video(req.body); // Create new video document
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: "Error creating video", error: err.message });
  }
}

// Update a video by ID
export async function updateVideo(req, res) {
  const { id } = req.params;

  try {
    const updated = await Video.findByIdAndUpdate(id, req.body, { new: true }); // Return updated document
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating video", error: err.message });
  }
}

// Delete a video by ID
export async function deleteVideo(req, res) {
  const { id } = req.params;

  try {
    await Video.findByIdAndDelete(id); // Delete video
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting video", error: err.message });
  }
}
