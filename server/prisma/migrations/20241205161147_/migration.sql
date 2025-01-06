-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_parentNoteId_fkey";

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "icon" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_parentNoteId_fkey" FOREIGN KEY ("parentNoteId") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
