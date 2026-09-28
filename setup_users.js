const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordNasabah = await bcrypt.hash('nasabah123', 10);
  const passwordAdmin = await bcrypt.hash('admin123', 10);

  // Update or upsert admin
  await prisma.user.upsert({
    where: { email: 'admin@sampahku.com' },
    update: { password: passwordAdmin },
    create: {
      nama: 'Admin SampahKu',
      email: 'admin@sampahku.com',
      password: passwordAdmin,
      noHp: '081234567890',
      role: 'admin',
      alamat: 'Jakarta Pusat'
    }
  });

  // Update or upsert nasabah
  await prisma.user.upsert({
    where: { email: 'budi@email.com' },
    update: { password: passwordNasabah },
    create: {
      nama: 'Budi Nasabah',
      email: 'budi@email.com',
      password: passwordNasabah,
      noHp: '081298765432',
      role: 'nasabah',
      alamat: 'Jakarta Selatan',
      poin: 150
    }
  });

  console.log('✅ Accounts updated successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
