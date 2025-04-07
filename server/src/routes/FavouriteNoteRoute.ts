import express from "express";

import authenticate from "../middleware/authentication";
import { favouriteOrUnfavouriteNoteController, getAllFavouriteNotesController } from "../controllers/FavouriteNoteController";

const router = express.Router();

router.use(authenticate);
router.get("/", getAllFavouriteNotesController);
router.put("/", favouriteOrUnfavouriteNoteController);

export default router;
