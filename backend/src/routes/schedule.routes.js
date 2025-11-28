import express from "express";
import { scheduleInterview } from "../controllers/schedule.controller.js";

const router = express.Router();
router.post("/", scheduleInterview);

export default router;
