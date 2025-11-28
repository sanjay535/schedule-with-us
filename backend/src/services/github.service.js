import fetch from "node-fetch";

export const fetchQuestions = async () => {
    const url = process.env.GITHUB_QUESTIONS_URL;

    const response = await fetch(url);
    return response.json();
};
