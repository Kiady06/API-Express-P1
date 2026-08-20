// Étend le type Request d'Express pour y ajouter l'utilisateur authentifié
// (injecté par authMiddleware après vérification du JWT)
import "express";
import type { Role } from "../models/userModel.js";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            userId: number;
            role: Role;
        };
    }
}
