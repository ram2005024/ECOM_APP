-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userID_fkey";

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
