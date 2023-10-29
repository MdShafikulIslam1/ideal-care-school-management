/*
  Warnings:

  - You are about to drop the column `isPasswordChange` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `passwordChangeDate` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `isPasswordChange` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `passwordChangeDate` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `isPasswordChange` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `passwordChangeDate` on the `teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "isPasswordChange",
DROP COLUMN "passwordChangeDate";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "isPasswordChange",
DROP COLUMN "passwordChangeDate";

-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "isPasswordChange",
DROP COLUMN "passwordChangeDate";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isPasswordChange" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "passwordChangeDate" TIMESTAMP(3);
