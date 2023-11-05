/*
  Warnings:

  - Added the required column `classId` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "subject_title_key";

-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "classId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
