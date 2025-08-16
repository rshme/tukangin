/**
 * Mock Authentication API - Login endpoint
 * Simulates real authentication with JWT-like tokens
 */

// Mock user database
const mockUsers = [
  {
    id: '1',
    name: 'Ahmad Wijaya',
    phone: '08123456701',
    email: 'ahmad.wijaya@email.com',
    password: 'password123', // In real app, this would be hashed
    role: 'tukang',
    profileComplete: true,
    avatar: '/api/placeholder/avatar/1.jpg',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Siti Kontraktor',
    phone: '08123456702',
    email: 'siti.kontraktor@email.com',
    password: 'password123',
    role: 'kontraktor',
    profileComplete: true,
    avatar: '/api/placeholder/avatar/2.jpg',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Budi Pemilik',
    phone: '08123456703',
    email: 'budi.pemilik@email.com',
    password: 'password123',
    role: 'pemilik',
    profileComplete: false,
    createdAt: '2024-02-10T00:00:00Z'
  }
]

// Simple JWT-like token generation (for demo only)
const generateToken = (userId: string, role: string) => {
  const payload = {
    userId,
    role,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  }
  
  // In production, use proper JWT library
  return btoa(JSON.stringify(payload))
}

export default defineEventHandler(async (event) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100))

  const body = await readBody(event)
  const { phone, password, role, remember } = body

  // Validation
  if (!phone || !password || !role) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Phone, password, and role are required'
    })
  }

  // Phone format validation
  if (!/^08[0-9]{8,11}$/.test(phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid phone number format'
    })
  }

  // Find user
  const user = mockUsers.find(u => u.phone === phone && u.role === role)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nomor telepon tidak ditemukan untuk role tersebut'
    })
  }

  // Verify password (in production, compare with hashed password)
  if (user.password !== password) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Password salah'
    })
  }

  // Generate token
  const token = generateToken(user.id, user.role)

  // Prepare user data (exclude password)
  const userData = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
    profileComplete: user.profileComplete,
    avatar: user.avatar,
    createdAt: user.createdAt
  }

  // Log successful login (in production, use proper logging)
  console.log(`User ${user.name} (${user.phone}) logged in as ${user.role}`)

  return {
    success: true,
    message: 'Login berhasil',
    user: userData,
    token,
    remember,
    expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString()
  }
})
