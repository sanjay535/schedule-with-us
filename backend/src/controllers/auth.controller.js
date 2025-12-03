import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

const SECRET_KEY = "your_secret_key"; // Replace with a secure key

export const register = async (req, res) => {
    const { name, emailId, password, role, dob } = req.body; // Include dob

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                emailId,
                password: hashedPassword,
                role,
                dob: new Date(dob), // Ensure dob is passed as a Date object
            },
        });

        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    const { emailId, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { emailId } });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = (req, res) => {
    // For stateless JWT, logout is handled on the client side by removing the token.
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { emailId } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { emailId } });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const resetToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "15m" });

        await prisma.user.update({
            where: { emailId },
            data: {
                resetToken,
                resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        // Send resetToken via email (email service integration required)
        res.status(200).json({ success: true, message: "Password reset token sent" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(resetToken, SECRET_KEY);

        // Find the user by ID and ensure the token is valid and not expired
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user || user.resetToken !== resetToken || new Date(user.resetTokenExpiry) < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
