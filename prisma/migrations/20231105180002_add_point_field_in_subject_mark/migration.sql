/*
  Warnings:

  - A unique constraint covering the columns `[classId,studentId,subjectId,examType]` on the table `subject_mark` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subject_mark" ADD COLUMN     "point" DOUBLE PRECISION DEFAULT 0.00;

-- CreateIndex
CREATE UNIQUE INDEX "subject_mark_classId_studentId_subjectId_examType_key" ON "subject_mark"("classId", "studentId", "subjectId", "examType");
