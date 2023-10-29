/*
  Warnings:

  - A unique constraint covering the columns `[guardianId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "guardianId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_guardianId_key" ON "user"("guardianId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardian"("phoneNumber") ON DELETE SET NULL ON UPDATE CASCADE;
