import type { Request, Response } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../services/users.service.js";

export async function getAllUsers(
    req: Request,
    res: Response
) {
    try {
        const users = await getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Servor error"
        });
    }
}

export async function getOneUser(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({
                message: "invalid ID"
            });
            return;
        }

        const user = await getUserById(id);

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Servor error"
        });
    }
}

export async function createNewUser(
    req: Request,
    res: Response
) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({
                message: "name and email are mandatory"
            });
            return;
        }

        const user = await createUser({
            name,
            email
        });

        res.status(201).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Servor error"
        });
    }
}

export async function updateExistingUser(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({
                message: "invalid ID"
            });
            return;
        }

        const { name, email } = req.body;

        if (!name || !email) {
            res.status(400).json({
                message: "name and email are mandatory"
            });
            return;
        }

        const user = await updateUser(id, {
            name,
            email
        });

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message:  "Servor error"
        });
    }
}

export async function removeUser(
    req: Request,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({
                message: "invalid ID"
            });
            return;
        }

        const user = await deleteUser(id);

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.status(200).json({
            message: "User deleted",
            user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Servor error"
        });
    }
}