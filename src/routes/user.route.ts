import { Router } from "express";

import {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateExistingUser,
    removeUser
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getOneUser);

router.post("/", createNewUser);

router.put("/:id", updateExistingUser);

router.delete("/:id", removeUser);

export default router;