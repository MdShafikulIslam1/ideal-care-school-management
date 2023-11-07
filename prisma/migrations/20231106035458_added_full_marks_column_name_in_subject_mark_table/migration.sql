/*
  Warnings:

  - Made the column `examType` on table `subject_mark` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "subject_mark" ADD COLUMN     "fullMarks" INTEGER DEFAULT 100,
ALTER COLUMN "examType" SET NOT NULL;
