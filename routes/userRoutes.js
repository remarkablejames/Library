import express from "express";
import { getAllUsers } from "../controllers/userController.js";
const router = express.Router();

// ROUTES
router.route("/").get(getAllUsers);

export default router;
