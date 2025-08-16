<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-heading font-bold text-text-900">
              Dashboard Client
            </h1>
            <p class="text-text-500 mt-1">
              Kelola proyek dan temukan tukang terbaik
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div class="relative">
              <button 
                @click="showNotifications = !showNotifications"
                class="relative p-2 text-text-500 hover:text-text-900 hover:bg-bg-hover rounded-lg transition-colors"
              >
                <BellIcon size="24" />
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <!-- Notifications Dropdown -->
              <div
                v-if="showNotifications"
                class="absolute right-0 top-full mt-2 w-80 bg-bg-surface border border-border rounded-lg shadow-lg z-50"
                @click.stop
              >
                <div class="p-4 border-b border-border">
                  <h3 class="font-semibold text-text-900">Notifikasi</h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="p-4 border-b border-border hover:bg-bg-hover transition-colors cursor-pointer"
                    :class="{ 'bg-primary/5': !notification.read }"
                  >
                    <div class="flex items-start space-x-3">
                      <div class="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" v-if="!notification.read"></div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-text-900 mb-1">{{ notification.title }}</p>
                        <p class="text-sm text-text-500 mb-2">{{ notification.message }}</p>
                        <p class="text-xs text-text-400">{{ notification.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <button class="text-sm text-primary hover:text-primary-600 font-medium">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <NuxtLink to="/client/projects/create" class="btn-primary">
              + Buat Proyek
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Active Projects -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-heading font-semibold text-text-900">
                Proyek Aktif
              </h2>
              <NuxtLink 
                to="/client/projects" 
                class="text-primary hover:text-primary-600 text-sm font-medium"
              >
                Lihat Semua
              </NuxtLink>
            </div>

            <div class="space-y-4">
              <div
                v-for="project in activeProjects"
                :key="project.id"
                class="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h3 class="font-semibold text-text-900 mb-1">{{ project.title }}</h3>
                    <p class="text-sm text-text-500 mb-2">{{ project.description }}</p>
                    <div class="flex items-center space-x-4 text-sm text-text-500">
                      <span class="flex items-center">
                        <MapPinIcon size="16" class="mr-1" />
                        {{ project.location }}
                      </span>
                      <span class="flex items-center">
                        <CalendarIcon size="16" class="mr-1" />
                        {{ project.deadline }}
                      </span>
                      <span class="flex items-center">
                        <DollarSignIcon size="16" class="mr-1" />
                        {{ formatCurrency(project.budget) }}
                      </span>
                    </div>
                  </div>
                  <span 
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(project.status)"
                  >
                    {{ project.status }}
                  </span>
                </div>

                <!-- Project Progress -->
                <div class="mb-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium text-text-900">Progress</span>
                    <span class="text-sm text-text-500">{{ project.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-primary h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${project.progress}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Assigned Tukang -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <img
                      :src="project.tukang.avatar"
                      :alt="project.tukang.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p class="text-sm font-medium text-text-900">{{ project.tukang.name }}</p>
                      <div class="flex items-center space-x-1">
                        <StarIcon size="12" class="text-warning fill-current" />
                        <span class="text-xs text-text-500">{{ project.tukang.rating }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-2">
                    <button class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <MessageCircleIcon size="16" />
                    </button>
                    <button class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <PhoneIcon size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeProjects.length === 0" class="text-center py-8 text-text-500">
              <BriefcaseIcon size="48" class="mx-auto mb-4 opacity-50" />
              <p class="text-lg font-medium mb-2">Belum ada proyek aktif</p>
              <p class="text-sm mb-4">Mulai proyek pertama Anda dengan tukang terpercaya</p>
              <NuxtLink to="/client/projects/create" class="btn-primary">
                Buat Proyek Baru
              </NuxtLink>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card p-6">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Aktivitas Terbaru
            </h2>

            <div class="space-y-4">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div 
                  class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  :class="activity.iconBg"
                >
                  <component :is="activity.icon" size="20" :class="activity.iconColor" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text-900 mb-1">{{ activity.title }}</p>
                  <p class="text-xs text-text-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Quick Actions -->
          <div class="card p-6">
            <h3 class="text-lg font-heading font-semibold text-text-900 mb-4">
              Aksi Cepat
            </h3>
            
            <div class="space-y-3">
              <NuxtLink 
                to="/tukang/search" 
                class="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <SearchIcon size="20" class="text-text-500 group-hover:text-primary mr-3" />
                <span class="text-sm font-medium text-text-900">Cari Tukang</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/client/projects/create" 
                class="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <PlusIcon size="20" class="text-text-500 group-hover:text-primary mr-3" />
                <span class="text-sm font-medium text-text-900">Buat Proyek</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/client/tukang/favorites" 
                class="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <HeartIcon size="20" class="text-text-500 group-hover:text-primary mr-3" />
                <span class="text-sm font-medium text-text-900">Tukang Favorit</span>
              </NuxtLink>
              
              <NuxtLink 
                to="/client/reports" 
                class="flex items-center p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <BarChart3Icon size="20" class="text-text-500 group-hover:text-primary mr-3" />
                <span class="text-sm font-medium text-text-900">Laporan</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Recommended Tukang -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-heading font-semibold text-text-900">
                Tukang Rekomendasi
              </h3>
              <NuxtLink 
                to="/tukang/search"
                class="text-primary hover:text-primary-600 text-sm font-medium"
              >
                Lihat Semua
              </NuxtLink>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="tukang in recommendedTukang"
                :key="tukang.id"
                class="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div class="flex items-start space-x-3">
                  <img
                    :src="tukang.avatar"
                    :alt="tukang.name"
                    class="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-text-900 mb-1">{{ tukang.name }}</h4>
                    <p class="text-sm text-text-500 mb-2">{{ tukang.skill }}</p>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-1">
                        <StarIcon size="14" class="text-warning fill-current" />
                        <span class="text-sm text-text-900">{{ tukang.rating }}</span>
                        <span class="text-xs text-text-500">({{ tukang.reviews }})</span>
                      </div>
                      <span class="text-sm font-medium text-text-900">
                        {{ formatCurrency(tukang.rate) }}/jam
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 mt-3">
                  <button class="flex-1 btn-ghost text-sm">
                    Lihat Profil
                  </button>
                  <button class="flex-1 btn-primary text-sm">
                    Hubungi
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tips & Insights -->
          <div class="card p-6">
            <h3 class="text-lg font-heading font-semibold text-text-900 mb-4">
              Tips & Wawasan
            </h3>
            
            <div class="space-y-4">
              <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div class="flex items-start space-x-3">
                  <LightbulbIcon size="20" class="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 class="font-medium text-text-900 mb-1">
                      Pilih Tukang dengan Rating Tinggi
                    </h4>
                    <p class="text-sm text-text-600">
                      Tukang dengan rating 4.5+ memiliki tingkat kepuasan klien yang lebih tinggi.
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-success/5 border border-success/20 rounded-lg">
                <div class="flex items-start space-x-3">
                  <TrendingUpIcon size="20" class="text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 class="font-medium text-text-900 mb-1">
                      Komunikasi yang Jelas
                    </h4>
                    <p class="text-sm text-text-600">
                      Proyek dengan komunikasi yang jelas selesai 30% lebih cepat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any

// Component state
const showNotifications = ref(false)

// Mock data
const stats = reactive({
  activeProjects: 3,
  favoriteTukang: 8,
  totalSpent: 25500000,
  averageRating: 4.8,
  totalReviews: 24
})

const notifications = [
  {
    id: 1,
    title: 'Penawaran Diterima',
    message: 'Budi Santoso menerima proyek renovasi dapur Anda',
    time: '5 menit yang lalu',
    read: false
  },
  {
    id: 2,
    title: 'Proyek Selesai',
    message: 'Proyek perbaikan atap telah selesai dikerjakan',
    time: '2 jam yang lalu',
    read: false
  },
  {
    id: 3,
    title: 'Rating Tukang',
    message: 'Jangan lupa berikan rating untuk Ahmad Wijaya',
    time: '1 hari yang lalu',
    read: true
  }
]

const activeProjects = [
  {
    id: 1,
    title: 'Renovasi Dapur',
    description: 'Renovasi dapur lengkap dengan pemasangan keramik dan cat',
    location: 'Jakarta Selatan',
    deadline: '15 Des 2024',
    budget: 15000000,
    status: 'Dalam Progress',
    progress: 65,
    tukang: {
      name: 'Budi Santoso',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8
    }
  },
  {
    id: 2,
    title: 'Perbaikan Atap',
    description: 'Perbaikan genteng bocor dan plafon rusak',
    location: 'Jakarta Timur',
    deadline: '20 Des 2024',
    budget: 8500000,
    status: 'Menunggu Mulai',
    progress: 0,
    tukang: {
      name: 'Ahmad Wijaya',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9
    }
  }
]

const recentActivities = [
  {
    id: 1,
    title: 'Budi Santoso menyelesaikan 65% proyek renovasi dapur',
    time: '2 jam yang lalu',
    icon: 'CheckCircleIcon',
    iconBg: 'bg-success/10',
    iconColor: 'text-success'
  },
  {
    id: 2,
    title: 'Ahmad Wijaya menerima proyek perbaikan atap',
    time: '5 jam yang lalu',
    icon: 'UserPlusIcon',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary'
  },
  {
    id: 3,
    title: 'Pembayaran untuk proyek instalasi listrik berhasil',
    time: '1 hari yang lalu',
    icon: 'CreditCardIcon',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning'
  }
]

const recommendedTukang = [
  {
    id: 1,
    name: 'Slamet Raharjo',
    skill: 'Tukang Listrik',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviews: 28,
    rate: 75000
  },
  {
    id: 2,
    name: 'Hendra Susanto',
    skill: 'Tukang Plumbing',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviews: 19,
    rate: 65000
  },
  {
    id: 3,
    name: 'Dedi Kurniawan',
    skill: 'Tukang Cat',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviews: 22,
    rate: 55000
  }
]

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const getStatusClass = (status: string) => {
  const classes = {
    'Dalam Progress': 'bg-primary/10 text-primary',
    'Menunggu Mulai': 'bg-warning/10 text-warning',
    'Selesai': 'bg-success/10 text-success',
    'Dibatalkan': 'bg-danger/10 text-danger'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// SEO
useHead({
  title: 'Dashboard Kontraktor - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Dashboard kontraktor untuk mengelola proyek dan mencari tukang terpercaya di TukangIn'
    }
  ]
})
</script>
