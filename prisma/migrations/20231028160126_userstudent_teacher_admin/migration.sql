-- CreateEnum
CREATE TYPE "Department" AS ENUM ('SCIENCE', 'COMMERCE', 'HUMANITIES');

-- CreateEnum
CREATE TYPE "ResidentialCategory" AS ENUM ('RESIDENT', 'NON_RESIDENT');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "studentId" TEXT,
    "adminId" TEXT,
    "teacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "classRole" INTEGER,
    "fatherName" TEXT NOT NULL,
    "fatherContactNo" TEXT NOT NULL,
    "fatherOccupation" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherContactNo" TEXT NOT NULL,
    "motherOccupation" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "profileImage" TEXT,
    "isPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "passwordChangeDate" TIMESTAMP(3),
    "localGuardianName" TEXT NOT NULL,
    "localGuardianContactNo" TEXT NOT NULL,
    "department" "Department" DEFAULT 'SCIENCE',
    "residentialCategory" "ResidentialCategory" DEFAULT 'NON_RESIDENT',
    "classId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "profileImage" TEXT,
    "isPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "passwordChangeDate" TIMESTAMP(3),
    "managementDepartmentId" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "management_department" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "management_department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "emergencyContactNo" TEXT NOT NULL,
    "presentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "profileImage" TEXT,
    "isPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "passwordChangeDate" TIMESTAMP(3),
    "classTeacherId" TEXT NOT NULL,
    "educationalQualification" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_studentId_key" ON "user"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "user_adminId_key" ON "user"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "user_teacherId_key" ON "user"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "class_title_key" ON "class"("title");

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "management_department_title_key" ON "management_department"("title");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_id_key" ON "teacher"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_managementDepartmentId_fkey" FOREIGN KEY ("managementDepartmentId") REFERENCES "management_department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
