/*
  Warnings:

  - You are about to drop the column `priority` on the `TodoModule` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TodoModule" DROP COLUMN "priority";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
