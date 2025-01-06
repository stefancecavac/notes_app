/*
  Warnings:

  - Added the required column `order` to the `TextModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextModule" ADD COLUMN     "order" INTEGER NOT NULL;
