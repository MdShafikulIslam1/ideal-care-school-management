-- CreateTable
CREATE TABLE "guardian" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "childId" TEXT NOT NULL,
    "childPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guardian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "guardian_phoneNumber_key" ON "guardian"("phoneNumber");

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_childId_fkey" FOREIGN KEY ("childId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
