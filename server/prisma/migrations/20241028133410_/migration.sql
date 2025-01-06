/*
  Warnings:

  - You are about to drop the column `favorite` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "favorite",
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false;
