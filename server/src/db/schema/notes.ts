import { date } from "drizzle-orm/mysql-core";
import { AnyPgColumn, boolean, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const notesTable = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  noteTitle: varchar("note_title", { length: 255 }).notNull(),
  noteIcon: varchar("note_icon").notNull().default(""),
  noteColor: varchar("note_color", { length: 255 }).notNull().default(""),

  isFavourite: boolean().default(false),
  isThrashed: boolean().default(false),

  userId: uuid("userId").references(() => usersTable.id, { onDelete: "cascade" }),

  parentNoteId: uuid("parent_note_id").references((): AnyPgColumn => notesTable.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date().toISOString()),
});

export const notesTableSchema = z.object({
  id: z.string({ message: "Note id required" }).uuid({ message: "Not a valid uuid" }),
  noteTitle: z.string({ message: "Note title required" }).max(255, { message: "255 maximum characters allowed" }),
  blocks: z.array(z.object({})),
  createdAt: z.string(),
  updatedAt: z.string(),
});
