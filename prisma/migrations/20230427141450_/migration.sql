-- CreateTable
CREATE TABLE `Applicant` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nrp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bukti_pembayaran` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Applicant_nrp_key`(`nrp`),
    UNIQUE INDEX `Applicant_email_key`(`email`),
    UNIQUE INDEX `Applicant_no_telp_key`(`no_telp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
