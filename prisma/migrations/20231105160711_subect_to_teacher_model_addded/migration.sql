-- CreateTable
CREATE TABLE "subject_teacher" (
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "subject_teacher_pkey" PRIMARY KEY ("subjectId","teacherId")
);

-- AddForeignKey
ALTER TABLE "subject_teacher" ADD CONSTRAINT "subject_teacher_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher" ADD CONSTRAINT "subject_teacher_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
