/*
  Warnings:

  - The primary key for the `tours` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tours" DROP CONSTRAINT "tours_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tours_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tours_id_seq";
