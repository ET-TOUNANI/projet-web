/*
  Warnings:

  - The primary key for the `categorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `categorie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `article_categorId_fkey`;

-- AlterTable
ALTER TABLE `article` MODIFY `categorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `categorie` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_categorId_fkey` FOREIGN KEY (`categorId`) REFERENCES `categorie`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
