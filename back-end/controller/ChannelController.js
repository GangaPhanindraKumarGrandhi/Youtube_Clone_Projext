import Channel from "../models/Channel_model.js";
import jwt from "jsonwebtoken";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    // 🔐 Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode the token to get user email
    const decoded = jwt.verify(token, "Youtube");
    const ownerEmail = decoded.Email;

    // Generate a unique channel ID using timestamp (can replace with UUID)
    const channelId = "channel_" + Date.now();

    // Create and save new channel document
    const newChannel = await Channel.create({
      channelId,
      channelName,
      Owner: ownerEmail,
      description,
      channelBanner,
      subscribers: 0,
      videos: [],
    });

    // Respond with success message and channel data
    res.status(201).json({ message: "Channel created", channel: newChannel });
  } catch (error) {
    console.error("Channel creation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get channel by owner's email
export const getChannelByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const channel = await Channel.findOne({ Owner: email });

    // If channel exists, return it; otherwise indicate it doesn't
    if (channel) {
      return res.status(200).json({ exists: true, channel });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Error checking channel", error: err.message });
  }
};
