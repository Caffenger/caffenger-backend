/*
  Warnings:

  - You are about to drop the column `menuId` on the `MenuItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_menuId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "menuId";

-- CreateTable
CREATE TABLE "MenuEntry" (
    "menuId" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,

    CONSTRAINT "MenuEntry_pkey" PRIMARY KEY ("menuId","menuItemId")
);

-- AddForeignKey
ALTER TABLE "MenuEntry" ADD CONSTRAINT "MenuEntry_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuEntry" ADD CONSTRAINT "MenuEntry_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
