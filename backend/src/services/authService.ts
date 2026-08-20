import { findByEmail, create } from "../repositories/usersRepository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { PublicUser } from "../models/userModel.js";

export class AuthError extends Error {}

export const register = async (
    name: string,
    email: string,
    password: string
): Promise<{ user: PublicUser; token: string }> => {
    const existing = await findByEmail(email);

    if (existing) {
        throw new AuthError("Un compte existe déjà avec cet email");
    }

    const hashedPassword = await hashPassword(password);
    // Le rôle n'est jamais accepté depuis la requête : toute inscription publique
    // crée un utilisateur "user". La promotion en admin se fait à part (voir usersService/DB).
    const user = await create({ name, email, password: hashedPassword, role: "user" });
    const token = generateToken(user.id, user.role);

    return { user: PublicUser.fromUser(user), token };
};

export const login = async (
    email: string,
    password: string
): Promise<{ user: PublicUser; token: string }> => {
    const user = await findByEmail(email);

    if (!user) {
        throw new AuthError("Email ou mot de passe incorrect");
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        throw new AuthError("Email ou mot de passe incorrect");
    }

    const token = generateToken(user.id, user.role);

    return { user: PublicUser.fromUser(user), token };
};
