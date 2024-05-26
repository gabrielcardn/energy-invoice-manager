/*
  Warnings:

  - Added the required column `filePath` to the `EnergyInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnergyInvoice" ADD COLUMN     "filePath" TEXT NOT NULL;
