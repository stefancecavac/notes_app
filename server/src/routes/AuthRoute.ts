import express from "express";

import authenticate from "../middleware/authentication";
import {
  getCurrentUserController,
  logoutUser,
  refreshTokenController,
  sendMagicLinkController,
  verifyMagicLinkController,
} from "../controllers/authController";

const router = express.Router();

router.post("/magicLink", sendMagicLinkController);
router.post("/verify-magicLink", verifyMagicLinkController);
router.post("/logout", logoutUser);

router.post("/refresh-token", refreshTokenController);
router.use(authenticate);

router.get("/user", getCurrentUserController);

export default router;
