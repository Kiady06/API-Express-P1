import type { Request, Response, NextFunction } from "express";
import type { Role } from "../models/userModel.js";

// À utiliser APRES authMiddleware : s'appuie sur req.user posé par celui-ci.
// Usage : router.get("/", authMiddleware, requireRole("admin"), handler)
export const requireRole = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: "Authentification requise" });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Accès refusé : permissions insuffisantes" });
            return;
        }

        next();
    };
};
