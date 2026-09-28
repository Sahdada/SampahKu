import { prisma } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

// ============================================
// GET: Riwayat Transaksi Penukaran
// ============================================
export async function GET(req) {
  try {
    const token = getTokenFromRequest(req)

    if (!token) {
      return Response.json({ error: 'Token tidak ditemukan!' }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return Response.json({ error: 'Token tidak valid!' }, { status: 401 })
    }

    // ❗ FIX: pakai ID dari token, bukan query
    const userId = decoded.id

    const transaksi = await prisma.transaksiPenukaran.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    })

    return Response.json(transaksi)

  } catch (error) {
    console.error('Error GET transaksi:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

// ============================================
// POST: Buat Transaksi Penukaran
// ============================================
export async function POST(req) {
  try {
    const token = getTokenFromRequest(req)

    if (!token) {
      return Response.json({ error: 'Token tidak ditemukan!' }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return Response.json({ error: 'Token tidak valid!' }, { status: 401 })
    }

    const { hadiah, poinDigunakan } = await req.json()

    if (!hadiah || !poinDigunakan) {
      return Response.json({ error: 'Hadiah dan poin wajib diisi!' }, { status: 400 })
    }

    if (poinDigunakan <= 0) {
      return Response.json({ error: 'Poin harus lebih dari 0!' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    if (!user) {
      return Response.json({ error: 'User tidak ditemukan!' }, { status: 404 })
    }

    if (user.poin < poinDigunakan) {
      return Response.json({ error: 'Poin tidak mencukupi!' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        poin: user.poin - poinDigunakan
      }
    })

    const transaksi = await prisma.transaksiPenukaran.create({
      data: {
        kodeTransaksi: `TUKAR-${Date.now()}`,
        userId: decoded.id,
        poinDigunakan,
        hadiah,
        status: 'sukses',
        tanggalTransaksi: new Date()
      }
    })

    await prisma.notifikasi.create({
      data: {
        userId: decoded.id,
        judul: '🔄 Penukaran Poin Berhasil',
        pesan: `Kamu berhasil menukarkan ${poinDigunakan} poin untuk ${hadiah}!`,
        tipe: 'success'
      }
    })

    return Response.json({
      success: true,
      message: 'Poin berhasil ditukarkan!',
      data: {
        user: updatedUser,
        transaksi
      }
    })

  } catch (error) {
    console.error('Error POST transaksi:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}