-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "comment" TEXT,
    "rating" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
