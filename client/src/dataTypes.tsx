import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
});

export type userData = z.infer<typeof userSchema>;

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  textColor: z.string().default("").optional(),
  backgroundColor: z.string().default("").optional(),
});

export type tagData = z.infer<typeof tagSchema>;

export const textModuleSchema = z.object({
  id: z.string(),
  content: z.string(),
  moduleId: z.string(),
  type: z.literal("TEXT"),
});

export const moduleSchema = z.object({
  id: z.string(),
  type: z.union([z.literal("TEXT"), z.literal("PAGE_LINK"), z.literal("TODO")]),
  order: z.number(),
  createdAt: z.date(),
  textModule: textModuleSchema.optional(),

  noteId: z.string(),
  updatedAt: z.date(),
});

// Note schema
export const noteSchema = z.object({
  id: z.string(),
  title: z.string().default("New note"),
  content: z.string().default(""),
  color: z.string().default(""),
  icon: z.string().default(""),
  favourite: z.boolean().default(false),
  inTrash: z.boolean().default(false),
  modules: z.array(moduleSchema),
  tags: z.array(tagSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  trashedAt: z.date().nullable(),
  parentNoteId: z.string(),
  childNotes: z.array(z.object({ id: z.string(), title: z.string(), icon: z.string() })),
  breadCrumbs: z.array(z.object({ noteId: z.string(), noteTitle: z.string(), icon: z.string() })),
});

// Define the types
export type textModuleData = z.infer<typeof textModuleSchema>;
export type moduleData = z.infer<typeof moduleSchema>;
export type noteData = z.infer<typeof noteSchema>;
