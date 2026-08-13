import pool from "../db/database.js";
import { User, type CreateUser } from "../models/userModel.js";

export async function findAll(): Promise<User[]> {
    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;
}

export async function findById(id: number): Promise<User | null> {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function create(user: CreateUser): Promise<User> {
    const result = await pool.query(
        `INSERT INTO users (name, email)
         VALUES ($1, $2)
         RETURNING *`,
        [user.name, user.email]
    );

    return result.rows[0];
}

export async function update(
    id: number,
    user: CreateUser
): Promise<User | null> {

    const result = await pool.query(
        `UPDATE users
         SET name = $1, email = $2
         WHERE id = $3
         RETURNING *`,
        [user.name, user.email, id]
    );

    return result.rows.length === 0 ? null : result.rows[0];
}

export async function remove(id: number): Promise<User | null> {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows.length === 0 ? null : result.rows[0];
}