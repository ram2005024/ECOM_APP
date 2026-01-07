/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderStatus";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "orderStatus" TEXT DEFAULT 'order placed';
