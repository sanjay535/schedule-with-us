import express from "express";
import { getAvailability, updateAvailability } from "../controllers/availability.controller.js";

const router = express.Router();

router.get("/:id", getAvailability);
router.post("/:id", updateAvailability);

export default router;
