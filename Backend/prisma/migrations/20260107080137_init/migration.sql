/*
  Warnings:

  - The `orderStatus` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "OrderItemStatus" AS ENUM ('ORDER_PLACED', 'DELIVERED', 'SHIPPEN', 'CONFIRMED', 'CANCELLED', 'RETURNED');

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderStatus",
ADD COLUMN     "orderStatus" "OrderItemStatus" NOT NULL DEFAULT 'ORDER_PLACED';
