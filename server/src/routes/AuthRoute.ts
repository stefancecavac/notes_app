import express from "express";

const router = express.Router();
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/AuthController";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

import authenticate from "../middleware/authentication";
router.use(authenticate);
router.get("/user", getCurrentUser);

export default router;
