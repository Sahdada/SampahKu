import { prisma } from '@/lib/db'
import { generateToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ error: 'Email dan password wajib diisi!' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return Response.json({ error: 'Email atau password salah!' }, { status: 401 })
    }

    // ✅ FIX: pakai bcrypt compare
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return Response.json({ error: 'Email atau password salah!' }, { status: 401 })
    }

    const token = generateToken(user)
    const { password: _, ...userWithoutPassword } = user

    return Response.json({
      success: true,
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}