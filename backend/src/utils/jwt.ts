import jwt from "jsonwebtoken";
import type { Role } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export interface JwtPayload {
    userId: number;
    role: Role;
}

export function generateToken(userId: number, role: Role): string {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        { userId, role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );
}

export function verifyToken(token: string): JwtPayload {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
