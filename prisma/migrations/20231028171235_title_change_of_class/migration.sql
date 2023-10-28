/*
  Warnings:

  - Changed the type of `title` on the `class` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Class_Name" AS ENUM ('PLAY', 'NURSERY', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');

-- DropIndex
DROP INDEX "class_title_key";

-- AlterTable
ALTER TABLE "class" DROP COLUMN "title",
ADD COLUMN     "title" "Class_Name" NOT NULL;
