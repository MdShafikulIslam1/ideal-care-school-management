/*
  Warnings:

  - Added the required column `classId` to the `subject_mark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject_mark" ADD COLUMN     "classId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subject_mark" ADD CONSTRAINT "subject_mark_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
