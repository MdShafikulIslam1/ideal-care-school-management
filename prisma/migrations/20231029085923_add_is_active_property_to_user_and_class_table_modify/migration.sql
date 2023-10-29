-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "class" ADD COLUMN     "addmitedStudent" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxCapacity" INTEGER NOT NULL DEFAULT 30;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
