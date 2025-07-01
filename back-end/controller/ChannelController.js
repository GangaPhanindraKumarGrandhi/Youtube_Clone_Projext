import Channel from "../models/Channel_model.js";
import jwt from "jsonwebtoken";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    // 🔐 Extract JWT token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Decode the token to get user data
    const decoded = jwt.verify(token, "Youtube");
    const ownerEmail = decoded.Email;
    const ownerName = decoded.UserName || "user";

    // Generate readable and consistent channelId like "@phanindra"
    const channelId = "@" + ownerName.toLowerCase().replace(/\s+/g, "_");

    // Create and save new channel
    const newChannel = await Channel.create({
      channelId,
      channelName,
      Owner: ownerEmail,
      description,
      channelBanner,
      subscribers: 0,
      videos: [],
    });

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

export const deleteChannelByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const deleted = await Channel.deleteOne({ Owner: email });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Channel not found or already deleted" });
    }

    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    console.error("Channel delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
