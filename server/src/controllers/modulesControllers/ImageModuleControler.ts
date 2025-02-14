import { Request, Response } from "express";
import { client } from "../..";
import { imagekit } from "../../config/ImageKit";

export const createImageModule = async (req: Request, res: Response) => {
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
    }),
      res.status(201).json(module);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateImageModule = async (req: Request, res: Response) => {
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
    }),
      res.status(200).json(textModule);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
