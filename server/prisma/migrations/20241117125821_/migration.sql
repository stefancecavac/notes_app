-- AlterTable
ALTER TABLE "LinkModule" ALTER COLUMN "parentNoteId" DROP NOT NULL,
ALTER COLUMN "childNoteId" DROP NOT NULL;
