import { NextFunction, Request, Response } from "express";
import { client } from "../..";
import AppError from "../../middleware/ErrorHandlerMiddleware";

const createTextModule = async (req: Request, res: Response, next: NextFunction) => {
  const { content, order, noteId } = req.body;
  try {
    const module = await client.module.create({
      data: {
        order: order,
        type: "TEXT",
        Note: {
          connect: { id: noteId },
        },
        textModule: {
          create: {
            content: content,
          },
        },
      },
      include: {
        textModule: true,
      },
    });

    await client.note.update({
      where: { id: noteId },
      data: { updatedAt: new Date() },
    });

    res.status(201).json(module);
  } catch (error) {
    return next(error);
  }
};

const updateTextModule = async (req: Request, res: Response, next: NextFunction) => {
  const { content, moduleId, noteId } = req.body;
  try {
    const textModule = await client.module.update({
      where: {
        id: moduleId,
      },
      data: {
        textModule: {
          update: {
            content: content,
          },
        },
      },
      include: {
        textModule: true,
      },
    });

    await client.note.update({
      where: {
        id: noteId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    res.status(200).json(textModule);
  } catch (error) {
    return next(error);
  }
};

export { createTextModule, updateTextModule };
