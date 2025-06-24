// routes/ChannelRoute.js
import express from "express";
import { createChannel } from "../controller/ChannelController.js";
import { getChannelByUser } from "../controller/ChannelController.js";

const router = express.Router();

// Create channel (only after login)
router.post("/channel/create", createChannel);
router.get("/channel/user/:email", getChannelByUser);

export default router;
