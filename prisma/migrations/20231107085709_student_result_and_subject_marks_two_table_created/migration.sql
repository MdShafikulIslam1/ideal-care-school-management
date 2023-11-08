/*
  Warnings:

  - You are about to drop the `subject_mark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subject_mark" DROP CONSTRAINT "subject_mark_classId_fkey";

-- DropForeignKey
ALTER TABLE "subject_mark" DROP CONSTRAINT "subject_mark_studentId_fkey";

-- DropForeignKey
ALTER TABLE "subject_mark" DROP CONSTRAINT "subject_mark_subjectId_fkey";

-- DropTable
DROP TABLE "subject_mark";

-- CreateTable
CREATE TABLE "student_result" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "examType" "ExamType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_marks" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "fullMarks" INTEGER DEFAULT 100,
    "marks" INTEGER,
    "grade" TEXT,
    "point" DOUBLE PRECISION DEFAULT 0.00,
    "studentResultId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_marks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_result" ADD CONSTRAINT "student_result_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_result" ADD CONSTRAINT "student_result_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_marks" ADD CONSTRAINT "subject_marks_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_marks" ADD CONSTRAINT "subject_marks_studentResultId_fkey" FOREIGN KEY ("studentResultId") REFERENCES "student_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
