/*
  Warnings:

  - You are about to drop the column `parentNoteId` on the `Note` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ModuleType" ADD VALUE 'PAGE_LINK';

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_parentNoteId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "parentNoteId";

-- CreateTable
CREATE TABLE "LinkModule" (
    "id" TEXT NOT NULL,
    "parentNoteId" TEXT NOT NULL,
    "childNoteId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "LinkModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkModule_parentNoteId_key" ON "LinkModule"("parentNoteId");

-- CreateIndex
CREATE UNIQUE INDEX "LinkModule_moduleId_key" ON "LinkModule"("moduleId");

-- AddForeignKey
ALTER TABLE "LinkModule" ADD CONSTRAINT "LinkModule_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkModule" ADD CONSTRAINT "LinkModule_childNoteId_fkey" FOREIGN KEY ("childNoteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkModule" ADD CONSTRAINT "LinkModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
