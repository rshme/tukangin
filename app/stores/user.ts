/**
 * User Store - Manages user authentication and profile state
 * Integrates with useAuth composable for authentication actions
 */

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const lastActivity = ref<Date | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value && !!token.value)
  const userRole = computed(() => user.value?.role)
  const isProfileComplete = computed(() => user.value?.profileComplete ?? false)
  const userName = computed(() => user.value?.name ?? '')
  const userAvatar = computed(() => user.value?.avatar)

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
    lastActivity.value = new Date()
  }

  const setToken = (tokenValue: string) => {
    token.value = tokenValue
  }

  const clearUser = () => {
    user.value = null
    token.value = null
    lastActivity.value = null
  }

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user.value) return

    isLoading.value = true
    try {
      const response = await $fetch(`/api/user/${user.value.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: profileData
      })

      if (response.success) {
        user.value = { ...user.value, ...response.user }
        return response
      }
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const uploadAvatar = async (file: File) => {
    if (!user.value) return

    isLoading.value = true
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await $fetch(`/api/user/${user.value.id}/avatar`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: formData
      })

      if (response.success) {
        user.value = { ...user.value, avatar: response.avatarUrl }
        return response
      }
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Initialize from localStorage on app start
  const initializeStore = () => {
    if (process.client) {
      const savedToken = localStorage.getItem('tukang_in_token')
      const savedUser = localStorage.getItem('tukang_in_user')
      
      if (savedToken && savedUser) {
        try {
          token.value = savedToken
          user.value = JSON.parse(savedUser)
          lastActivity.value = new Date()
        } catch (error) {
          // Clear invalid data
          clearUser()
          localStorage.removeItem('tukang_in_token')
          localStorage.removeItem('tukang_in_user')
        }
      }
    }
  }

  // Persist to localStorage
  const persistUser = () => {
    if (process.client && user.value && token.value) {
      localStorage.setItem('tukang_in_token', token.value)
      localStorage.setItem('tukang_in_user', JSON.stringify(user.value))
    }
  }

  // Check session validity
  const checkSession = async () => {
    if (!token.value) return false

    try {
      const response = await $fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (!response.valid) {
        clearUser()
        return false
      }

      lastActivity.value = new Date()
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  // Auto-logout after inactivity
  const checkInactivity = () => {
    if (!lastActivity.value) return

    const now = new Date()
    const diffHours = (now.getTime() - lastActivity.value.getTime()) / (1000 * 60 * 60)
    
    // Auto logout after 24 hours of inactivity
    if (diffHours > 24) {
      clearUser()
      if (process.client) {
        localStorage.removeItem('tukang_in_token')
        localStorage.removeItem('tukang_in_user')
      }
    }
  }

  // Update activity timestamp
  const updateActivity = () => {
    lastActivity.value = new Date()
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    lastActivity: readonly(lastActivity),

    // Getters
    isAuthenticated,
    userRole,
    isProfileComplete,
    userName,
    userAvatar,

    // Actions
    setUser,
    setToken,
    clearUser,
    updateProfile,
    uploadAvatar,
    initializeStore,
    persistUser,
    checkSession,
    checkInactivity,
    updateActivity
  }
})

// Types
interface User {
  id: string
  name: string
  phone: string
  email?: string
  role: 'tukang' | 'kontraktor' | 'pemilik' | 'admin'
  profileComplete: boolean
  avatar?: string
  createdAt?: string
  updatedAt?: string
}
