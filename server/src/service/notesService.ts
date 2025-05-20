import { and, asc, eq, ilike } from "drizzle-orm";
import { db } from "../db";
import { notesTable } from "../db/schema/notes";
import AppError from "../middleware/errorHandler";
import { modulesTable } from "../db/schema/modules";

export const searchNotesService = async ({ userId, q }: { userId: string; q: string }) => {
  try {
    const filter =
      q.length > 1
        ? and(ilike(notesTable.noteTitle, q), and(eq(notesTable.userId, userId), eq(notesTable.isThrashed, false)))
        : and(eq(notesTable.userId, userId), eq(notesTable.isThrashed, false));

    const searchedNotes = await db.select().from(notesTable).where(filter).orderBy(asc(notesTable.createdAt));

    return searchedNotes;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const getAllNotesInTreeViewService = async (userId: string) => {
  try {
    const allNotes = await db
      .select()
      .from(notesTable)
      .where(and(eq(notesTable.userId, userId), eq(notesTable.isThrashed, false)))
      .orderBy(asc(notesTable.createdAt));

    const noteMap: Record<string, any[]> = {};
    for (const note of allNotes) {
      const parentId = note.parentNoteId || "root";
      if (!noteMap[parentId]) {
        noteMap[parentId] = [];
      }
      noteMap[parentId].push({ ...note, childNotes: [] });
    }

    const buildTree = (parentId: string): any[] => {
      return (noteMap[parentId] || []).map((note) => ({
        ...note,
        childNotes: buildTree(note.id),
      }));
    };

    const notesTree = buildTree("root");

    return notesTree;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const getAllNotesService = async (userId: string) => {
  try {
    const allNotes = await db
      .select()
      .from(notesTable)
      .where(and(eq(notesTable.userId, userId), eq(notesTable.isThrashed, false)))
      .orderBy(asc(notesTable.createdAt));

    return allNotes;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const getNoteByIdService = async (noteId: string) => {
  try {
    const noteResult = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, noteId))
      .leftJoin(modulesTable, eq(modulesTable.noteId, notesTable.id))
      .orderBy(asc(modulesTable.order))
      .groupBy(modulesTable.id, notesTable.id);

    const note = noteResult[0].notes;

    if (!note) {
      return null;
    }

    const breadCrumbs: { id: string; noteTitle: string; noteIcon: string }[] = [];

    let currentParentId = note.parentNoteId;
    breadCrumbs.unshift({ id: note.id, noteIcon: note.noteIcon, noteTitle: note.noteTitle });

    while (currentParentId) {
      const result = await db
        .select({ id: notesTable.id, noteTitle: notesTable.noteTitle, noteIcon: notesTable.noteIcon, parentNoteId: notesTable.parentNoteId })
        .from(notesTable)
        .where(eq(notesTable.id, currentParentId));

      const parent = result[0];

      if (!parent) break;

      breadCrumbs.unshift({
        id: parent.id,
        noteTitle: parent.noteTitle,
        noteIcon: parent.noteIcon,
      });

      currentParentId = parent.parentNoteId || null;
    }

    const modules = noteResult[0].modules ? noteResult.map((modules) => modules.modules) : [];

    const childNotes = await db
      .select({ noteTitle: notesTable.noteTitle, id: notesTable.id, noteIcon: notesTable.noteIcon })
      .from(notesTable)
      .where(and(eq(notesTable.parentNoteId, noteResult[0].notes.id), eq(notesTable.isThrashed, false)));

    return {
      ...note,
      modules,
      breadCrumbs,
      childNotes,
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const insertNoteIntoDbService = async ({
  noteTitle,
  noteColor,
  noteIcon,
  userId,
  parentNoteId,
}: {
  userId: string;
  noteTitle: string;
  noteColor: string;
  noteIcon: string;
  parentNoteId?: string;
}) => {
  try {
    const createdNote = await db.insert(notesTable).values({ noteTitle, noteColor, noteIcon, userId, parentNoteId }).returning();
    return createdNote[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const updateNoteService = async ({
  noteTitle,
  noteIcon,
  noteColor,
  id,
  userId,
}: {
  noteTitle: string;
  noteIcon: string;
  noteColor: string;
  id: string;
  userId: string;
}) => {
  try {
    const updatedNote = await db
      .update(notesTable)
      .set({ noteTitle, noteIcon, noteColor })
      .where(and(eq(notesTable.id, id), eq(notesTable.userId, userId)))
      .returning();
    return updatedNote[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const deleteNoteByIdService = async (noteId: string) => {
  try {
    const deletedNote = await db.delete(notesTable).where(eq(notesTable.id, noteId)).returning();
    return deletedNote;
  } catch (error) {
    throw new AppError("Database Error", 500);
  }
};

export const moveNoteByIdService = async ({ userId, noteId, parentNoteId }: { userId: string; noteId: string; parentNoteId: string }) => {
  try {
    const movedNote = await db
      .update(notesTable)
      .set({ parentNoteId })
      .where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)))
      .returning();

    return movedNote[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};

export const duplicateNoteService = async ({ userId, noteId }: { userId: string; noteId: string }) => {
  try {
    const noteToDuiplicate = await db.select().from(notesTable).where(eq(notesTable.id, noteId));

    const modulesToDupliate = await db.select().from(modulesTable).where(eq(modulesTable.noteId, noteId));

    console.log(modulesToDupliate);

    const duplicatedNote = await db
      .insert(notesTable)
      .values({
        userId: userId,
        noteTitle: `${noteToDuiplicate[0].noteTitle} copy`,
        noteColor: noteToDuiplicate[0].noteColor,
        noteIcon: noteToDuiplicate[0].noteIcon,
      })
      .returning();

    const newModules = modulesToDupliate.map((module) => ({
      noteId: duplicatedNote[0].id,
      type: module.type,
      properties: module.properties,
      order: module.order,
    }));

    await db.insert(modulesTable).values(newModules);

    return duplicatedNote[0];
  } catch (error) {
    console.log(error);
    throw new AppError("Database Error", 500);
  }
};
