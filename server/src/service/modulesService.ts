import { db } from "../db";
import AppError from "../middleware/errorHandler";
import { createModulesData, modulesTable } from "../db/schema/modules";
import { eq } from "drizzle-orm";

export const createModuleService = async ({ noteId, type, properties, order }: createModulesData) => {
  try {
    const createdModule = await db.insert(modulesTable).values({ noteId, type, properties, order }).returning();
    return createdModule;
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};

export const updateModuleService = async ({ moduleId, properties }: { moduleId: string; properties: string }) => {
  try {
    const module = await db.update(modulesTable).set({ properties: properties }).where(eq(modulesTable.id, moduleId)).returning();

    return module[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};

// export const deleteBlockService = async (id: string) => {
//   try {
//     const deletedBlock = db.delete(blocksTable).where(eq(blocksTable.id, id)).returning();
//     return deletedBlock;
//   } catch (error) {
//     console.log(error);
//     throw new AppError("Database error", 500);
//   }
// };
