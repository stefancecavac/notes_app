import { NextFunction, Request, Response } from "express";
import { client } from "..";
import AppError from "../middleware/ErrorHandlerMiddleware";

const getAllNotesFromRecycleBin = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        inTrash: true,
      },
    });

    if (notes.length === 0) {
      return next(new AppError("No notes in Recycle Bin", 404));
    }

    res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
};

const moveToRecycleBin = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteExists = await client.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!noteExists) {
      return next(new AppError("Note with that ID not found", 404));
    }

    const moveChildrenToTrash = async (noteId: string) => {
      const children = await client.note.findMany({
        where: {
          parentNoteId: noteId,
        },
      });

      for (const child of children) {
        await client.note.update({
          where: {
            id: child.id,
          },
          data: {
            inTrash: true,
          },
        });

        await moveChildrenToTrash(child.id);
      }
    };

    const note = await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        inTrash: true,
        trashedAt: new Date(),
      },
      include: {
        tags: true,
        childNotes: true,
      },
    });

    await moveChildrenToTrash(noteId);

    res.status(200).json(note);
  } catch (error) {
    return next(error);
  }
};

const restoreFromRecycleBin = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;
  const { userId } = req.user;

  try {
    const noteExists = await client.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!noteExists) {
      return next(new AppError("Note with that ID not found", 404));
    }

    await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        inTrash: false,
      },
    });

    res.status(200).json({ message: "Note successfully restored" });
  } catch (error) {
    return next(error);
  }
};

export { getAllNotesFromRecycleBin, moveToRecycleBin, restoreFromRecycleBin };
