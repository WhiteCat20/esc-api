-- AlterTable
ALTER TABLE `user` ADD COLUMN `attendanceId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_attendanceId_fkey` FOREIGN KEY (`attendanceId`) REFERENCES `Attendance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
