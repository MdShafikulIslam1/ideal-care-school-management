/*
  Warnings:

  - A unique constraint covering the columns `[superAdminId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "superAdminId" TEXT;

-- CreateTable
CREATE TABLE "super_admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "profileImage" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "super_admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_id_key" ON "super_admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_superAdminId_key" ON "user"("superAdminId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "super_admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
