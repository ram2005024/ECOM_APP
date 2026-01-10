-- CreateTable
CREATE TABLE "SubscriptionDetail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "planId" TEXT,
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "SubscriptionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubscriptionDetail" ADD CONSTRAINT "SubscriptionDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
