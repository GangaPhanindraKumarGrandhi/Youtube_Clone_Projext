import {
  FetchVedios,
  getVideoById,
  addComment,
  updateComment,
  deleteComment
} from "../controller/VideoController.js";

import express from "express"

const router = express.Router()

router.get("/videos",FetchVedios)
router.get("/videos/:id",getVideoById)

router.post("/videos/:id/comments", addComment);
router.put("/videos/:id/comments/:commentId", updateComment);
router.delete("/videos/:id/comments/:commentId", deleteComment);
export default router