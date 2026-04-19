/*
  Warnings:

  - A unique constraint covering the columns `[cafeObjectId]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Table_cafeObjectId_key" ON "Table"("cafeObjectId");
