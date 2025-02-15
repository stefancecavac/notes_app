import { Request, Response } from "express";
import { client } from "../..";

export const createToDoModule = async (req: Request, res: Response) => {
  const { order, noteId } = req.body;
  try {
    const module = await client.module.create({
      data: {
        order: order,
        type: "TODO",
        Note: {
          connect: { id: noteId },
        },
      },
      include: {
        TodoModule: true,
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

export const addTodoInModule = async (req: Request, res: Response) => {
  const { title, priority, moduleId, noteId } = req.body;
  try {
    const TodoModule = await client.module.update({
      where: {
        id: moduleId,
      },
      data: {
        TodoModule: {
          create: {
            title: title,
            priority: priority,
          },
        },
      },
      include: {
        TodoModule: true,
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
      res.status(200).json(TodoModule);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const checkTodoModule = async (req: Request, res: Response) => {
  const { completed, todoId, noteId } = req.body;

  try {
    const updatedTodo = await client.todoModule.update({
      where: {
        id: todoId,
      },
      data: {
        completed: completed,
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

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
