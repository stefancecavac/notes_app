import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { notesTable } from "../db/schema/notes";

export const getAllFavouriteNotesService = async (userId: string) => {
  const favouriteNotes = await db
    .select()
    .from(notesTable)
    .where(and(eq(notesTable.userId, userId), eq(notesTable.isFavourite, true), eq(notesTable.isThrashed, false)));

  return favouriteNotes;
};

export const favouriteOrUnfavouriteNoteService = async (noteId: string) => {
  const favouritedNote = await db.select().from(notesTable).where(eq(notesTable.id, noteId)).limit(1);

  if (favouritedNote[0].isFavourite === true) {
    const unfavouriteNote = await db.update(notesTable).set({ isFavourite: false }).where(eq(notesTable.id, noteId)).returning();
    return unfavouriteNote[0];
  } else {
    const favouriteNote = await db.update(notesTable).set({ isFavourite: true }).where(eq(notesTable.id, noteId)).returning();
    return favouriteNote[0];
  }
};
