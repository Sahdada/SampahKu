import { prisma } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

// GET semua laporan
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    
    const where = {}
    if (userId) where.userId = userId
    if (status) where.status = status
    
    const laporan = await prisma.laporanSampah.findMany({
      where,
      include: {
        user: { select: { id: true, nama: true, email: true, poin: true } },
        admin: { select: { id: true, nama: true } },
        jenisSampah: true,
        wilayah: true,
        foto: true,
        transaksi: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return Response.json(laporan)
  } catch (error) {
    console.error('Error GET:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// POST tambah laporan
export async function POST(req) {
  try {
    const token = getTokenFromRequest(req)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return Response.json({ error: 'Silakan login dulu!' }, { status: 401 })
    }
    
    const { berat, jenisSampahId, wilayahId, catatan, fotoUrl } = await req.json()
    
    if (!berat || !jenisSampahId || !wilayahId) {
      return Response.json({ error: 'Berat, jenis sampah, dan wilayah wajib diisi!' }, { status: 400 })
    }
    
    if (parseFloat(berat) <= 0) {
      return Response.json({ error: 'Berat harus lebih dari 0 kg!' }, { status: 400 })
    }
    
    const laporan = await prisma.laporanSampah.create({
      data: {
        berat: parseFloat(berat),
        userId: decoded.id,
        jenisSampahId,
        wilayahId,
        catatan: catatan || null,
        status: 'pending'
      },
      include: {
        user: { select: { id: true, nama: true } },
        jenisSampah: true,
        wilayah: true
      }
    })
    
    if (fotoUrl) {
      await prisma.fotoSampah.create({
        data: {
          imageUrl: fotoUrl,
          laporanId: laporan.id
        }
      })
    }
    
    return Response.json({ success: true, data: laporan }, { status: 201 })
    
  } catch (error) {
    console.error('Error POST:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// ============================================
// PUT: Update status laporan + Tambah Poin
// ============================================
export async function PUT(req) {
  try {
    const token = getTokenFromRequest(req)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return Response.json({ error: 'Silakan login dulu!' }, { status: 401 })
    }
    
    if (decoded.role !== 'admin') {
      return Response.json({ error: 'Hanya admin yang bisa mengupdate status!' }, { status: 403 })
    }
    
    const { id, status } = await req.json()
    
    if (!id || !status) {
      return Response.json({ error: 'ID dan status wajib diisi!' }, { status: 400 })
    }
    
    const allowedStatus = ['pending', 'diverifikasi', 'dijual', 'ditukar']
    if (!allowedStatus.includes(status)) {
      return Response.json({ error: 'Status tidak valid!' }, { status: 400 })
    }
    
    // Ambil data laporan sebelum update
    const laporanSebelum = await prisma.laporanSampah.findUnique({
      where: { id },
      include: { user: true }
    })
    
    if (!laporanSebelum) {
      return Response.json({ error: 'Laporan tidak ditemukan!' }, { status: 404 })
    }
    
    // Update status
    await prisma.$executeRaw`
      UPDATE "LaporanSampah" 
      SET status = ${status}, 
          "adminId" = ${decoded.id}
      WHERE id = ${id}
    `
    
    // ✅ TAMBAH POIN (kalo status diverifikasi, dijual, atau ditukar)
    let poinDitambahkan = 0
    if (status === 'diverifikasi' || status === 'dijual' || status === 'ditukar') {
      // 1 kg = 10 poin
      poinDitambahkan = Math.round(laporanSebelum.berat * 10)
      
      await prisma.user.update({
        where: { id: laporanSebelum.userId },
        data: { poin: { increment: poinDitambahkan } }
      })
    }
    
    const updatedLaporan = await prisma.laporanSampah.findUnique({
      where: { id },
      include: {
        user: true,
        jenisSampah: true,
        wilayah: true
      }
    })
    
    return Response.json({ 
      success: true, 
      message: `Status berhasil diubah menjadi ${status}`,
      poinDitambahkan: poinDitambahkan,
      data: updatedLaporan 
    })
    
  } catch (error) {
    console.error('Error PUT:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE hapus laporan
export async function DELETE(req) {
  try {
    const token = getTokenFromRequest(req)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return Response.json({ error: 'Silakan login dulu!' }, { status: 401 })
    }
    
    if (decoded.role !== 'admin') {
      return Response.json({ error: 'Hanya admin yang bisa menghapus!' }, { status: 403 })
    }
    
    const { id } = await req.json()
    
    if (!id) {
      return Response.json({ error: 'ID wajib diisi!' }, { status: 400 })
    }
    
    await prisma.laporanSampah.delete({ where: { id } })
    
    return Response.json({ success: true, message: 'Laporan dihapus!' })
    
  } catch (error) {
    console.error('Error DELETE:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}