/*
  Warnings:

  - You are about to drop the column `nom` on the `categorie` table. All the data in the column will be lost.
  - You are about to drop the `_TagToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categorId` to the `article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_TagToPost` DROP FOREIGN KEY `_TagToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TagToPost` DROP FOREIGN KEY `_TagToPost_B_fkey`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `categorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categorie` DROP COLUMN `nom`;

-- DropTable
DROP TABLE `_TagToPost`;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_categorId_fkey` FOREIGN KEY (`categorId`) REFERENCES `categorie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
