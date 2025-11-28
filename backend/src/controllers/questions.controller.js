import { fetchQuestions } from "../services/github.service.js";

export const getQuestions = async (req, res) => {
    const questions = await fetchQuestions();
    res.json(questions);
};
