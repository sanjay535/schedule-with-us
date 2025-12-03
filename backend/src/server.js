import express from "express";
import cors from "cors";

import availabilityRoutes from "./routes/availability.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import questionsRoutes from "./routes/questions.routes.js";
import authRoutes from "./routes/auth.routes.js"; // Import auth routes

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/availability", availabilityRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/questions", questionsRoutes);
app.use(authRoutes); // Register auth routes

app.listen(5000, () => console.log("Backend running on port 5000"));
