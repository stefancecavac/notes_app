import { doublePrecision, jsonb, numeric, pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";
import { notesTable } from "./notes";
import { z } from "zod";

export const typeEnum = pgEnum("type", ["text", "image", "to-do", "paragraph", "drawing"]);

export const modulesTable = pgTable("modules", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  type: typeEnum().notNull(),
  properties: jsonb().notNull(),
  order: doublePrecision("order").notNull().default(0),

  noteId: uuid("noteId").references(() => notesTable.id, { onDelete: "cascade" }),
});

const zodTypeEnum = z.enum(["text", "image", "to-do", "paragraph", "drawing"], { message: "Invalid type" });

export const modulesTableSchema = z.object({
  id: z.string({ message: "Id required" }),
  type: zodTypeEnum,
  properties: z.record(z.any(), { message: "Invalid properties" }),
  order: z.number().default(0),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});
export type moduleData = z.infer<typeof modulesTableSchema>;

export const createModulesSchema = z.object({
  type: zodTypeEnum,
  order: z.number().default(0),
  properties: z.record(z.any(), { message: "Invalid properties" }),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});

export type createModulesData = z.infer<typeof createModulesSchema>;

export const updateModuleSchema = z.object({
  type: zodTypeEnum,
  properties: z.record(z.any(), { message: "Invalid properties" }),
  id: z.string({ message: "Id required" }),
});
export type updateModulesData = z.infer<typeof updateModuleSchema>;
