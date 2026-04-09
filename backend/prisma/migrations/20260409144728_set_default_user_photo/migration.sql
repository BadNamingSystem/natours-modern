/*
  Warnings:

  - Made the column `photo` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "photo" SET NOT NULL,
ALTER COLUMN "photo" SET DEFAULT 'default.jpg';
