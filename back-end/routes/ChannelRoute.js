import express from "express";
import { createChannel, getChannelByUser,deleteChannelByUser } from "../controller/ChannelController.js";

const router = express.Router();

// Route to create a new channel
router.post("/channel/create", createChannel);

// Route to get a channel by user email
router.get("/channel/user/:email", getChannelByUser);
// Route to delete a channel by user email
router.delete("/channel/user/:email", deleteChannelByUser);

export default router;
