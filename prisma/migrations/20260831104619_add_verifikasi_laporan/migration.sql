-- CreateTable
CREATE TABLE "VerifikasiLaporan" (
    "id" TEXT NOT NULL,
    "laporanId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerifikasiLaporan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifikasiLaporan_laporanId_adminId_key" ON "VerifikasiLaporan"("laporanId", "adminId");

-- AddForeignKey
ALTER TABLE "VerifikasiLaporan" ADD CONSTRAINT "VerifikasiLaporan_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanSampah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifikasiLaporan" ADD CONSTRAINT "VerifikasiLaporan_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
