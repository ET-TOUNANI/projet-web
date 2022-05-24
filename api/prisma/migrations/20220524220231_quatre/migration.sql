/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `article` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `article` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `commentaire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `content` on the `commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `commentaire` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `commentaire` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `commentaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writtenById` to the `commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `commentaire_email_key` ON `commentaire`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `updatedAt`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `commentaire` DROP PRIMARY KEY,
    DROP COLUMN `content`,
    DROP COLUMN `email`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `postId` INTEGER NOT NULL,
    ADD COLUMN `writtenById` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `passwrd` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_TagToPost` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToPost_AB_unique`(`A`, `B`),
    INDEX `_TagToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_writtenById_fkey` FOREIGN KEY (`writtenById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `article`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD CONSTRAINT `_TagToPost_A_fkey` FOREIGN KEY (`A`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD CONSTRAINT `_TagToPost_B_fkey` FOREIGN KEY (`B`) REFERENCES `categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
