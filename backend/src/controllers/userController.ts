import type { Request, Response } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../services/usersService.js";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getOneUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const user = await getUserById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createNewUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({ message: "Name and email are mandatory" });
            return;
        }

        const user = await createUser({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateExistingUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({ message: "Name and email are mandatory" });
            return;
        }

        const user = await updateUser(id, { name, email });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const user = await deleteUser(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({
            message: "User deleted",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};