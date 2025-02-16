import { NextFunction, Request, Response } from "express";
import { client } from "../..";
import { imagekit } from "../../config/ImageKit";
import AppError from "../../middleware/ErrorHandlerMiddleware";

const updateModuleOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { modules, noteId } = req.body;

  try {
    const updatedModules = [];

    for (const module of modules) {
      const moduleOrderUpdated = await client.module.update({
        where: { id: module.id },
        data: { order: module.order, noteId: noteId },
        include: {
          textModule: true,
          imageModule: true,
          TodoModule: true,
        },
      });

      updatedModules.push(moduleOrderUpdated);
    }

    await client.note.update({
      where: { id: noteId },
      data: { updatedAt: new Date() },
    });

    res.status(200).json(updatedModules);
  } catch (error) {
    return next(error);
  }
};

const deleteModule = async (req: Request, res: Response, next: NextFunction) => {
  const { moduleId, noteId } = req.body;

  try {
    const module = await client.module.findUnique({
      where: {
        id: moduleId,
      },
      include: {
        imageModule: true,
      },
    });

    if (module?.type === "IMAGE" && module?.imageModule?.imageId) {
      await imagekit.deleteFile(module?.imageModule?.imageId);
    }

    await client.module.delete({
      where: { id: moduleId },
    });

    await client.note.update({
      where: {
        id: noteId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    res.status(200).json(module);
  } catch (error) {
    return next(error);
  }
};

export { updateModuleOrder, deleteModule };
