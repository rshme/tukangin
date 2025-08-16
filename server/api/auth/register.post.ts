/**
 * Mock Registration API - User registration with OTP simulation
 */

// Mock storage for pending registrations (in production, use Redis or database)
const pendingRegistrations = new Map()

// Mock existing users (to check duplicates)
const existingUsers = [
  { phone: '08123456701', email: 'ahmad.wijaya@email.com' },
  { phone: '08123456702', email: 'siti.kontraktor@email.com' },
  { phone: '08123456703', email: 'budi.pemilik@email.com' }
]

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export default defineEventHandler(async (event) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 150))

  const body = await readBody(event)
  const { name, phone, email, password, role, terms } = body

  // Validation
  if (!name || !phone || !password || !role || !terms) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Semua field wajib diisi dan terms harus disetujui'
    })
  }

  // Phone format validation
  if (!/^08[0-9]{8,11}$/.test(phone)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Format nomor telepon tidak valid'
    })
  }

  // Email validation (if provided)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Format email tidak valid'
    })
  }

  // Password strength validation
  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password minimal 6 karakter'
    })
  }

  // Role validation
  if (!['tukang', 'kontraktor', 'pemilik'].includes(role)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Role tidak valid'
    })
  }

  // Check if phone already exists
  const phoneExists = existingUsers.some(user => user.phone === phone)
  if (phoneExists) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Nomor telepon sudah terdaftar'
    })
  }

  // Check if email already exists (if provided)
  if (email) {
    const emailExists = existingUsers.some(user => user.email === email)
    if (emailExists) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email sudah terdaftar'
      })
    }
  }

  // Generate OTP for phone verification
  const otp = generateOTP()
  const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Store pending registration (expires in 10 minutes)
  pendingRegistrations.set(registrationId, {
    name,
    phone,
    email,
    password, // In production, hash this before storing
    role,
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + (10 * 60 * 1000), // 10 minutes
    verified: false
  })

  // Simulate SMS sending (in production, integrate with SMS provider)
  console.log(`[SMS] Send OTP ${otp} to ${phone}`)
  console.log(`Registration ID: ${registrationId}`)

  // Log registration attempt
  console.log(`Registration attempt: ${name} (${phone}) as ${role}`)

  return {
    success: true,
    message: 'Registrasi berhasil. Kode OTP telah dikirim ke nomor telepon Anda.',
    registrationId,
    phone,
    otpSent: true,
    expiresIn: 600, // 10 minutes in seconds
    nextStep: 'verify-otp'
  }
})
