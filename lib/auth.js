import jwt from 'jsonwebtoken'

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.split(' ')[1]
}