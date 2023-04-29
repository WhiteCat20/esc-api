-- CreateTable
CREATE TABLE `Submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `submission_name` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `status` ENUM('Accepting', 'NotAccepting') NOT NULL DEFAULT 'Accepting',
    `Submission_response_id` INTEGER NOT NULL,

    UNIQUE INDEX `Submission_Submission_response_id_key`(`Submission_response_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submission_responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `nama_peserta` VARCHAR(191) NOT NULL,
    `submission_attachment` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_Submission_response_id_fkey` FOREIGN KEY (`Submission_response_id`) REFERENCES `Submission_responses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
