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

// export const textModuleSchema = z.object({
//   id: z.string(),
//   content: z.string(),
//   moduleId: z.string(),
//   type: z.literal("TEXT"),
// });

// export const imageModuleSchema = z.object({
//   id: z.string(),
//   imageUrl: z.string(),
//   width: z.number(),
//   height: z.number(),
//   moduleId: z.string(),
//   type: z.literal("IMAGE"),
// });

// export const toDoModuleSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   completed: z.boolean(),
//   priority: z.string(),
//   moduleId: z.string(),
//   type: z.literal("TODO"),
// });

// export const drawingModuleSchema = z.object({
//   id: z.string(),
//   data: z.string(),
//   moduleId: z.string(),
//   type: z.literal("DRAWING"),
// });

const typeEnum = z.enum(["text", "image", "to-do", "drawing"], { message: "Invalid type" });

export const modulesTableSchema = z.object({
  id: z.string({ message: "Id required" }),
  type: typeEnum,
  properties: z.record(z.any(), { message: "Invalid properties" }),
  order: z.number(),
  noteId: z.string({ message: "Note id required" }).uuid({ message: "Not a valid UUID" }),
});

export const createModulesSchema = z.discriminatedUnion("type", [
  z.object({
    moduleId: z.string().optional(),
    type: z.literal("text"),
    order: z.number().optional(),
    noteId: z.string().uuid(),
    properties: z.object({
      content: z.string(),
    }),
  }),
  z.object({
    moduleId: z.string().optional(),
    type: z.literal("image"),
    order: z.number().optional(),
    noteId: z.string().uuid(),
    properties: z.object({
      imageUrl: z.string().url(),
      width: z.number(),
      height: z.number(),
    }),
  }),
  z.object({
    moduleId: z.string().optional(),
    type: z.literal("to-do"),
    order: z.number().optional(),
    noteId: z.string().uuid(),
    properties: z.object({
      items: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          completed: z.boolean(),
        })
      ),
    }),
  }),
  z.object({
    moduleId: z.string().optional(),
    type: z.literal("drawing"),
    order: z.number().optional(),
    noteId: z.string().uuid(),
    properties: z.object({
      data: z.string(),
    }),
  }),
]);

export type CreateModuleData = z.infer<typeof createModulesSchema>;

export type NotesData = {
  id: string;
  noteTitle?: string;
  noteIcon?: string;
  noteColor?: string;
  isFavourite: boolean;
  isThrashed: boolean;
  modules: z.infer<typeof modulesTableSchema>[];
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
    modules: z.array(modulesTableSchema),
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

// export type textModuleData = z.infer<typeof textModuleSchema>;
// export type todoModuleData = z.infer<typeof toDoModuleSchema>;
export type moduleData = z.infer<typeof modulesTableSchema>;
export type noteData = z.infer<typeof notesSchema>;
