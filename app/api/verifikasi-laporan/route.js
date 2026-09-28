import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export async function GET(req) {
  try {
    const token = getTokenFromRequest(req)
    const decoded = verifyToken(token)
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Silakan login dulu!' },
        { status: 401 }
      )
    }
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Hanya admin yang bisa mengakses!' },
        { status: 403 }
      )
    }
    
    const verifikasi = await prisma.verifikasiLaporan.findMany({
      include: {
        admin: {
          select: { id: true, nama: true, email: true }
        },
        laporan: {
          select: { id: true, berat: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(verifikasi)
  } catch (error) {
    console.error('Error GET verifikasi:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}