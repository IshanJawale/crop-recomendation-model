import express from "express";
import { registerController } from "../controller/authController.js";

const router = express.Router();

router.post("/register/:role", registerController);

export default router;
