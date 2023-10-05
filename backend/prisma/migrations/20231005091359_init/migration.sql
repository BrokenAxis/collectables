/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collectable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AchievementToProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_wares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_senderId_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_revieweeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_collectableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AchievementToProfile" DROP CONSTRAINT "_AchievementToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AchievementToProfile" DROP CONSTRAINT "_AchievementToProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_collection" DROP CONSTRAINT "_collection_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_collection" DROP CONSTRAINT "_collection_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wares" DROP CONSTRAINT "_wares_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wares" DROP CONSTRAINT "_wares_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wishlist" DROP CONSTRAINT "_wishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wishlist" DROP CONSTRAINT "_wishlist_B_fkey";

-- DropTable
DROP TABLE "public"."Achievement";

-- DropTable
DROP TABLE "public"."Chat";

-- DropTable
DROP TABLE "public"."Collectable";

-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."Trade";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_AchievementToProfile";

-- DropTable
DROP TABLE "public"."_collection";

-- DropTable
DROP TABLE "public"."_wares";

-- DropTable
DROP TABLE "public"."_wishlist";

-- DropEnum
DROP TYPE "public"."Role";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collectable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "collectableId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_collection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_wishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_wares" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AchievementToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_collection_AB_unique" ON "_collection"("A", "B");

-- CreateIndex
CREATE INDEX "_collection_B_index" ON "_collection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_wishlist_AB_unique" ON "_wishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_wishlist_B_index" ON "_wishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_wares_AB_unique" ON "_wares"("A", "B");

-- CreateIndex
CREATE INDEX "_wares_B_index" ON "_wares"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToProfile_AB_unique" ON "_AchievementToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToProfile_B_index" ON "_AchievementToProfile"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_collectableId_fkey" FOREIGN KEY ("collectableId") REFERENCES "Collectable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_receiverId_fkey" FOREIGN KEY ("senderId", "receiverId") REFERENCES "Chat"("senderId", "receiverId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_A_fkey" FOREIGN KEY ("A") REFERENCES "Collectable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlist" ADD CONSTRAINT "_wishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Collectable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlist" ADD CONSTRAINT "_wishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wares" ADD CONSTRAINT "_wares_A_fkey" FOREIGN KEY ("A") REFERENCES "Collectable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wares" ADD CONSTRAINT "_wares_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
