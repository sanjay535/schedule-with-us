import express from "express";
import {
    scheduleInterview,
    assignInterviewer,
    getInterviewerInterviews,
    getAllInterviews,
} from "../controllers/schedule.controller.js";

const router = express.Router();

// Schedule an interview
router.post("/schedule-interview/:userId", scheduleInterview);

// Assign an interviewer
router.put("/assign-interviewer/:interviewId", assignInterviewer);

// Get interviews for a specific interviewer
router.get("/interviewer-interviews/:interviewerId", getInterviewerInterviews);

// Get all interviews (admin view)
router.get("/admin-interviews", getAllInterviews);

export default router;
