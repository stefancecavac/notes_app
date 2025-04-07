import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema/users";

export const createIfDoesntExistUserService = async (email: string) => {
  let user = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (!user[0]) {
    user = await db.insert(usersTable).values({ email: email }).returning();
    return user[0];
  } else {
    return user[0];
  }
};

export const getUserByIdService = async (userId: string) => {
  const currentUser = await db.select().from(usersTable).where(eq(usersTable.id, userId));
  return currentUser[0];
};
