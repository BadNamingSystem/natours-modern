/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `tours` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tours_slug_idx";

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");
