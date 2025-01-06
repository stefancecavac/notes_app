/*
  Warnings:

  - You are about to drop the column `textModuleId` on the `Module` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleId]` on the table `TextModule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleId` to the `TextModule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_textModuleId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "textModuleId";

-- AlterTable
ALTER TABLE "TextModule" ADD COLUMN     "moduleId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TextModule_moduleId_key" ON "TextModule"("moduleId");

-- AddForeignKey
ALTER TABLE "TextModule" ADD CONSTRAINT "TextModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
