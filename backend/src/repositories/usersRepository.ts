import pool from "../config/database.js";
import { User, type CreateUser } from "../models/userModel.js";

export const findAll = async (): Promise<User[]> => {
    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;
};

export const findById = async (id: number): Promise<User | null> => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    return result.rows[0] || null;
};

export const create = async (user: CreateUser): Promise<User> => {
    const result = await pool.query(
        `INSERT INTO users (name, email)
         VALUES ($1, $2)
         RETURNING *`,
        [user.name, user.email]
    );

    return result.rows[0];
};

export const update = async (
    id: number,
    user: CreateUser
): Promise<User | null> => {
    const result = await pool.query(
        `UPDATE users
         SET name = $1, email = $2
         WHERE id = $3
         RETURNING *`,
        [user.name, user.email, id]
    );

    return result.rows[0] || null;
};

export const remove = async (id: number): Promise<User | null> => {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0] || null;
};