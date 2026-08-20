import type { Request, Response } from "express";
import { register, login, AuthError } from "../services/authService.js";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: "Name, email et password sont obligatoires" });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
            return;
        }

        const { user, token } = await register(name, email, password);
        res.status(201).json({ user, token });
    } catch (error) {
        if (error instanceof AuthError) {
            res.status(409).json({ message: error.message });
            return;
        }

        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email et password sont obligatoires" });
            return;
        }

        const { user, token } = await login(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof AuthError) {
            res.status(401).json({ message: error.message });
            return;
        }

        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
