import { NextFunction, Request, Response } from "express";
import { createModuleService, deleteModuleService, updateModuleOrderService, updateModuleService } from "../service/modulesService";

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

export const deleteModuleController = async (req: Request, res: Response, next: NextFunction) => {
  const { noteId, moduleId } = req.body;

  try {
    const deletedModule = await deleteModuleService({ moduleId, noteId });
    res.status(200).json(deletedModule[0]);
  } catch (error) {
    return next(error);
  }
};

export const updateModuleOrderController = async (req: Request, res: Response, next: NextFunction) => {
  const { modules } = req.body;

  try {
    console.log(modules);
    const reorderedModules = await updateModuleOrderService({ modules });
    res.status(200).json(reorderedModules);
  } catch (error) {
    return next(error);
  }
};
