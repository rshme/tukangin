<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ToolIcon size="18" class="text-white font-bold" />
            </div>
            <span class="text-xl font-heading font-bold text-text-900">TukangIn</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <!-- For Tukang (Workers) -->
          <div class="relative group">
            <button
              @click="toggleDropdown('tukang')"
              class="flex items-center space-x-1 text-text-900 hover:text-primary transition-colors"
              :class="{ 'text-primary': activeDropdown === 'tukang' }"
            >
              <span>Untuk Tukang</span>
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'tukang' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Tukang Dropdown -->
            <div
              v-if="activeDropdown === 'tukang'"
              class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-10"
              @mouseleave="closeDropdown"
            >
              <NuxtLink
                to="/courses"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
                <div>
                  <div class="font-medium">Pelatihan & Sertifikasi</div>
                  <div class="text-xs text-gray-500">Tingkatkan skill dan dapatkan sertifikat LPJK</div>
                </div>
              </NuxtLink>
              
              <NuxtLink
                to="/tukang/dashboard"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                <div>
                  <div class="font-medium">Dashboard Tukang</div>
                  <div class="text-xs text-gray-500">Kelola profil dan temukan pekerjaan</div>
                </div>
              </NuxtLink>
              
              <NuxtLink
                to="/jobs/search"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
                <div>
                  <div class="font-medium">Cari Pekerjaan</div>
                  <div class="text-xs text-gray-500">Temukan proyek yang sesuai keahlian</div>
                </div>
              </NuxtLink>
              
              <NuxtLink
                to="/tukang/profile/create"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <div class="font-medium">Buat Profil</div>
                  <div class="text-xs text-gray-500">Tampilkan keahlian dan portofolio</div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- For Clients (Home Owners & Contractors) -->
          <div class="relative">
            <button
              @click="toggleDropdown('client')"
              class="flex items-center space-x-1 text-text-900 hover:text-primary transition-colors"
              :class="{ 'text-primary': activeDropdown === 'client' }"
            >
              <span>Untuk Klien</span>
              <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': activeDropdown === 'client' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- Client Dropdown -->
            <div
              v-if="activeDropdown === 'client'"
              class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-10"
              @mouseleave="closeDropdown"
            >
              <NuxtLink
                to="/tukang/search"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <div class="font-medium">Cari Tukang</div>
                  <div class="text-xs text-gray-500">Temukan tukang bersertifikat terdekat</div>
                </div>
              </NuxtLink>
              
              <NuxtLink
                to="/client/dashboard"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                <div>
                  <div class="font-medium">Dashboard Klien</div>
                  <div class="text-xs text-gray-500">Kelola proyek dan riwayat pesanan</div>
                </div>
              </NuxtLink>
              
              <NuxtLink
                to="/client/projects/create"
                class="flex items-center px-4 py-3 text-sm text-text-900 hover:bg-gray-50"
                @click="closeDropdown"
              >
                <svg class="w-5 h-5 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
                </svg>
                <div>
                  <div class="font-medium">Post Proyek</div>
                  <div class="text-xs text-gray-500">Cari tukang untuk proyek Anda</div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Direct Links -->
          <NuxtLink
            to="/courses"
            class="text-text-900 hover:text-primary transition-colors"
            :class="{ 'text-primary font-medium': $route.path.startsWith('/courses') }"
          >
            Pelatihan
          </NuxtLink>
        </div>

        <!-- User Actions -->
        <div class="hidden lg:flex items-center space-x-4">
          <!-- Notifications (for logged in users) -->
          <button
            v-if="isLoggedIn"
            @click="toggleNotifications"
            class="relative p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM12 16V8a4 4 0 118 0v8l2 2H10l2-2z"/>
            </svg>
            <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ notificationCount }}
            </span>
          </button>

          <!-- User Menu (if logged in) -->
          <div v-if="isLoggedIn" class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 text-text-900 hover:text-primary transition-colors"
            >
              <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {{ userInitials }}
              </div>
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            
            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-10"
              @mouseleave="closeUserMenu"
            >
              <div class="px-4 py-2 border-b border-gray-200">
                <div class="text-sm font-medium text-text-900">{{ user.name }}</div>
                <div class="text-xs text-gray-500">{{ user.email }}</div>
              </div>
              <NuxtLink to="/profile" class="block px-4 py-2 text-sm text-text-900 hover:bg-gray-50" @click="closeUserMenu">
                Profil Saya
              </NuxtLink>
              <NuxtLink to="/settings" class="block px-4 py-2 text-sm text-text-900 hover:bg-gray-50" @click="closeUserMenu">
                Pengaturan
              </NuxtLink>
              <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-text-900 hover:bg-gray-50">
                Keluar
              </button>
            </div>
          </div>

          <!-- Auth Buttons (if not logged in) -->
          <div v-else class="flex items-center space-x-3">
            <NuxtLink
              to="/auth/login"
              class="text-text-900 hover:text-primary transition-colors"
            >
              Masuk
            </NuxtLink>
            <Button
              size="sm"
              @click="$router.push('/auth/register')"
            >
              Daftar Gratis
            </Button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 text-text-900 hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg v-if="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="showMobileMenu"
      class="lg:hidden bg-white border-t border-gray-200 mobile-menu"
    >
      <div class="px-4 py-6 space-y-6">
        <!-- User Section (if logged in) -->
        <div v-if="isLoggedIn" class="flex items-center space-x-3 pb-4 border-b border-gray-200">
          <div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-medium">
            {{ userInitials }}
          </div>
          <div>
            <div class="font-medium text-text-900">{{ user.name }}</div>
            <div class="text-sm text-gray-500">{{ user.email }}</div>
          </div>
        </div>

        <!-- Main Navigation -->
        <div class="space-y-4">
          <!-- For Tukang Section -->
          <div>
            <button
              @click="toggleMobileSection('tukang')"
              class="flex items-center justify-between w-full text-left font-medium text-text-900"
            >
              <span>Untuk Tukang</span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': mobileSections.tukang }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div v-if="mobileSections.tukang" class="mt-3 ml-4 space-y-3">
              <NuxtLink to="/courses" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Pelatihan & Sertifikasi
              </NuxtLink>
              <NuxtLink to="/tukang/dashboard" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Dashboard Tukang
              </NuxtLink>
              <NuxtLink to="/jobs/search" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Cari Pekerjaan
              </NuxtLink>
              <NuxtLink to="/tukang/profile/create" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Buat Profil
              </NuxtLink>
            </div>
          </div>

          <!-- For Clients Section -->
          <div>
            <button
              @click="toggleMobileSection('client')"
              class="flex items-center justify-between w-full text-left font-medium text-text-900"
            >
              <span>Untuk Klien</span>
              <svg class="w-5 h-5 transition-transform" :class="{ 'rotate-180': mobileSections.client }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div v-if="mobileSections.client" class="mt-3 ml-4 space-y-3">
              <NuxtLink to="/tukang/search" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Cari Tukang
              </NuxtLink>
              <NuxtLink to="/client/dashboard" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Dashboard Klien
              </NuxtLink>
              <NuxtLink to="/client/projects/create" class="block text-text-500 hover:text-primary" @click="closeMobileMenu">
                Post Proyek
              </NuxtLink>
            </div>
          </div>

          <!-- Direct Links -->
          <NuxtLink
            to="/courses"
            class="block font-medium text-text-900 hover:text-primary"
            @click="closeMobileMenu"
          >
            Pelatihan
          </NuxtLink>
          
        </div>

        <!-- Auth Section (if not logged in) -->
        <div v-if="!isLoggedIn" class="pt-4 border-t border-gray-200 space-y-3">
          <NuxtLink
            to="/auth/login"
            class="block w-full text-center py-3 text-text-900 hover:text-primary font-medium"
            @click="closeMobileMenu"
          >
            Masuk
          </NuxtLink>
          <Button
            size="lg"
            class="w-full"
            @click="$router.push('/auth/register'); closeMobileMenu()"
          >
            Daftar Gratis
          </Button>
        </div>

        <!-- User Actions (if logged in) -->
        <div v-else class="pt-4 border-t border-gray-200 space-y-3">
          <NuxtLink to="/profile" class="block text-text-900 hover:text-primary" @click="closeMobileMenu">
            Profil Saya
          </NuxtLink>
          <NuxtLink to="/settings" class="block text-text-900 hover:text-primary" @click="closeMobileMenu">
            Pengaturan
          </NuxtLink>
          <button @click="logout" class="block w-full text-left text-text-900 hover:text-primary">
            Keluar
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'

