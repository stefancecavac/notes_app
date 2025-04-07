import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
});
export type userData = z.infer<typeof userSchema>;

export const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  textColor: z.string(),
  backgroundColor: z.string(),
});
export type tagData = z.infer<typeof tagSchema>;

export const textModuleSchema = z.object({
  id: z.string(),
  content: z.string(),
  moduleId: z.string(),
  type: z.literal("TEXT"),
});

export const imageModuleSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  moduleId: z.string(),
  type: z.literal("IMAGE"),
});

export const toDoModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  priority: z.string(),
  moduleId: z.string(),
  type: z.literal("TODO"),
});

export const drawingModuleSchema = z.object({
  id: z.string(),
  data: z.string(),
  moduleId: z.string(),
  type: z.literal("DRAWING"),
});

export const moduleSchema = z.object({
  id: z.string(),
  type: z.union([z.literal("TEXT"), z.literal("IMAGE"), z.literal("TODO"), z.literal("DRAWING")]),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  noteId: z.string(),
  textModule: textModuleSchema.optional(),
  imageModule: imageModuleSchema.optional(),
  TodoModule: z.array(toDoModuleSchema).optional(),
  DrawingModule: drawingModuleSchema.optional(),
});

export type NotesData = {
  id: string;
  noteTitle?: string;
  noteIcon?: string;
  noteColor?: string;
  isFavourite: boolean;
  isThrashed: boolean;
  modules: z.infer<typeof moduleSchema>[];
  tags?: z.infer<typeof tagSchema>[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  trashedAt: Date | null;
  parentNoteId: string;
  childNotes?: NotesData[];
  breadCrumbs?: { id: string; noteTitle: string; noteIcon: string }[];
};

export const notesSchema: z.ZodType<NotesData> = z.lazy(() =>
  z.object({
    id: z.string(),
    noteTitle: z.string().default("New note"),
    noteColor: z.string().default(""),
    noteIcon: z.string().default(""),
    isFavourite: z.boolean(),
    isThrashed: z.boolean(),
    modules: z.array(moduleSchema),
    tags: z.array(tagSchema).default([]),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string(),
    trashedAt: z.date().nullable(),
    parentNoteId: z.string(),
    childNotes: z.array(notesSchema).default([]),
    breadCrumbs: z
      .array(
        z.object({
          id: z.string(),
          noteTitle: z.string(),
          noteIcon: z.string(),
        })
      )
      .default([]),
  })
);

export const updateDataSchema = z.object({
  noteTitle: z.string().optional(),
  noteColor: z.string().default("").optional(),
  noteIcon: z.string().default("").optional(),
});
export type UpdateData = z.infer<typeof updateDataSchema>;

export type textModuleData = z.infer<typeof textModuleSchema>;
export type todoModuleData = z.infer<typeof toDoModuleSchema>;
export type moduleData = z.infer<typeof moduleSchema>;
export type noteData = z.infer<typeof notesSchema>;
