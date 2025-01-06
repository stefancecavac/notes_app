import { Request, Response } from "express";
import { client } from "../..";

const createTextModule = async (req: Request, res: Response) => {
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
    }),
      res.status(201).json(module);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateTextModule = async (req: Request, res: Response) => {
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

    client.note.update({
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

export { createTextModule, updateTextModule };
