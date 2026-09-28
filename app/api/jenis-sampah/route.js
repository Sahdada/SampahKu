import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const jenisSampah = await prisma.jenisSampah.findMany({
      where: { isActive: true },
      orderBy: { namaJenis: 'asc' }
    })
    return Response.json(jenisSampah)
  } catch (error) {
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}