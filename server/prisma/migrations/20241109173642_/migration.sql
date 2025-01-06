/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_collectionId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "collectionId",
DROP COLUMN "content";

-- DropTable
DROP TABLE "Collection";

-- CreateTable
CREATE TABLE "TextModule" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TextModule_pkey" PRIMARY KEY ("id")
);
