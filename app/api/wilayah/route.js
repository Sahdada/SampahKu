import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const wilayah = await prisma.wilayah.findMany({
      orderBy: { namaWilayah: 'asc' }
    })
    return Response.json(wilayah)
  } catch (error) {
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}