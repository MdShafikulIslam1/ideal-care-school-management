/*
  Warnings:

  - Made the column `year` on table `student_result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "student_result" ALTER COLUMN "year" SET NOT NULL;
