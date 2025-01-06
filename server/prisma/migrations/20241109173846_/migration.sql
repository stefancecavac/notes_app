-- AlterTable
ALTER TABLE "TextModule" ADD COLUMN     "noteId" TEXT;

-- AddForeignKey
ALTER TABLE "TextModule" ADD CONSTRAINT "TextModule_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
