import express from "express";
import { auth } from "../controllers/auth.js";

const router = express.Router();

router.post("/google", auth);

export default router;
