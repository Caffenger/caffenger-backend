/*
  Warnings:

  - A unique constraint covering the columns `[cafeFloorId]` on the table `Canvas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Canvas_cafeFloorId_key" ON "Canvas"("cafeFloorId");
