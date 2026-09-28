import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Mulai seeding data...')

  // 1. Buat Admin
  const passwordAdmin = '$2a$10$8XQ8nB8Q8nB8Q8nB8Q8nB8'
  const admin = await prisma.user.create({
    data: {
      nama: 'Admin SampahKu',
      email: 'admin@sampahku.com',
      password: passwordAdmin,
      noHp: '081234567890',
      role: 'admin',
      alamat: 'Jakarta Pusat'
    }
  })
  console.log(`✅ Admin created: ${admin.email}`)

  // 2. Buat Nasabah Budi
  const passwordNasabah = await bcrypt.hash('nasabah123', 10)
  const nasabah = await prisma.user.create({
    data: {
      nama: 'Budi Nasabah',
      email: 'budi@email.com',
      password: passwordNasabah,
      noHp: '081298765432',
      role: 'nasabah',
      alamat: 'Jakarta Selatan'
    }
  })
  console.log(`✅ Nasabah created: ${nasabah.email}`)

  // 3. Buat User Banimeyiaa (no HP beda biar ga conflict)
  const passwordBanimeyiaa = await bcrypt.hash('meyia123', 10)
  const banimeyiaa = await prisma.user.create({
    data: {
      nama: 'Banimeyiaa',
      email: 'banimeyiaa@gmail.com',
      password: passwordBanimeyiaa,
      noHp: '089999999999',  // ← NO HP BEDA
      role: 'nasabah',
      alamat: 'Jakarta'
    }
  })
  console.log(`✅ Banimeyiaa created: ${banimeyiaa.email}`)

  // 4. Jenis Sampah
  await prisma.jenisSampah.createMany({
    data: [
      { namaJenis: 'Kertas', kategori: 'Anorganik', hargaPerKg: 2000 },
      { namaJenis: 'Plastik', kategori: 'Anorganik', hargaPerKg: 3000 },
      { namaJenis: 'Kaca', kategori: 'Anorganik', hargaPerKg: 1500 },
      { namaJenis: 'Logam', kategori: 'Anorganik', hargaPerKg: 5000 },
      { namaJenis: 'Sisa Makanan', kategori: 'Organik', hargaPerKg: 1000 },
      { namaJenis: 'Daun', kategori: 'Organik', hargaPerKg: 800 },
      { namaJenis: 'Kardus', kategori: 'Anorganik', hargaPerKg: 2500 },
      { namaJenis: 'Botol Plastik', kategori: 'Anorganik', hargaPerKg: 3500 },
    ]
  })
  console.log('✅ Jenis sampah created')

  // 5. Wilayah JAKARTA (29 Kecamatan)
  await prisma.wilayah.createMany({
    data: [
      { namaWilayah: 'Gambir - Jakarta Pusat' },
      { namaWilayah: 'Senen - Jakarta Pusat' },
      { namaWilayah: 'Tanah Abang - Jakarta Pusat' },
      { namaWilayah: 'Menteng - Jakarta Pusat' },
      { namaWilayah: 'Cempaka Putih - Jakarta Pusat' },
      { namaWilayah: 'Tanjung Priok - Jakarta Utara' },
      { namaWilayah: 'Penjaringan - Jakarta Utara' },
      { namaWilayah: 'Kelapa Gading - Jakarta Utara' },
      { namaWilayah: 'Cilincing - Jakarta Utara' },
      { namaWilayah: 'Pademangan - Jakarta Utara' },
      { namaWilayah: 'Taman Sari - Jakarta Barat' },
      { namaWilayah: 'Grogol Petamburan - Jakarta Barat' },
      { namaWilayah: 'Kembangan - Jakarta Barat' },
      { namaWilayah: 'Kalideres - Jakarta Barat' },
      { namaWilayah: 'Cengkareng - Jakarta Barat' },
      { namaWilayah: 'Tambora - Jakarta Barat' },
      { namaWilayah: 'Kebayoran Baru - Jakarta Selatan' },
      { namaWilayah: 'Pasar Minggu - Jakarta Selatan' },
      { namaWilayah: 'Cilandak - Jakarta Selatan' },
      { namaWilayah: 'Mampang Prapatan - Jakarta Selatan' },
      { namaWilayah: 'Pancoran - Jakarta Selatan' },
      { namaWilayah: 'Tebet - Jakarta Selatan' },
      { namaWilayah: 'Setiabudi - Jakarta Selatan' },
      { namaWilayah: 'Jatinegara - Jakarta Timur' },
      { namaWilayah: 'Pulo Gadung - Jakarta Timur' },
      { namaWilayah: 'Kramat Jati - Jakarta Timur' },
      { namaWilayah: 'Cakung - Jakarta Timur' },
      { namaWilayah: 'Duren Sawit - Jakarta Timur' },
      { namaWilayah: 'Ciracas - Jakarta Timur' },
    ]
  })
  console.log(`✅ Wilayah created (${await prisma.wilayah.count()})`)

  // 6. Laporan 1 (diverifikasi) + Foto + Transaksi + Notifikasi
  const jenisKertas = await prisma.jenisSampah.findFirst({
    where: { namaJenis: 'Kertas' }
  })
  const wilayah1 = await prisma.wilayah.findFirst({
    where: { namaWilayah: 'Gambir - Jakarta Pusat' }
  })

  const laporan1 = await prisma.laporanSampah.create({
    data: {
      berat: 5.5,
      userId: nasabah.id,
      jenisSampahId: jenisKertas.id,
      wilayahId: wilayah1.id,
      catatan: 'Kertas bekas dari kantor',
      status: 'diverifikasi'
    }
  })
  console.log(`✅ Laporan 1 created`)

  await prisma.fotoSampah.create({
    data: {
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&h=200&fit=crop',
      laporanId: laporan1.id
    }
  })
  console.log('✅ Foto 1 created')

  await prisma.transaksi.create({
    data: {
      kodeTransaksi: `TRX-${Date.now()}`,
      tipeTransaksi: 'jual',
      laporanId: laporan1.id,
      adminId: admin.id,
      hargaJual: Math.round(laporan1.berat * jenisKertas.hargaPerKg),
      poinDitukar: 0,
      status: 'selesai',
      keterangan: 'Penjualan kertas'
    }
  })
  console.log('✅ Transaksi created')

  await prisma.notifikasi.create({
    data: {
      userId: nasabah.id,
      judul: '💰 Penjualan Sampah Berhasil',
      pesan: 'Sampah kertas 5.5 kg berhasil dijual!',
      tipe: 'success'
    }
  })
  console.log('✅ Notifikasi created')

  // 7. Laporan 2 (pending) + Foto
  const jenisBotol = await prisma.jenisSampah.findFirst({
    where: { namaJenis: 'Botol Plastik' }
  })
  const wilayah2 = await prisma.wilayah.findFirst({
    where: { namaWilayah: 'Kalideres - Jakarta Barat' }
  })

  const laporan2 = await prisma.laporanSampah.create({
    data: {
      berat: 5,
      userId: nasabah.id,
      jenisSampahId: jenisBotol.id,
      wilayahId: wilayah2.id,
      catatan: 'Botol plastik bekas minuman',
      status: 'pending'
    }
  })
  console.log(`✅ Laporan 2 created (pending)`)

  await prisma.fotoSampah.create({
    data: {
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&h=200&fit=crop',
      laporanId: laporan2.id
    }
  })
  console.log('✅ Foto 2 created')

  // 8. VerifikasiLaporan (Many-to-Many)
  await prisma.verifikasiLaporan.create({
    data: {
      laporanId: laporan1.id,
      adminId: admin.id,
      status: 'disetujui',
      catatan: 'Verifikasi berhasil oleh Admin'
    }
  })
  console.log('✅ VerifikasiLaporan created (Many-to-Many)')

  console.log('🎉 Seeding selesai!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })