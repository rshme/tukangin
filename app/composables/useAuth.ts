/**
 * Authentication composable for TukangIn
 * Handles login, registration, OTP verification, and session management
 */

interface User {
  id: string
  name: string
  phone: string
  email?: string
  role: 'tukang' | 'kontraktor' | 'pemilik' | 'admin'
  profileComplete: boolean
  avatar?: string
}

interface LoginData {
  phone: string
  password: string
  role: string
  remember?: boolean
}

interface RegisterData {
  name: string
  phone: string
  email?: string
  password: string
  role: string
  terms: boolean
}

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const token = useState<string | null>('auth.token', () => null)
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('tukang_in_token')
      const savedUser = localStorage.getItem('tukang_in_user')
      
      if (savedToken && savedUser) {
        try {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
        } catch (error) {
          // Clear invalid data
          clearAuth()
        }
      }
    }
  }

  // Clear authentication data
  const clearAuth = () => {
    user.value = null
    token.value = null
    
    if (process.client) {
      localStorage.removeItem('tukang_in_token')
      localStorage.removeItem('tukang_in_user')
    }
  }

  // Login with phone and password
  const login = async (data: LoginData) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: data
      })

      if (response.success) {
        user.value = response.user
        token.value = response.token

        // Persist to localStorage if remember is true
        if (data.remember && process.client) {
          localStorage.setItem('tukang_in_token', response.token)
          localStorage.setItem('tukang_in_user', JSON.stringify(response.user))
        }

        return response
      } else {
        throw new Error(response.message || 'Login gagal')
      }
    } catch (error: any) {
      // Simulate common login errors for demo
      if (error.status === 401) {
        throw new Error('Nomor telepon atau password salah')
      } else if (error.status === 429) {
        throw new Error('Terlalu banyak percobaan login. Coba lagi nanti.')
      }
      
      throw error
    }
  }

  // Register new user
  const register = async (data: RegisterData) => {
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: data
      })

      if (response.success) {
        return response
      } else {
        throw new Error(response.message || 'Registrasi gagal')
      }
    } catch (error: any) {
      if (error.status === 409) {
        throw new Error('Nomor telepon sudah terdaftar')
      }
      
      throw error
    }
  }

  // Login with OTP (send OTP)
  const loginWithOtp = async (phone: string, role: string) => {
    try {
      const response = await $fetch('/api/auth/otp-send', {
        method: 'POST',
        body: { phone, role }
      })

      if (response.success) {
        return response
      } else {
        throw new Error(response.message || 'Gagal mengirim OTP')
      }
    } catch (error) {
      throw error
    }
  }

  // Verify OTP
  const verifyOtp = async (phone: string, otp: string, role: string) => {
    try {
      const response = await $fetch('/api/auth/otp-verify', {
        method: 'POST',
        body: { phone, otp, role }
      })

      if (response.success) {
        user.value = response.user
        token.value = response.token

        // Persist to localStorage
        if (process.client) {
          localStorage.setItem('tukang_in_token', response.token)
          localStorage.setItem('tukang_in_user', JSON.stringify(response.user))
        }

        return response
      } else {
        throw new Error(response.message || 'Kode OTP tidak valid')
      }
    } catch (error) {
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      await $fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn('Logout server call failed:', error)
    } finally {
      clearAuth()
    }
  }

  // Check if user has specific role
  const hasRole = (role: string) => {
    return user.value?.role === role
  }

  // Get user's redirect path based on role
  const getHomePath = () => {
    if (!user.value) return '/auth/login'
    
    switch (user.value.role) {
      case 'tukang':
        return '/tukang/dashboard'
      case 'kontraktor':
        return '/kontraktor/dashboard'
      case 'pemilik':
        return '/pemilik/dashboard'
      case 'admin':
        return '/admin/dashboard'
      default:
        return '/dashboard'
    }
  }

  // Refresh user data
  const refreshUser = async () => {
    if (!token.value) return

    try {
      const response = await $fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (response.success) {
        user.value = response.user
        
        if (process.client) {
          localStorage.setItem('tukang_in_user', JSON.stringify(response.user))
        }
      }
    } catch (error) {
      // Token might be invalid, clear auth
      clearAuth()
      throw error
    }
  }

  // Initialize on composable creation
  initAuth()

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,

    // Methods
    login,
    register,
    loginWithOtp,
    verifyOtp,
    logout,
    hasRole,
    getHomePath,
    refreshUser,
    clearAuth,
    initAuth
  }
}
