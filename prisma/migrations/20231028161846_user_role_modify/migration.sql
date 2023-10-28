/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `residentialCategory` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "User_Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN', 'GUARDIAN');

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "residentialCategory" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "User_Role" NOT NULL DEFAULT 'STUDENT';
