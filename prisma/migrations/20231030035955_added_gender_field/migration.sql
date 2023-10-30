/*
  Warnings:

  - Added the required column `gender` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHERS');

-- CreateEnum
CREATE TYPE "GuardianRelation" AS ENUM ('FATHER', 'MOTHER', 'LOCALGUARDIAN');

-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "guardian" ADD COLUMN     "relation" "GuardianRelation" NOT NULL DEFAULT 'FATHER';

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "gender" "Gender" NOT NULL;
