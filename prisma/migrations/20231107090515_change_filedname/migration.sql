/*
  Warnings:

  - You are about to drop the column `fullMarks` on the `subject_marks` table. All the data in the column will be lost.
  - You are about to drop the column `marks` on the `subject_marks` table. All the data in the column will be lost.
  - Added the required column `obtainMark` to the `subject_marks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject_marks" DROP COLUMN "fullMarks",
DROP COLUMN "marks",
ADD COLUMN     "fullMark" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "obtainMark" INTEGER NOT NULL;
