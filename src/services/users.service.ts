import {
    findAll,
    findById,
    create,
    update,
    remove
} from "../repositories/users.repository.js";

import { User, type CreateUser } from "../models/user.model.js";

export async function getUsers(): Promise<User[]> {
    return await findAll();
}

export async function getUserById(id: number): Promise<User | null> {
    return await findById(id);
}

export async function createUser(user: CreateUser): Promise<User> {
    return await create(user);
}

export async function updateUser(
    id: number,
    user: CreateUser
): Promise<User | null> {
    return await update(id, user);
}

export async function deleteUser(id: number): Promise<User | null> {
    return await remove(id);
}