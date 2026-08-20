import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

// Routes publiques
app.use("/auth", authRoutes);

// Routes protégées (JWT requis, voir authMiddleware)
app.use("/users", userRoutes);

// Doivent rester après toutes les routes
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
