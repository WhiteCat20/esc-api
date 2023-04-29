/*
  Warnings:

  - You are about to drop the column `Submission_response_id` on the `submission` table. All the data in the column will be lost.
  - Added the required column `submissionId` to the `Submission_responses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `submission` DROP FOREIGN KEY `Submission_Submission_response_id_fkey`;

-- AlterTable
ALTER TABLE `submission` DROP COLUMN `Submission_response_id`;

-- AlterTable
ALTER TABLE `submission_responses` ADD COLUMN `submissionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Submission_responses` ADD CONSTRAINT `Submission_responses_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
