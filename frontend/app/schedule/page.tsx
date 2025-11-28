"use client";

import { useEffect, useState } from "react";

interface Availability {
  slots: string[];
}

export default function SchedulePage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const interviewerId = "interviewer-1";

  const [slots, setSlots] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${API}/api/availability/${interviewerId}`)
      .then(res => res.json())
      .then((data: Availability) => setSlots(data?.slots || []));
  }, []);

  const schedule = async (slot: string) => {
    await fetch(`${API}/api/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Demo User",
        interviewerId,
        selectedSlot: slot
      })
    });

    alert("Interview Scheduled!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Schedule Interview</h1>
      {slots.length === 0 && <p>No slots available</p>}

      {slots.map(slot => (
        <button key={slot} onClick={() => schedule(slot)}>
          {slot}
        </button>
      ))}
    </div>
  );
}
