/*
  Warnings:

  - Added the required column `updatedAt` to the `subject_teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('FRIST_SEMESTER', 'SECOND_SEMESTER', 'THIRD_SEMESTER', 'FINAL');

-- AlterTable
ALTER TABLE "subject_teacher" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "subject_mark" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "marks" INTEGER,
    "grade" TEXT,
    "examType" "ExamType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_mark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subject_mark" ADD CONSTRAINT "subject_mark_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_mark" ADD CONSTRAINT "subject_mark_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
