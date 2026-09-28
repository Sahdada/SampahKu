import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// ✅ HAPUS bagian export const config = { ... }

export async function POST(req) {
  try {
    // Di App Router, req.formData() sudah otomatis menangani FormData
    // tanpa perlu menonaktifkan body parser
    const formData = await req.formData()
    const file = formData.get('foto')

    if (!file) {
      return Response.json({ error: 'Tidak ada file yang diupload' }, { status: 400 })
    }

    // Cek tipe file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: 'Format file tidak didukung. Gunakan JPG, PNG, atau WEBP' }, { status: 400 })
    }

    // Cek ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return Response.json({ error: 'Ukuran file terlalu besar. Maksimal 5MB' }, { status: 400 })
    }

    // Buat folder uploads jika belum ada
    const uploadDir = join(process.cwd(), 'public/uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Buat nama file unik
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}.${extension}`
    const filePath = join(uploadDir, fileName)

    // Simpan file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Return URL file
    const url = `/uploads/${fileName}`

    return Response.json({ success: true, url })
  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({ error: 'Terjadi kesalahan saat upload' }, { status: 500 })
  }
}