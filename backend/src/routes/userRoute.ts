import { Router } from "express";

import {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateExistingUser,
    removeUser
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const router = Router();

// Toutes les routes users nécessitent d'être authentifié
router.use(authMiddleware);

// Lister tous les users / créer / supprimer : réservé aux admins
router.get("/", requireRole("admin"), getAllUsers);
router.post("/", requireRole("admin"), createNewUser);
router.delete("/:id", requireRole("admin"), removeUser);

// Consulter / modifier une fiche : ouvert à tout utilisateur authentifié
router.get("/:id", getOneUser);
router.put("/:id", updateExistingUser);

export default router;
