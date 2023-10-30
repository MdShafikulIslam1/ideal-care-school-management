/*
  Warnings:

  - The values [STUDENT,TEACHER,ADMIN,GUARDIAN] on the enum `User_Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "User_Role_new" AS ENUM ('student', 'teacher', 'admin', 'guardian');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "User_Role_new" USING ("role"::text::"User_Role_new");
ALTER TYPE "User_Role" RENAME TO "User_Role_old";
ALTER TYPE "User_Role_new" RENAME TO "User_Role";
DROP TYPE "User_Role_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'student';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'student';
