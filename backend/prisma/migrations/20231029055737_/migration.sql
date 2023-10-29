-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "reputation" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "collectableName" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectable" (
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Collectable_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CollectableCount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "inventoryId" TEXT,
    "wishlistId" TEXT,
    "waresId" TEXT,

    CONSTRAINT "CollectableCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_AchievementToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChatsUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_collection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CampaignToCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_managers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_name_key" ON "Profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_name_key" ON "Achievement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collectable_name_key" ON "Collectable"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_name_key" ON "Campaign"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToProfile_AB_unique" ON "_AchievementToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToProfile_B_index" ON "_AchievementToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatsUsers_AB_unique" ON "_ChatsUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatsUsers_B_index" ON "_ChatsUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_collection_AB_unique" ON "_collection"("A", "B");

-- CreateIndex
CREATE INDEX "_collection_B_index" ON "_collection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToCollection_AB_unique" ON "_CampaignToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToCollection_B_index" ON "_CampaignToCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_managers_AB_unique" ON "_managers"("A", "B");

-- CreateIndex
CREATE INDEX "_managers_B_index" ON "_managers"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_collectableName_fkey" FOREIGN KEY ("collectableName") REFERENCES "Collectable"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectableCount" ADD CONSTRAINT "CollectableCount_name_fkey" FOREIGN KEY ("name") REFERENCES "Collectable"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectableCount" ADD CONSTRAINT "CollectableCount_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectableCount" ADD CONSTRAINT "CollectableCount_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectableCount" ADD CONSTRAINT "CollectableCount_waresId_fkey" FOREIGN KEY ("waresId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsUsers" ADD CONSTRAINT "_ChatsUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsUsers" ADD CONSTRAINT "_ChatsUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_A_fkey" FOREIGN KEY ("A") REFERENCES "Collectable"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCollection" ADD CONSTRAINT "_CampaignToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCollection" ADD CONSTRAINT "_CampaignToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_managers" ADD CONSTRAINT "_managers_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_managers" ADD CONSTRAINT "_managers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
