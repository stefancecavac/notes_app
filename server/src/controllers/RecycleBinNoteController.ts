import { NextFunction, Request, Response } from "express";
import {
  deleteFromRecycleBinService,
  getAllRecycleBinNoteService,
  moveToRecycleBinService,
  restoreFromRecyclebinService,
} from "../service/recycleBinService";

export const getAllNotesFromRecycleBinController = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const notesInRecycleBin = await getAllRecycleBinNoteService(userId);

    res.status(200).json(notesInRecycleBin);
  } catch (error) {
    return next(error);
  }
};

export const moveToRecycleBinController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    await moveToRecycleBinService({ noteId, userId });

    res.status(200).json({ message: "Note moved to recycle bin" });
  } catch (error) {
    return next(error);
  }
};

export const restoreFromRecycleBinController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    await restoreFromRecyclebinService({ noteId, userId });

    res.status(200).json({ message: "Note successfully restored" });
  } catch (error) {
    return next(error);
  }
};

export const deleteNoteFromRecycleBinController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    await deleteFromRecycleBinService({ noteId, userId });
    res.status(200).json({ message: "Note successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
