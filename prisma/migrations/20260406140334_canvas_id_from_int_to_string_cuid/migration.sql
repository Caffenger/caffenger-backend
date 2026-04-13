/*
  Warnings:

  - The primary key for the `Canvas` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CafeObject" DROP CONSTRAINT "CafeObject_canvasId_fkey";

-- AlterTable
ALTER TABLE "CafeObject" ALTER COLUMN "canvasId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Canvas" DROP CONSTRAINT "Canvas_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Canvas_id_seq";

-- AddForeignKey
ALTER TABLE "CafeObject" ADD CONSTRAINT "CafeObject_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
