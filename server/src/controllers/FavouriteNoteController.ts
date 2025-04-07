import { NextFunction, Request, Response } from "express";
import { favouriteOrUnfavouriteNoteService, getAllFavouriteNotesService } from "../service/favouriteNoteService";

export const getAllFavouriteNotesController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const favouriteNotes = await getAllFavouriteNotesService(userId);

    res.status(200).json(favouriteNotes);
  } catch (error) {
    return next(error);
  }
};

export const favouriteOrUnfavouriteNoteController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;

  try {
    const favouriteNote = await favouriteOrUnfavouriteNoteService(noteId);

    res.status(200).json(favouriteNote);
  } catch (error) {
    return next(error);
  }
};
