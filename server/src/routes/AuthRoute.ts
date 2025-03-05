import express from "express";

const router = express.Router();
import { logoutUser, getCurrentUser, refreshToken, sendMagicLink, verifyMagicLink } from "../controllers/AuthController";

router.post("/magicLink", sendMagicLink);
router.post("/verify-magicLink", verifyMagicLink);
router.post("/logout", logoutUser);

import authenticate from "../middleware/authentication";
router.post("/refresh-token", refreshToken);
router.use(authenticate);

router.get("/user", getCurrentUser);

export default router;
