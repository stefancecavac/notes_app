import { NextFunction, Request, Response } from "express";
import {
  deleteNoteByIdService,
  getAllNotesInTreeViewService,
  getAllNotesService,
  getNoteByIdService,
  insertNoteIntoDbService,
  moveNoteByIdService,
  updateNoteService,
} from "../service/notesService";
import AppError from "../middleware/errorHandler";

export const getAllNotesInTreeViewController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;

    const allNotes = await getAllNotesInTreeViewService(userId);

    res.status(200).json(allNotes);
  } catch (error) {
    next(error);
  }
};

export const getAllNotesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;

    const allNotes = await getAllNotesService(userId);

    res.status(200).json(allNotes);
  } catch (error) {
    next(error);
  }
};

export const getSingleNoteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const singleNote = await getNoteByIdService(id);

    if (!singleNote) {
      return next(new AppError("Note with that id doesnt exist", 404));
    }

    res.status(200).json(singleNote);
  } catch (error) {
    next(error);
  }
};

export const createNotecontroller = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user;
    const { noteTitle, noteColor, noteIcon, parentNoteId } = req.body;
    const allNotes = await insertNoteIntoDbService({ userId, noteTitle, noteColor, noteIcon, parentNoteId });
    res.status(200).json(allNotes);
  } catch (error) {
    next(error);
  }
};

export const updateNoteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId } = req.params;
    const { noteTitle, noteColor, noteIcon } = req.body;
    const { userId } = req.user;
    const updatedNote = await updateNoteService({ noteTitle, id: noteId, noteColor, noteIcon, userId });
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const moveNoteController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId, parentNoteId } = req.body;
  const { userId } = req.user;

  try {
    const movedNote = await moveNoteByIdService({ noteId, userId, parentNoteId });

    res.status(200).json(movedNote);
  } catch (error) {
    return next(error);
  }
};
