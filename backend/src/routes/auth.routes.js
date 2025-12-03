import express from "express";
import {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Logout a user
router.post("/logout", logout);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

export default router;
