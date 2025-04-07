import { eq } from "drizzle-orm";
import { db } from "../db";
import { blocksTable, createBlocksTableType, updateBlocksTableType } from "../db/schema/blocks";
import AppError from "../middleware/errorHandler";

export const updateBlockService = async ({ type, properties, id }: updateBlocksTableType) => {
  try {
    const updatedBlock = db.update(blocksTable).set({ properties: properties, type }).where(eq(blocksTable.id, id)).returning();
    return updatedBlock;
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};

export const deleteBlockService = async (id: string) => {
  try {
    const deletedBlock = db.delete(blocksTable).where(eq(blocksTable.id, id)).returning();
    return deletedBlock;
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};
