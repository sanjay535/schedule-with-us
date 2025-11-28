import express from "express";
import { getQuestions } from "../controllers/questions.controller.js";

const router = express.Router();
router.get("/", getQuestions);

export default router;
