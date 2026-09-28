import { prisma } from '@/lib/db'
import { generateToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { nama, email, password, noHp, alamat } = await req.json()
    
    if (!nama || !email || !password) {
      return Response.json({ error: 'Nama, email, dan password wajib diisi!' }, { status: 400 })
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return Response.json({ error: 'Email sudah terdaftar!' }, { status: 400 })
    }
    
    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        noHp: noHp || null,
        alamat: alamat || null,
        role: 'nasabah'
      }
    })
    
    const token = generateToken(user)
    const { password: _, ...userWithoutPassword } = user
    
    return Response.json({ 
      success: true,
      token, 
      user: userWithoutPassword 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Register error:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}