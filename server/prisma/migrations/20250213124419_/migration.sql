/*
  Warnings:

  - Added the required column `height` to the `ImageModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `ImageModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `ImageModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageModule" ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "width" TEXT NOT NULL;
