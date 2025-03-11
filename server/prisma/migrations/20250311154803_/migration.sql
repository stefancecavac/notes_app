/*
  Warnings:

  - You are about to drop the column `content` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "content",
DROP COLUMN "data";

-- CreateTable
CREATE TABLE "TextModule" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "TextModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageModule" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "ImageModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Task',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "TodoModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrawingModule" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "DrawingModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextModule_moduleId_key" ON "TextModule"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "ImageModule_moduleId_key" ON "ImageModule"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "DrawingModule_moduleId_key" ON "DrawingModule"("moduleId");

-- AddForeignKey
ALTER TABLE "TextModule" ADD CONSTRAINT "TextModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageModule" ADD CONSTRAINT "ImageModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoModule" ADD CONSTRAINT "TodoModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawingModule" ADD CONSTRAINT "DrawingModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
