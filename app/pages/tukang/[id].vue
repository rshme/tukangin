<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <button @click="goBack" class="flex items-center text-text-500 hover:text-text-900">
            <ChevronLeftIcon size="20" class="mr-2" />
            Kembali
          </button>
          
          <div class="flex items-center space-x-4">
            <button
              @click="toggleFavorite"
              class="p-2 text-text-400 hover:text-danger transition-colors"
            >
              <HeartIcon 
                size="24" 
                :class="{ 'fill-current text-danger': isFavorite }"
              />
            </button>
            <button
              @click="shareProfile"
              class="p-2 text-text-400 hover:text-primary transition-colors"
            >
              <ShareIcon size="24" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Profile -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Header -->
          <div class="card p-6">
            <div class="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <!-- Avatar -->
              <div class="relative flex-shrink-0">
                <img
                  :src="tukang.avatar"
                  :alt="tukang.name"
                  class="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                />
                <div
                  v-if="tukang.isOnline"
                  class="absolute -bottom-2 -right-2 w-8 h-8 bg-success border-4 border-white rounded-full"
                ></div>
                <div
                  v-if="tukang.isVerified"
                  class="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center"
                >
                  <CheckIcon size="16" />
                </div>
              </div>

              <!-- Basic Info -->
              <div class="flex-1">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 class="text-2xl md:text-3xl font-heading font-bold text-text-900 mb-2">
                      {{ tukang.name }}
                    </h1>
                    <p class="text-lg text-primary font-medium mb-3">{{ tukang.primarySkill }}</p>
                    
                    <!-- Rating -->
                    <div class="flex items-center space-x-3 mb-3">
                      <div class="flex items-center space-x-1">
                        <div class="flex items-center">
                          <StarIcon
                            v-for="i in 5"
                            :key="i"
                            size="20"
                            :class="i <= Math.floor(tukang.rating) ? 'text-warning fill-current' : 'text-gray-300'"
                          />
                        </div>
                        <span class="text-lg font-bold text-text-900 ml-2">{{ tukang.rating }}</span>
                      </div>
                      <span class="text-text-500">({{ tukang.reviewCount }} ulasan)</span>
                    </div>

                    <!-- Location & Experience -->
                    <div class="flex flex-wrap items-center gap-4 text-text-500">
                      <div class="flex items-center">
                        <MapPinIcon size="16" class="mr-1" />
                        <span>{{ tukang.location }}</span>
                      </div>
                      <div class="flex items-center">
                        <ClockIcon size="16" class="mr-1" />
                        <span>{{ tukang.experience }} tahun pengalaman</span>
                      </div>
                      <div class="flex items-center">
                        <UserCheckIcon size="16" class="mr-1" />
                        <span>{{ tukang.completedProjects }} proyek selesai</span>
                      </div>
                    </div>
                  </div>

                  <!-- Pricing -->
                  <div class="text-left md:text-right mt-4 md:mt-0">
                    <div class="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p class="text-2xl font-bold text-text-900 mb-1">
                        {{ formatCurrency(tukang.hourlyRate) }}/jam
                      </p>
                      <p class="text-sm text-text-500 mb-3">
                        {{ formatCurrency(tukang.dailyRate) }}/hari
                      </p>
                      <div class="flex items-center justify-center md:justify-end space-x-1 text-sm">
                        <TrendingUpIcon size="14" class="text-success" />
                        <span class="text-success">Respons cepat</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    v-if="tukang.isVerified"
                    class="inline-flex items-center px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                  >
                    <CheckIcon size="14" class="mr-2" />
                    Terverifikasi
                  </span>
                  <span
                    v-if="tukang.isCertified"
                    class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    <AwardIcon size="14" class="mr-2" />
                    Bersertifikat
                  </span>
                  <span
                    v-if="tukang.isOnline"
                    class="inline-flex items-center px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                  >
                    <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                    Online Sekarang
                  </span>
                  <span
                    v-if="tukang.responseTime <= 60"
                    class="inline-flex items-center px-3 py-1 bg-warning/10 text-warning text-sm rounded-full"
                  >
                    <ZapIcon size="14" class="mr-2" />
                    Respons {{ tukang.responseTime }} menit
                  </span>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-3">
                  <button
                    @click="startChat"
                    class="flex-1 btn-primary"
                  >
                    <MessageCircleIcon size="20" class="mr-2" />
                    Chat Sekarang
                  </button>
                  <button
                    @click="quickHire"
                    class="flex-1 btn-secondary"
                  >
                    <BriefcaseIcon size="20" class="mr-2" />
                    Hire Langsung
                  </button>
                  <button
                    @click="callTukang"
                    class="btn-ghost px-6"
                  >
                    <PhoneIcon size="20" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- About -->
          <div class="card p-6">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
              Tentang Saya
            </h2>
            <p class="text-text-600 leading-relaxed">
              {{ tukang.description }}
            </p>
          </div>

          <!-- Skills & Expertise -->
          <div class="card p-6">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
              Keahlian & Spesialisasi
            </h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Primary Skill -->
              <div>
                <h3 class="font-medium text-text-900 mb-3">Keahlian Utama</h3>
                <div class="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ToolIcon size="24" class="text-primary" />
                    </div>
                    <div>
                      <p class="font-medium text-text-900">{{ tukang.primarySkill }}</p>
                      <p class="text-sm text-text-500">{{ tukang.experience }} tahun</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Additional Skills -->
              <div>
                <h3 class="font-medium text-text-900 mb-3">Keahlian Tambahan</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in tukang.skills"
                    :key="skill"
                    class="px-3 py-2 bg-bg-page border border-border rounded-lg text-sm text-text-900"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Portfolio -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-heading font-semibold text-text-900">
                Portofolio Pekerjaan
              </h2>
              <button
                v-if="tukang.portfolioImages.length > 6"
                @click="showAllPortfolio = !showAllPortfolio"
                class="text-primary hover:text-primary-600 text-sm font-medium"
              >
                {{ showAllPortfolio ? 'Tutup' : `Lihat Semua (${tukang.portfolioImages.length})` }}
              </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="(image, index) in displayedPortfolio"
                :key="index"
                class="aspect-square relative group cursor-pointer"
                @click="openImageModal(image, index)"
              >
                <img
                  :src="image"
                  alt="Portfolio"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <ZoomInIcon size="24" class="text-white" />
                </div>
              </div>
            </div>
            
            <div v-if="tukang.portfolioImages.length === 0" class="text-center py-8 text-text-500">
              <ImageIcon size="48" class="mx-auto mb-4 opacity-50" />
              <p>Belum ada portofolio yang ditambahkan</p>
            </div>
          </div>

          <!-- Certificates -->
          <div class="card p-6">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Sertifikat & Kualifikasi
            </h2>
            
            <div class="space-y-4">
              <div
                v-for="cert in tukang.certificates"
                :key="cert.id"
                class="flex items-start space-x-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div class="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AwardIcon size="24" class="text-success" />
                </div>
                <div class="flex-1">
                  <h3 class="font-medium text-text-900 mb-1">{{ cert.name }}</h3>
                  <p class="text-sm text-text-500 mb-2">{{ cert.issuer }} • {{ cert.year }}</p>
                  <div class="flex items-center space-x-4">
                    <span class="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                      <CheckIcon size="10" class="mr-1" />
                      Terverifikasi
                    </span>
                    <button class="text-primary hover:text-primary-600 text-sm font-medium">
                      Lihat Sertifikat
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="tukang.certificates.length === 0" class="text-center py-8 text-text-500">
              <AwardIcon size="48" class="mx-auto mb-4 opacity-50" />
              <p>Belum ada sertifikat yang ditambahkan</p>
            </div>
          </div>

          <!-- Reviews -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-heading font-semibold text-text-900">
                Ulasan Pelanggan
              </h2>
              <button
                v-if="reviews.length > 3"
                @click="showAllReviews = !showAllReviews"
                class="text-primary hover:text-primary-600 text-sm font-medium"
              >
                {{ showAllReviews ? 'Tutup' : `Lihat Semua (${reviews.length})` }}
              </button>
            </div>

            <!-- Rating Summary -->
            <div class="bg-bg-page rounded-lg p-4 mb-6">
              <div class="flex items-center justify-between">
                <div class="text-center">
                  <div class="text-3xl font-bold text-text-900 mb-1">{{ tukang.rating }}</div>
                  <div class="flex items-center justify-center mb-1">
                    <StarIcon
                      v-for="i in 5"
                      :key="i"
                      size="16"
                      :class="i <= Math.floor(tukang.rating) ? 'text-warning fill-current' : 'text-gray-300'"
                    />
                  </div>
                  <div class="text-sm text-text-500">{{ tukang.reviewCount }} ulasan</div>
                </div>
                
                <div class="flex-1 ml-8">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center space-x-2 mb-1">
                    <span class="text-sm w-4">{{ star }}</span>
                    <StarIcon size="12" class="text-warning fill-current" />
                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-warning h-2 rounded-full"
                        :style="{ width: `${getRatingPercentage(star)}%` }"
                      ></div>
                    </div>
                    <span class="text-xs text-text-500 w-8">{{ getRatingCount(star) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Individual Reviews -->
            <div class="space-y-6">
              <div
                v-for="review in displayedReviews"
                :key="review.id"
                class="border-b border-border pb-6 last:border-b-0 last:pb-0"
              >
                <div class="flex items-start space-x-4">
                  <img
                    :src="review.avatar"
                    :alt="review.name"
                    class="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <h4 class="font-medium text-text-900">{{ review.name }}</h4>
                        <div class="flex items-center space-x-2">
                          <div class="flex items-center">
                            <StarIcon
                              v-for="i in 5"
                              :key="i"
                              size="14"
                              :class="i <= review.rating ? 'text-warning fill-current' : 'text-gray-300'"
                            />
                          </div>
                          <span class="text-sm text-text-500">{{ review.date }}</span>
                        </div>
                      </div>
                    </div>
                    <p class="text-text-600 mb-3">{{ review.comment }}</p>
                    <div v-if="review.project" class="text-sm text-text-500">
                      Proyek: {{ review.project }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="reviews.length === 0" class="text-center py-8 text-text-500">
              <MessageSquareIcon size="48" class="mx-auto mb-4 opacity-50" />
              <p>Belum ada ulasan</p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Contact -->
          <div class="card p-6 sticky top-8">
            <h3 class="font-heading font-semibold text-text-900 mb-4">
              Kontak Langsung
            </h3>
            
            <div class="space-y-3">
              <button
                @click="startChat"
                class="w-full btn-primary"
              >
                <MessageCircleIcon size="20" class="mr-2" />
                Chat via App
              </button>
              
              <button
                @click="chatWhatsApp"
                class="w-full btn-ghost border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircleIcon size="20" class="mr-2" />
                WhatsApp
              </button>
              
              <button
                @click="callTukang"
                class="w-full btn-ghost"
              >
                <PhoneIcon size="20" class="mr-2" />
                Telepon
              </button>
            </div>

            <!-- Availability -->
            <div class="mt-6 pt-6 border-t border-border">
              <h4 class="font-medium text-text-900 mb-3">Ketersediaan</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-text-500">Status</span>
                  <span class="text-success font-medium">{{ tukang.availability }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-text-500">Respons</span>
                  <span class="text-text-900">~{{ tukang.responseTime }} menit</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-text-500">Area kerja</span>
                  <span class="text-text-900">{{ tukang.workRadius }} km</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Similar Tukang -->
          <div class="card p-6">
            <h3 class="font-heading font-semibold text-text-900 mb-4">
              Tukang Serupa
            </h3>
            
            <div class="space-y-4">
              <div
                v-for="similar in similarTukang"
                :key="similar.id"
                class="flex items-center space-x-3 cursor-pointer hover:bg-bg-hover p-3 rounded-lg transition-colors"
                @click="navigateToProfile(similar.id)"
              >
                <img
                  :src="similar.avatar"
                  :alt="similar.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-text-900 truncate">{{ similar.name }}</h4>
                  <p class="text-sm text-text-500 truncate">{{ similar.primarySkill }}</p>
                  <div class="flex items-center space-x-1">
                    <StarIcon size="12" class="text-warning fill-current" />
                    <span class="text-sm text-text-900">{{ similar.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Report Profile -->
          <div class="card p-6">
            <button
              @click="reportProfile"
              class="w-full text-left text-danger hover:text-danger/80 text-sm"
            >
              <FlagIcon size="16" class="mr-2 inline" />
              Laporkan Profil
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      @click="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <img
          :src="selectedImage"
          alt="Portfolio"
          class="max-w-full max-h-full object-contain"
        />
        <button
          @click="closeImageModal"
          class="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
        >
          <XIcon size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare function navigateTo(url: string): any

// Get tukang ID from route
const route = useRoute()
const tukangId = route.params.id

// Component state
const showAllPortfolio = ref(false)
const showAllReviews = ref(false)
const selectedImage = ref<string | null>(null)
const isFavorite = ref(false)

// Mock data - in real app, fetch from API using tukangId
const tukang = ref({
  id: 1,
  name: 'Budi Santoso',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  primarySkill: 'Tukang Bangunan',
  skills: ['Listrik', 'Plumbing', 'Cat', 'Keramik'],
  rating: 4.8,
  reviewCount: 24,
  experience: 8,
  location: 'Jakarta Selatan',
  completedProjects: 47,
  hourlyRate: 65000,
  dailyRate: 500000,
  responseTime: 15,
  availability: 'Tersedia',
  workRadius: 15,
  isOnline: true,
  isVerified: true,
  isCertified: true,
  description: 'Tukang bangunan berpengalaman dengan keahlian listrik dan plumbing. Sudah menangani berbagai proyek renovasi rumah dari skala kecil hingga besar. Mengutamakan kualitas kerja dan ketepatan waktu. Bersedia bekerja di area Jakarta dan sekitarnya.',
  portfolioImages: [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop'
  ],
  certificates: [
    {
      id: 1,
      name: 'Tukang Bangunan Bersertifikat',
      issuer: 'Kemnaker RI',
      year: 2020
    },
    {
      id: 2,
      name: 'Keselamatan Kerja Konstruksi',
      issuer: 'BNSP',
      year: 2022
    }
  ]
})

const reviews = ref([
  {
    id: 1,
    name: 'Andi Prasetyo',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Kerja sangat rapi dan tepat waktu. Budi sangat profesional dan komunikatif. Hasil renovasi dapur memuaskan sekali.',
    date: '2 minggu lalu',
    project: 'Renovasi Dapur'
  },
  {
    id: 2,
    name: 'Sari Dewi',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b000?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Sangat puas dengan hasilnya. Budi juga memberikan saran yang bagus untuk perbaikan listrik rumah.',
    date: '1 bulan lalu',
    project: 'Perbaikan Listrik'
  },
  {
    id: 3,
    name: 'Joko Widodo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment: 'Bagus, hanya saja agak lama karena hujan. Tapi hasil akhirnya memuaskan.',
    date: '2 bulan lalu',
    project: 'Perbaikan Atap'
  }
])

const similarTukang = ref([
  {
    id: 2,
    name: 'Ahmad Wijaya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    primarySkill: 'Tukang Listrik',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Slamet Raharjo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    primarySkill: 'Tukang Plumbing',
    rating: 4.7
  }
])

// Computed properties
const displayedPortfolio = computed(() => {
  if (showAllPortfolio.value) {
    return tukang.value.portfolioImages
  }
  return tukang.value.portfolioImages.slice(0, 6)
})

const displayedReviews = computed(() => {
  if (showAllReviews.value) {
    return reviews.value
  }
  return reviews.value.slice(0, 3)
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const getRatingPercentage = (star: number) => {
  // Mock calculation - in real app, calculate from actual review data
  const ratings = { 5: 18, 4: 4, 3: 1, 2: 1, 1: 0 }
  return (ratings[star as keyof typeof ratings] / tukang.value.reviewCount) * 100
}

const getRatingCount = (star: number) => {
  const ratings = { 5: 18, 4: 4, 3: 1, 2: 1, 1: 0 }
  return ratings[star as keyof typeof ratings]
}

const goBack = () => {
  navigateTo(`/tukang/search`)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const shareProfile = () => {
  if (navigator.share) {
    navigator.share({
      title: `${tukang.value.name} - ${tukang.value.primarySkill}`,
      text: `Lihat profil ${tukang.value.name} di TukangIn`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link profil disalin ke clipboard')
  }
}

const startChat = () => {
  navigateTo(`/chat/${tukang.value.id}`)
}

const quickHire = () => {
  navigateTo(`/client/projects/create?tukang=${tukang.value.id}`)
}

const callTukang = () => {
  window.open(`tel:+62812345678`, '_self')
}

const chatWhatsApp = () => {
  const message = encodeURIComponent(`Halo ${tukang.value.name}, saya tertarik dengan jasa Anda. Bisakah kita diskusi lebih lanjut?`)
  window.open(`https://wa.me/62812345678?text=${message}`, '_blank')
}

const openImageModal = (image: string, index: number) => {
  selectedImage.value = image
}

const closeImageModal = () => {
  selectedImage.value = null
}

const navigateToProfile = (id: number) => {
  navigateTo(`/tukang/${id}`)
}

const reportProfile = () => {
  alert('Fitur laporan akan segera tersedia')
}

// SEO
useHead({
  title: `${tukang.value.name} - ${tukang.value.primarySkill} | TukangIn`,
  meta: [
    {
      name: 'description',
      content: `Profil ${tukang.value.name}, ${tukang.value.primarySkill} berpengalaman ${tukang.value.experience} tahun dengan rating ${tukang.value.rating}/5 di TukangIn`
    }
  ]
})
</script>
