/*
  Warnings:

  - The `orderStatus` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderStatus",
ADD COLUMN     "orderStatus" TEXT NOT NULL DEFAULT 'ORDER_PLACED';

-- DropEnum
DROP TYPE "OrderItemStatus";
