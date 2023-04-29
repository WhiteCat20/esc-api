-- AlterTable
ALTER TABLE `announcement` MODIFY `attachment` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `attendance` ADD COLUMN `status` ENUM('Hadir', 'TidakHadir') NOT NULL DEFAULT 'Hadir';
