-- CreateTable
CREATE TABLE "ImageModule" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "ImageModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageModule_moduleId_key" ON "ImageModule"("moduleId");

-- AddForeignKey
ALTER TABLE "ImageModule" ADD CONSTRAINT "ImageModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
