import express from "express";

const router = express.Router();
import { FavouriteNote, getAllFavouriteNotes, UnFavouriteNote } from "../controllers/FavouriteNoteController";
import authenticate from "../middleware/authentication";

router.use(authenticate);
router.get("/", getAllFavouriteNotes);
router.put("/addFavourites", FavouriteNote);
router.put("/removeFavourites", UnFavouriteNote);

export default router;
