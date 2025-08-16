<template>
  <div class="min-h-screen bg-bg-page flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-3xl font-heading font-bold text-primary">TukangIn</h1>
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-heading font-semibold text-text-900">
          Masuk ke Akun Anda
        </h2>
        <p class="mt-2 text-text-500">
          Belum punya akun? 
          <NuxtLink to="/auth/register" class="text-primary hover:text-primary-600 font-medium">
            Daftar sekarang
          </NuxtLink>
        </p>
      </div>

      <!-- Login Form -->
      <div class="card p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-text-900 mb-2">
              Nomor Telepon
            </label>
            <div class="relative">
              <PhoneIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="form-input pl-10"
                placeholder="08xxxxxxxxxx"
                :class="{ 'border-danger': errors.phone }"
              />
            </div>
            <p v-if="errors.phone" class="mt-1 text-sm text-danger">{{ errors.phone }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-text-900 mb-2">
              Password
            </label>
            <div class="relative">
              <LockIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="form-input pl-10 pr-10"
                placeholder="Masukkan password"
                :class="{ 'border-danger': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-500 hover:text-text-900"
              >
                <EyeIcon v-if="!showPassword" size="20" />
                <EyeOffIcon v-else size="20" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-danger">{{ errors.password }}</p>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="form.remember"
                type="checkbox"
                class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
              />
              <span class="ml-2 text-sm text-text-900">Ingat saya</span>
            </label>
            <NuxtLink to="/auth/forgot-password" class="text-sm text-primary hover:text-primary-600">
              Lupa password?
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full"
            :class="{ 'btn-disabled': isLoading }"
          >
            <LoaderIcon v-if="isLoading" size="20" class="mr-2 animate-spin" />
            {{ isLoading ? 'Memproses...' : 'Masuk' }}
          </button>

          <!-- OTP Login Alternative -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-bg-surface text-text-500">atau</span>
            </div>
          </div>

          <button
            type="button"
            @click="handleOtpLogin"
            class="btn-ghost w-full"
          >
            <MessageSquareIcon size="20" class="mr-2" />
            Masuk dengan OTP
          </button>
        </form>
      </div>

      <!-- Role Selection Reminder -->
      <div class="text-center">
        <p class="text-sm text-text-500">
          Masuk sebagai:
        </p>
        <div class="flex justify-center space-x-4 mt-2">
          <button
            @click="setRole('tukang')"
            :class="form.role === 'tukang' ? 'text-primary' : 'text-text-500'"
            class="text-sm hover:text-primary"
          >
            Tukang
          </button>
          <button
            @click="setRole('kontraktor')"
            :class="form.role === 'kontraktor' ? 'text-primary' : 'text-text-500'"
            class="text-sm hover:text-primary"
          >
            Kontraktor
          </button>
          <button
            @click="setRole('pemilik')"
            :class="form.role === 'pemilik' ? 'text-primary' : 'text-text-500'"
            class="text-sm hover:text-primary"
          >
            Pemilik Rumah
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composables
const { login, loginWithOtp } = useAuth()
const router = useRouter()
const route = useRoute()

// Reactive state
const form = reactive({
  phone: '',
  password: '',
  remember: false,
  role: (route.query.role as string) || 'tukang'
})

const errors = reactive({
  phone: '',
  password: ''
})

const isLoading = ref(false)
const showPassword = ref(false)

// Methods
const setRole = (role: string) => {
  form.role = role
}

const validateForm = () => {
  errors.phone = ''
  errors.password = ''

  if (!form.phone) {
    errors.phone = 'Nomor telepon wajib diisi'
    return false
  }
  
  if (!/^08[0-9]{8,11}$/.test(form.phone)) {
    errors.phone = 'Format nomor telepon tidak valid'
    return false
  }

  if (!form.password) {
    errors.password = 'Password wajib diisi'
    return false
  }

  if (form.password.length < 6) {
    errors.password = 'Password minimal 6 karakter'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  
  try {
    await login({
      phone: form.phone,
      password: form.password,
      role: form.role,
      remember: form.remember
    })

    // Redirect based on role
    const redirectPath = getRedirectPath(form.role)
    await router.push(redirectPath)
    
  } catch (error: any) {
    if (error.data?.field) {
      errors[error.data.field as keyof typeof errors] = error.data.message
    } else {
      // Show general error (you would typically show this in a toast notification)
      console.error('Login error:', error.message)
    }
  } finally {
    isLoading.value = false
  }
}

const handleOtpLogin = async () => {
  if (!form.phone) {
    errors.phone = 'Nomor telepon wajib diisi untuk OTP'
    return
  }

  try {
    await loginWithOtp(form.phone, form.role)
    // Redirect to OTP verification page
    await router.push({
      path: '/auth/otp-verify',
      query: { phone: form.phone, role: form.role }
    })
  } catch (error: any) {
    errors.phone = error.message || 'Gagal mengirim OTP'
  }
}

const getRedirectPath = (role: string) => {
  switch (role) {
    case 'tukang':
      return '/tukang/dashboard'
    case 'kontraktor':
      return '/kontraktor/dashboard'
    case 'pemilik':
      return '/pemilik/dashboard'
    default:
      return '/dashboard'
  }
}

// SEO
useHead({
  title: 'Masuk - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Masuk ke akun TukangIn Anda dan akses semua fitur platform pelatihan tukang terbaik di Indonesia.'
    }
  ]
})
</script>
