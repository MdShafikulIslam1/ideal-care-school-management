/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "class_title_key" ON "class"("title");
