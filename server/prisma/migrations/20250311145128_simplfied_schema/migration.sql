/*
  Warnings:

  - You are about to drop the `DrawingModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodoModule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DrawingModule" DROP CONSTRAINT "DrawingModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ImageModule" DROP CONSTRAINT "ImageModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TextModule" DROP CONSTRAINT "TextModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TodoModule" DROP CONSTRAINT "TodoModule_moduleId_fkey";

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "data" JSONB NOT NULL;

-- DropTable
DROP TABLE "DrawingModule";

-- DropTable
DROP TABLE "ImageModule";

-- DropTable
DROP TABLE "TextModule";

-- DropTable
DROP TABLE "TodoModule";
