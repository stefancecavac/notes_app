/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TextModule` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `TextModule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TextModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TextModule" DROP COLUMN "createdAt",
DROP COLUMN "order",
DROP COLUMN "updatedAt";
