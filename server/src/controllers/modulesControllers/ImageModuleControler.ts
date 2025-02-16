import { NextFunction, Request, Response } from "express";
import { client } from "../..";
import { imagekit } from "../../config/ImageKit";
import AppError from "../../middleware/ErrorHandlerMiddleware";

export const createImageModule = async (req: Request, res: Response, next: NextFunction) => {
  const { imagePath, order, noteId } = req.body;
  const { userId } = req.user;

  try {
    const uploadedImage = await imagekit.upload({
      file: imagePath,
      fileName: `${userId}`,
    });

    const module = await client.module.create({
      data: {
        order: order,
        type: "IMAGE",
        Note: {
          connect: { id: noteId },
        },
        imageModule: {
          create: {
            imageUrl: uploadedImage.url,
            imageId: uploadedImage.fileId,
            height: 500,
            width: 500,
          },
        },
      },
      include: {
        imageModule: true,
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

export const updateImageModule = async (req: Request, res: Response, next: NextFunction) => {
  const { height, width, moduleId, noteId } = req.body;

  try {
    const textModule = await client.module.update({
      where: {
        id: moduleId,
      },
      data: {
        imageModule: {
          update: {
            height: height,
            width: width,
          },
        },
      },
      include: {
        imageModule: true,
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
