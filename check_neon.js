const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.count();
  const jenis = await prisma.jenisSampah.count();
  const wilayah = await prisma.wilayah.count();
  const laporan = await prisma.laporanSampah.count();

  console.log('🎉 NEON POSTGRESQL CONNECTED & VERIFIED!');
  console.log({
    totalUsers: users,
    totalJenisSampah: jenis,
    totalWilayah: wilayah,
    totalLaporan: laporan
  });
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
