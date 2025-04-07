import { and, asc, eq } from "drizzle-orm";
import { db } from "../db";
import { notesTable } from "../db/schema/notes";
import AppError from "../middleware/errorHandler";

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
    const noteResult = await db.select().from(notesTable).where(eq(notesTable.id, noteId));

    const note = noteResult[0];

    if (!note) {
      return null;
    }

    const breadCrumbs: { id: string; noteTitle: string; noteIcon: string }[] = [];

    let currentParentId = note.parentNoteId;

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

    return {
      ...note,
      breadCrumbs,
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
