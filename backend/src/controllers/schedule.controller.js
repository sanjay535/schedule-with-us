import prisma from "../db/prisma.js";

export const scheduleInterview = async (req, res) => {
    const { customerName, interviewerId, selectedSlot } = req.body;

    const booking = await prisma.interview.create({
        data: { customerName, interviewerId, slot: selectedSlot }
    });

    res.json({ success: true, booking });
};
