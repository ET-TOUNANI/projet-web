/*
  Warnings:

  - You are about to drop the `_TagToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_TagToPost` DROP FOREIGN KEY `_TagToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TagToPost` DROP FOREIGN KEY `_TagToPost_B_fkey`;

-- DropForeignKey
ALTER TABLE `commentaire` DROP FOREIGN KEY `commentaire_postId_fkey`;

-- DropTable
DROP TABLE `_TagToPost`;
