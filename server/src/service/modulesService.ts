import { db } from "../db";
import AppError from "../middleware/errorHandler";
import { createModulesData, moduleData, modulesTable } from "../db/schema/modules";
import { and, eq } from "drizzle-orm";

export const createModuleService = async ({ noteId, type, properties, order }: createModulesData) => {
  try {
    const createdModule = await db.insert(modulesTable).values({ noteId, type, properties, order }).returning();
    return createdModule[0];
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

export const deleteModuleService = async ({ moduleId, noteId }: { moduleId: string; noteId: string }) => {
  try {
    const deletedModule = db
      .delete(modulesTable)
      .where(and(eq(modulesTable.id, moduleId), eq(modulesTable.noteId, noteId)))
      .returning();
    return deletedModule;
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};

export const updateModuleOrderService = async ({ modules }: { modules: moduleData[] }) => {
  try {
    let reorderedModules = [];
    for (const module of modules) {
      const moduleOrderUpdated = await db.update(modulesTable).set({ order: module.order }).where(eq(modulesTable.id, module.id)).returning();

      reorderedModules.push(moduleOrderUpdated[0]);
    }

    return reorderedModules;
  } catch (error) {
    console.log(error);
    throw new AppError("Database error", 500);
  }
};
