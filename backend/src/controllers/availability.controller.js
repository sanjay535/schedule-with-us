import prisma from "../db/prisma.js";

export const getAvailability = async (req, res) => {
    const availability = await prisma.availability.findUnique({
        where: { interviewerId: req.params.id }
    });

    res.json(availability ?? { interviewerId: req.params.id, slots: [] });
};

export const updateAvailability = async (req, res) => {
    const { slots } = req.body;

    const updated = await prisma.availability.upsert({
        where: { interviewerId: req.params.id },
        update: { slots },
        create: { interviewerId: req.params.id, slots }
    });

    res.json(updated);
};
