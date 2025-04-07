import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
