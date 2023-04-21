import express from "express";
import { sendDeleteEmail, verifyEmail } from "../controllers/email.js";

const router = express.Router();

router.post("/delete", sendDeleteEmail);
router.patch("/verify", verifyEmail);

export default router;
