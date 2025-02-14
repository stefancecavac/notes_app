import { Request, Response } from "express";
import { client } from "../..";
import { imagekit } from "../../config/ImageKit";

const updateModuleOrder = async (req: Request, res: Response) => {
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
        },
      });

      updatedModules.push(moduleOrderUpdated);
    }
    await client.note.update({
      where: { id: noteId },
      data: { updatedAt: new Date() },
    }),
      res.status(200).json(updatedModules);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const deleteModule = async (req: Request, res: Response) => {
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
    }),
      res.status(200).json(module);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export { updateModuleOrder, deleteModule };
