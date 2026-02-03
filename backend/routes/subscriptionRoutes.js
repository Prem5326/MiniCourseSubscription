import express from "express";
import {
  subscribeCourse,
  getMyCourses,
} from "../controllers/subscriptionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/subscribe", authMiddleware, subscribeCourse);
router.get("/my-courses", authMiddleware, getMyCourses);

export default router;
