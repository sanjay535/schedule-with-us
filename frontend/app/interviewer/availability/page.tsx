"use client";

import { useState } from "react";

export default function Availability() {
    const API = process.env.NEXT_PUBLIC_API_URL!;
    const interviewerId = "interviewer-1";

    const [slots, setSlots] = useState<string[]>([]);
    const [value, setValue] = useState("");

    const addSlot = () => {
        if (value.trim()) setSlots([...slots, value]);
        setValue("");
    };

    const save = async () => {
        await fetch(`${API}/api/availability/${interviewerId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slots })
        });

        alert("Availability Updated!");
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Set Availability</h1>

            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="YYYY-MM-DD HH:mm"
            />

            <button onClick={addSlot}>Add Slot</button>

            <ul>
                {slots.map(s => <li key={s}>{s}</li>)}
            </ul>

            <button onClick={save}>Save</button>
        </div>
    );
}
