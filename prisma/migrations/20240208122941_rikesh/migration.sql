-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "cardHolder" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
