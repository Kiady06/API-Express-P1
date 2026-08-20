import {
    findAll,
    findById,
    create,
    update,
    remove
} from "../repositories/usersRepository.js";

import { User, PublicUser, type CreateUser } from "../models/userModel.js";
import { hashPassword } from "../utils/hash.js";

export const getUsers = async (): Promise<PublicUser[]> => {
    const users = await findAll();
    return users.map(PublicUser.fromUser);
};

export const getUserById = async (id: number): Promise<PublicUser | null> => {
    const user = await findById(id);
    return user ? PublicUser.fromUser(user) : null;
};

export const createUser = async (data: CreateUser): Promise<PublicUser> => {
    const hashedPassword = await hashPassword(data.password);
    const user = await create({ ...data, password: hashedPassword });
    return PublicUser.fromUser(user);
};

export const updateUser = async (
    id: number,
    data: Omit<CreateUser, "password">
): Promise<PublicUser | null> => {
    const user = await update(id, data);
    return user ? PublicUser.fromUser(user) : null;
};

export const deleteUser = async (id: number): Promise<PublicUser | null> => {
    const user = await remove(id);
    return user ? PublicUser.fromUser(user) : null;
};
