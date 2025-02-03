import express from "express";
import { signup } from "../controllers/auth.contoller.js";
import { login } from "../controllers/auth.contoller.js";
import { logout } from "../controllers/auth.contoller.js";

const router= express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

export default router;