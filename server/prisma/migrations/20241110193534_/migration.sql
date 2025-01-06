/*
  Warnings:

  - You are about to drop the column `noteId` on the `TextModule` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('TEXT', 'IMAGE', 'TODO');

-- DropForeignKey
ALTER TABLE "TextModule" DROP CONSTRAINT "TextModule_noteId_fkey";

-- AlterTable
ALTER TABLE "TextModule" DROP COLUMN "noteId";

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "type" "ModuleType" NOT NULL,
    "order" DOUBLE PRECISION NOT NULL,
    "noteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "textModuleId" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_textModuleId_fkey" FOREIGN KEY ("textModuleId") REFERENCES "TextModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
