/*
  Warnings:

  - You are about to drop the `applicant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nrp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_telp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_telp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nrp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bukti_pembayaran` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `no_telp` VARCHAR(191) NOT NULL,
    ADD COLUMN `nrp` VARCHAR(191) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userpreference` ADD COLUMN `bukti_pembayaran` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `applicant`;

-- CreateIndex
CREATE UNIQUE INDEX `User_nrp_key` ON `User`(`nrp`);

-- CreateIndex
CREATE UNIQUE INDEX `User_no_telp_key` ON `User`(`no_telp`);
