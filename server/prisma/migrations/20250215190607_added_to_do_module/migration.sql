-- CreateTable
CREATE TABLE "TodoModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New Task',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "TodoModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TodoModule" ADD CONSTRAINT "TodoModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
