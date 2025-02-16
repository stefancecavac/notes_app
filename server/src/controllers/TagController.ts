import { NextFunction, Request, Response } from "express";
import { client } from "..";
import AppError from "../middleware/ErrorHandlerMiddleware";

const getAllTags = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;

  try {
    const allTags = await client.tag.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(allTags);
  } catch (error) {
    return next(error);
  }
};

const createTag = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.params;
  const { userId } = req.user;
  const { name, textColor, backgroundColor } = req.body;

  try {
    const tagExists = await client.tag.findFirst({
      where: {
        name: name,
        userId: userId,
      },
    });

    if (tagExists) {
      const updatedNote = await client.note.update({
        where: {
          id: noteId,
          userId: userId,
        },
        data: {
          tags: {
            connect: {
              id: tagExists.id,
            },
          },
        },
        include: {
          tags: true,
          modules: {
            include: {
              textModule: true,
            },
          },
        },
      });

      res.status(201).json(updatedNote);
    } else {
      const updatedNote = await client.note.update({
        where: {
          id: noteId,
          userId: userId,
        },
        data: {
          tags: {
            create: {
              userId: userId,
              name: name,
              textColor: textColor,
              backgroundColor: backgroundColor,
            },
          },
        },
        include: {
          tags: true,
          modules: {
            include: {
              textModule: true,
            },
          },
        },
      });

      res.status(201).json(updatedNote);
    }
  } catch (error) {
    return next(error);
  }
};

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId } = req.params;
  const { userId } = req.user;
  const { tagId } = req.body;

  try {
    const updatedNote = await client.note.update({
      where: {
        id: noteId,
        userId: userId,
      },
      data: {
        tags: {
          disconnect: {
            id: tagId,
          },
        },
      },
      include: {
        tags: true,
        modules: {
          include: {
            textModule: true,
          },
        },
      },
    });

    res.status(200).json(updatedNote);
  } catch (error) {
    return next(error);
  }
};

export { getAllTags, createTag, deleteTag };
