/*
  Warnings:

  - You are about to drop the column `addmitedStudent` on the `class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "class" DROP COLUMN "addmitedStudent",
ADD COLUMN     "admittedStudent" INTEGER NOT NULL DEFAULT 0;
