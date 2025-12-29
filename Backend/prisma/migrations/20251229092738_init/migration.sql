-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "description" TEXT,
    "isApproved" TEXT DEFAULT 'pending',
    "storename" TEXT NOT NULL,
    "reasonForRejection" TEXT,
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userID_key" ON "Seller"("userID");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
