"use client";

import { useEffect, useState } from "react";

interface Question {
    question: string;
    answer: string;
}

export default function PracticeQuestions() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        fetch(`${API}/api/questions`)
            .then(res => res.json())
            .then((data: Question[]) => setQuestions(data));
    }, []);

    return (
        <div style={{ padding: 30 }}>
            <h1>Practice Questions</h1>

            {questions.map((q, idx) => (
                <div key={idx}>
                    <h3>{q.question}</h3>
                    <p>{q.answer}</p>
                </div>
            ))}
        </div>
    );
}
