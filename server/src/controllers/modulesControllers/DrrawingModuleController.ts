import { NextFunction, Request, Response } from "express";
import { client } from "../..";

export const createDrawingModule = async (req: Request, res: Response, next: NextFunction) => {
  const { order, noteId } = req.body;

  try {
    const module = await client.module.create({
      data: {
        order: order,
        type: "DRAWING",
        Note: {
          connect: { id: noteId },
        },
        DrawingModule: {
          create: {
            data: "",
          },
        },
      },
      include: {
        DrawingModule: true,
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

export const updateDrawingModule = async (req: Request, res: Response, next: NextFunction) => {
  const { data, moduleId, noteId } = req.body;

  try {
    const drawingModule = await client.module.update({
      where: {
        id: moduleId,
      },
      data: {
        DrawingModule: {
          update: {
            data: data,
          },
        },
      },
      include: {
        DrawingModule: true,
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

    res.status(200).json(drawingModule);
  } catch (error) {
    return next(error);
  }
};
