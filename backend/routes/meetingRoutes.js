import express from "express";

const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import {createMeeting,joinMeeting,endMeeting} from "../controllers/meetingController.js";

router.post("/create", protect, createMeeting);
router.post("/join", protect, joinMeeting);
router.post( "/end", protect, endMeeting);

export default router;