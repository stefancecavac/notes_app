/*
  Warnings:

  - You are about to drop the column `color` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "color",
ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "textColor" TEXT NOT NULL DEFAULT '';
