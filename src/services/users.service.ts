import pool from "../db/database.js";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUser {
    name: string;
    email: string;
}

export async function getUsers(): Promise<User[]> {
    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;
}

export async function getUserById(id: number): Promise<User | null> {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function createUser(user: CreateUser): Promise<User> {
    const result = await pool.query(
        `INSERT INTO users (name, email)
         VALUES ($1, $2)
         RETURNING *`,
        [user.name, user.email]
    );

    return result.rows[0];
}

export async function updateUser(
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

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

export async function deleteUser(id: number): Promise<User | null> {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}