import express from "express";

const router = express.Router();
import { registerUser, loginUser, logoutUser, getCurrentUser, refreshToken } from "../controllers/AuthController";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

import authenticate from "../middleware/authentication";
router.post("/refresh-token", refreshToken);
router.use(authenticate);

router.get("/user", getCurrentUser);

export default router;
