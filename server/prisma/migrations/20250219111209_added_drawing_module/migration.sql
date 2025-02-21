-- AlterTable
ALTER TABLE "TodoModule" ALTER COLUMN "priority" SET DEFAULT 'medium';

-- CreateTable
CREATE TABLE "DrawingModule" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "DrawingModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrawingModule_moduleId_key" ON "DrawingModule"("moduleId");

-- AddForeignKey
ALTER TABLE "DrawingModule" ADD CONSTRAINT "DrawingModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
