import { NextFunction, Request, Response } from "express";
import { client } from "../..";

export const createToDoModule = async (req: Request, res: Response, next: NextFunction) => {
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
    });

    res.status(201).json(module);
  } catch (error) {
    return next(error);
  }
};

export const addTodoInModule = async (req: Request, res: Response, next: NextFunction) => {
  const { title, moduleId, noteId } = req.body;
  try {
    const TodoModule = await client.module.update({
      where: {
        id: moduleId,
      },
      data: {
        TodoModule: {
          create: {
            title: title,
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
    });

    res.status(200).json(TodoModule);
  } catch (error) {
    return next(error);
  }
};

export const checkTodoModule = async (req: Request, res: Response, next: NextFunction) => {
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
    return next(error);
  }
};

export const deleteOneTodo = async (req: Request, res: Response, next: NextFunction) => {
  const { todoId, noteId } = req.body;
  try {
    const TodoModule = await client.todoModule.delete({
      where: {
        id: todoId,
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

    res.status(200).json(TodoModule);
  } catch (error) {
    return next(error);
  }
};
