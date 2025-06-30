import express from "express";
import { createChannel, getChannelByUser } from "../controller/ChannelController.js";

const router = express.Router();

// Route to create a new channel
router.post("/channel/create", createChannel);

// Route to get a channel by user email
router.get("/channel/user/:email", getChannelByUser);

export default router;
