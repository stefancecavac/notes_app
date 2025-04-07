import { NextFunction, Request, Response } from "express";
import { createModuleService, updateModuleService } from "../service/modulesService";

export const createModuleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { noteId, properties, type, order } = req.body;

    const createdBlock = await createModuleService({ noteId, properties, type, order });

    res.status(201).json(createdBlock);
  } catch (error) {
    next(error);
  }
};

export const updateModuleController = async (req: Request, res: Response, next: NextFunction) => {
  const { properties, moduleId } = req.body;
  try {
    const updatedModule = await updateModuleService({ moduleId, properties });
    res.status(200).json(updatedModule);
  } catch (error) {
    return next(error);
  }
};
