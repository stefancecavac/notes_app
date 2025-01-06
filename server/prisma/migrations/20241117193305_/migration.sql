/*
  Warnings:

  - The values [PAGE_LINK] on the enum `ModuleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `LinkModule` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModuleType_new" AS ENUM ('TEXT', 'IMAGE', 'TODO');
ALTER TABLE "Module" ALTER COLUMN "type" TYPE "ModuleType_new" USING ("type"::text::"ModuleType_new");
ALTER TYPE "ModuleType" RENAME TO "ModuleType_old";
ALTER TYPE "ModuleType_new" RENAME TO "ModuleType";
DROP TYPE "ModuleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "LinkModule" DROP CONSTRAINT "LinkModule_childNoteId_fkey";

-- DropForeignKey
ALTER TABLE "LinkModule" DROP CONSTRAINT "LinkModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "LinkModule" DROP CONSTRAINT "LinkModule_parentNoteId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "parentNoteId" TEXT,
ALTER COLUMN "title" SET DEFAULT 'New note';

-- DropTable
DROP TABLE "LinkModule";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
