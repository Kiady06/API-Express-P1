import type { Request, Response, NextFunction } from "express";

// 404 pour toute route non définie
export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// Filet de sécurité : capte toute erreur non gérée dans les controllers
// (nécessite 4 paramètres pour qu'Express la reconnaisse comme error handler)
export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
};
