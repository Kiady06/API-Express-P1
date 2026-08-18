import {
    findAll,
    findById,
    create,
    update,
    remove
} from "../repositories/usersRepository.js";

import { User, type CreateUser } from "../models/userModel.js";

export const getUsers = (): Promise<User[]> => 
    findAll();

export const getUserById = (id: number): Promise<User | null> => 
    findById(id);

export const createUser = (user: CreateUser): Promise<User> => 
    create(user);

export const updateUser = (id: number, user: CreateUser): Promise<User | null> => 
    update(id, user);

export const deleteUser = (id: number): Promise<User | null> => 
    remove(id);