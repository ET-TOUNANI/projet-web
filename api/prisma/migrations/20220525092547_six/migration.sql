-- DropIndex
DROP INDEX `commentaire_postId_fkey` ON `commentaire`;

-- CreateTable
CREATE TABLE `_TagToPost` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToPost_AB_unique`(`A`, `B`),
    INDEX `_TagToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `commentaire` ADD CONSTRAINT `commentaire_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `article`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD CONSTRAINT `_TagToPost_A_fkey` FOREIGN KEY (`A`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD CONSTRAINT `_TagToPost_B_fkey` FOREIGN KEY (`B`) REFERENCES `categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
