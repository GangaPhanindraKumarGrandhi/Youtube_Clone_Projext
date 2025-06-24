// controller/ChannelController.js
import Channel from "../models/Channel_model.js";
import jwt from "jsonwebtoken";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    // 🔐 extract user info from token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "Youtube");
    const ownerEmail = decoded.Email;

    const channelId = "channel_" + Date.now(); // You can use UUID if needed

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

// Get channel by owner email
export const getChannelByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const channel = await Channel.findOne({ Owner: email });
    if (channel) {
      return res.status(200).json({ exists: true, channel });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Error checking channel", error: err.message });
  }
};

