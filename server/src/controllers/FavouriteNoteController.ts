import { NextFunction, Request, Response } from "express";
import { client } from "..";
import AppError from "../middleware/ErrorHandlerMiddleware";

const getAllFavouriteNotes = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const notes = await client.note.findMany({
      where: {
        userId: userId,
        favourite: true,
        inTrash: false,
      },
      include: {
        tags: true,
      },
    });

    res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
};

const FavouriteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;

  try {
    const favouriteNote = await client.note.update({
      where: {
        id: noteId,
      },
      data: {
        favourite: true,
      },
      include: {
        childNotes: {
          where: { inTrash: false },
          select: {
            title: true,
            id: true,
          },
        },
        modules: {
          include: {
            textModule: true,
          },
        },
      },
    });

    res.status(200).json(favouriteNote);
  } catch (error) {
    return next(error);
  }
};

const UnFavouriteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.body;

  try {
    const unfavouriteNote = await client.note.update({
      where: {
        id: noteId,
        inTrash: false,
      },
      data: {
        favourite: false,
      },
      include: {
        childNotes: {
          where: { inTrash: false },
          select: {
            title: true,
            id: true,
          },
        },
        modules: {
          include: {
            textModule: true,
          },
        },
      },
    });

    res.status(200).json(unfavouriteNote);
  } catch (error) {
    return next(error);
  }
};

export { FavouriteNote, UnFavouriteNote, getAllFavouriteNotes };
