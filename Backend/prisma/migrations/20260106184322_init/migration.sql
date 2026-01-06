/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_sessionId_key" ON "Order"("sessionId");
