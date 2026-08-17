import express from "express";
import dotenv from "dotenv";
import cors from 'cors';

import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

const corOptions = {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credetials: true
};

app.use(cors(corOptions));
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});