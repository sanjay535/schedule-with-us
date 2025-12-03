import prisma from "../db/prisma.js";

export const scheduleInterview = async (req, res) => {
    const { userId } = req.params;
    const { skill, dateTime, interviewer } = req.body;

    try {
        const interview = await prisma.interview.create({
            data: {
                customerName: userId,
                skill,
                dateTime: new Date(dateTime),
                interviewerId: interviewer,
            },
        });

        res.status(201).json({ success: true, interview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const assignInterviewer = async (req, res) => {
    const { interviewId } = req.params;
    const { interviewerId } = req.body;

    try {
        const updatedInterview = await prisma.interview.update({
            where: { id: parseInt(interviewId) },
            data: { interviewerId },
        });

        res.status(200).json({ success: true, updatedInterview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getInterviewerInterviews = async (req, res) => {
    const { interviewerId } = req.params;

    try {
        const interviews = await prisma.interview.findMany({
            where: { interviewerId },
        });

        res.status(200).json({ success: true, interviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllInterviews = async (req, res) => {
    try {
        const interviews = await prisma.interview.findMany();

        res.status(200).json({ success: true, interviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
