import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users.js";

const router = express.Router();

/* READ */
router.get("/", getAllUsers);

/* UPDATE */
router.patch("/update/:id", updateUser);

/* DELETE */
router.delete("/:id", deleteUser);
export default router;
