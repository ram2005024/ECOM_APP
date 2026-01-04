-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plusMember" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "coupens" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "maxCartValue" INTEGER,
    "discountType" TEXT NOT NULL DEFAULT 'percentage',
    "discountValue" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "forPlus" BOOLEAN NOT NULL DEFAULT false,
    "maxDiscount" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "coupens_pkey" PRIMARY KEY ("id")
);
