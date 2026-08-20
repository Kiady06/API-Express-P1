import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

// Protège une route : exige un header "Authorization: Bearer <token>" valide
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authentification requise" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyToken(token!);
        req.user = { userId: payload.userId, role: payload.role };
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};
