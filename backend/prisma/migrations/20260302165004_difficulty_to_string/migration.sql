/*
  Cast existing enum values to TEXT first, then drop the enum type.
  This avoids dropping and recreating the NOT NULL column with existing data.
*/
-- AlterTable: cast enum column to TEXT in-place
ALTER TABLE "tours" ALTER COLUMN "difficulty" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "Difficulty";
