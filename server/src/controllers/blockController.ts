import { NextFunction, Request, Response } from "express";
import { deleteBlockService, updateBlockService } from "../service/blocksService";

export const updateBlockController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, properties, type } = req.body;

    const createdBlock = await updateBlockService({ id, properties, type });

    res.status(201).json(createdBlock);
  } catch (error) {
    next(error);
  }
};

export const deleteBlockController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;

    const deletedBlock = await deleteBlockService(id);

    res.status(201).json(deletedBlock[0]);
  } catch (error) {
    next(error);
  }
};
