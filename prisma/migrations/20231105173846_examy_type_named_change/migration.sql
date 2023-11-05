/*
  Warnings:

  - The values [FRIST_SEMESTER] on the enum `ExamType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamType_new" AS ENUM ('FIRST_SEMESTER', 'SECOND_SEMESTER', 'THIRD_SEMESTER', 'FINAL');
ALTER TABLE "subject_mark" ALTER COLUMN "examType" TYPE "ExamType_new" USING ("examType"::text::"ExamType_new");
ALTER TYPE "ExamType" RENAME TO "ExamType_old";
ALTER TYPE "ExamType_new" RENAME TO "ExamType";
DROP TYPE "ExamType_old";
COMMIT;
