<template>
  <div class="min-h-screen bg-bg-page flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <h1 class="text-3xl font-heading font-bold text-primary">TukangIn</h1>
        </NuxtLink>
        <h2 class="mt-6 text-2xl font-heading font-semibold text-text-900">
          Daftar Akun
        </h2>
        <p class="mt-2 text-text-500">
          Sudah punya akun? 
          <NuxtLink to="/auth/login" class="text-primary hover:text-primary-600 font-medium">
            Masuk sekarang
          </NuxtLink>
        </p>
      </div>

      <!-- Role Selection -->
      <div class="card p-8">
        <h3 class="text-lg font-semibold text-text-900 mb-6 text-center">
          Pilih Jenis Akun Anda
        </h3>
        
        <div class="space-y-4">
          <button
            @click="selectRole('tukang')"
            :class="[
              'w-full p-4 border-2 rounded-lg transition-all duration-200 text-left',
              selectedRole === 'tukang' 
                ? 'border-primary bg-primary/5 shadow-lg' 
                : 'border-border hover:border-primary/50 hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center space-x-4">
              <div :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center',
                selectedRole === 'tukang' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              ]">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-text-900 mb-1">Tukang</h4>
                <p class="text-sm text-text-500">
                  Untuk pekerja konstruksi dan tukang profesional
                </p>
              </div>
            </div>
          </button>

          <button
            @click="selectRole('klien')"
            :class="[
              'w-full p-4 border-2 rounded-lg transition-all duration-200 text-left',
              selectedRole === 'klien' 
                ? 'border-primary bg-primary/5 shadow-lg' 
                : 'border-border hover:border-primary/50 hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center space-x-4">
              <div :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center',
                selectedRole === 'klien' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              ]">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-text-900 mb-1">Klien</h4>
                <p class="text-sm text-text-500">
                  Untuk pemilik rumah dan kontraktor
                </p>
              </div>
            </div>
          </button>
        </div>

        <!-- Login Button -->
        <button
          @click="handleLogin"
          :disabled="!selectedRole || isLoading"
          class="btn-primary w-full mt-6"
          :class="{ 'btn-disabled': !selectedRole || isLoading }"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Memproses...' : 'Daftar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Reactive state
const selectedRole = ref<'tukang' | 'klien' | null>(null)
const isLoading = ref(false)

// Methods
const selectRole = (role: 'tukang' | 'klien') => {
  selectedRole.value = role
}

const handleLogin = async () => {
  if (!selectedRole.value) {
    alert('Silakan pilih jenis akun terlebih dahulu')
    return
  }

  isLoading.value = true
  
  try {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redirect based on role
    if (selectedRole.value === 'tukang') {
      window.location.href = '/tukang/dashboard'
    } else {
      window.location.href = '/client/dashboard'
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

</script>
