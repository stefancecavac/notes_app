import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { notesTable } from "../db/schema/notes";
import AppError from "../middleware/errorHandler";
import { usersTable } from "../db/schema/users";

export const getAllRecycleBinNoteService = async (userId: string) => {
  try {
    const notesInRecycleBin = await db
      .select()
      .from(notesTable)
      .where(and(eq(notesTable.userId, userId), eq(notesTable.isThrashed, true)));

    return notesInRecycleBin;
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const moveToRecycleBinService = async ({ userId, noteId }: { userId: string; noteId: string }) => {
  try {
    await db
      .update(notesTable)
      .set({ isThrashed: true })
      .where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)));

    const getChildrens = async (noteId: string) => {
      let childrensArray: string[] = [];

      const findChildrens = async (parentId: string) => {
        const childrens = await db.select().from(notesTable).where(eq(notesTable.parentNoteId, parentId));

        childrens.forEach((child) => childrensArray.push(child.id));

        for (const child of childrens) {
          await findChildrens(child.id);
        }
      };
      await findChildrens(noteId);

      return childrensArray;
    };

    const childrens = await getChildrens(noteId);
    if (childrens.length > 0) {
      await db.update(notesTable).set({ isThrashed: true }).where(inArray(notesTable.id, childrens));
    }
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const restoreFromRecyclebinService = async ({ userId, noteId }: { userId: string; noteId: string }) => {
  try {
    await db.update(notesTable).set({ isThrashed: false }).where(eq(notesTable.id, noteId));

    const getChildrens = async (noteId: string) => {
      let childrensArray: string[] = [];

      const findChildrens = async (parentId: string) => {
        const childrens = await db.select().from(notesTable).where(eq(notesTable.parentNoteId, parentId));

        childrens.forEach((child) => childrensArray.push(child.id));

        for (const child of childrens) {
          await findChildrens(child.id);
        }
      };
      await findChildrens(noteId);

      return childrensArray;
    };

    const childrens = await getChildrens(noteId);
    if (childrens.length > 0) {
      await db
        .update(notesTable)
        .set({ isThrashed: false })
        .where(and(inArray(notesTable.id, childrens), eq(notesTable.userId, userId)));
    }
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};

export const deleteFromRecycleBinService = async ({ userId, noteId }: { userId: string; noteId: string }) => {
  try {
    await db.delete(notesTable).where(and(eq(notesTable.id, noteId), eq(notesTable.userId, userId)));
  } catch (error) {
    throw new AppError("Database error", 500);
  }
};