// Reactive data
const activeDropdown = ref(null)
const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const showNotifications = ref(false)
const mobileSections = ref({
  tukang: false,
  client: false
})

// Mock user data - in real app, this would come from auth store
const isLoggedIn = ref(false) // Change to true to test logged-in state
const user = ref({
  name: 'Ahmad Rizki',
  email: 'ahmad.rizki@email.com'
})
const notificationCount = ref(3)

// Computed
const userInitials = computed(() => {
  if (!user.value.name) return ''
  return user.value.name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Methods
const toggleDropdown = (dropdown) => {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

const closeDropdown = () => {
  activeDropdown.value = null
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    // Close other menus when mobile menu opens
    activeDropdown.value = null
    showUserMenu.value = false
  }
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  mobileSections.value = {
    tukang: false,
    client: false
  }
}

const toggleMobileSection = (section) => {
  mobileSections.value[section] = !mobileSections.value[section]
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const logout = () => {
  // In real app, handle logout logic
  isLoggedIn.value = false
  showUserMenu.value = false
  showMobileMenu.value = false
  // Redirect to home or login page
  navigateTo('/')
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const navbar = document.querySelector('nav')
    if (navbar && !navbar.contains(e.target)) {
      activeDropdown.value = null
      showUserMenu.value = false
      showNotifications.value = false
    }
  })
})

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>

<style scoped>
/* Ensure dropdowns appear above other content */
.z-10 {
  z-index: 10;
}

/* Smooth transitions */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-colors {
  transition: color 0.2s ease-in-out;
}

/* Mobile menu slide animation */
@media (max-width: 1023px) {
  .mobile-menu {
    animation: slideDown 0.3s ease-out;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
