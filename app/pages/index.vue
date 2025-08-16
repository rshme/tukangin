<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary to-primary-600 text-white">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <h1 class="text-4xl md:text-6xl font-heading font-bold mb-4">
              TukangIn
            </h1>
            <p class="text-xl md:text-2xl opacity-90">
              Platform Pelatihan & Sertifikasi & Sewa Jasa Tukang Indonesia
            </p>
          </div>

          <!-- Value Proposition -->
          <div class="mb-12">
            <p class="text-lg md:text-xl mb-6 opacity-90">
              Tingkatkan keahlian, dapatkan sertifikat, dan wujudkan karir impian sebagai tukang profesional
            </p>
            
            <!-- Key Benefits -->
            <div class="grid md:grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <UserIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Profil Profesional</h3>
                <p class="text-sm opacity-80">Buat portofolio dan showcase keahlian Anda</p>
              </div>
              <div class="text-center">
                <AwardIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Sertifikasi Resmi</h3>
                <p class="text-sm opacity-80">Dapatkan sertifikat yang diakui industri</p>
              </div>
              <div class="text-center">
                <BriefcaseIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Peluang Kerja</h3>
                <p class="text-sm opacity-80">Temukan proyek dan klien potensial</p>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/auth/register?role=tukang" class="btn-secondary w-full md:w-auto">
              <UserIcon size="20" class="mr-2" />
              Daftar sebagai Tukang
            </NuxtLink>
            <NuxtLink to="/auth/register?role=kontraktor" class="btn-ghost w-full md:w-auto">
              <BriefcaseIcon size="20" class="mr-2" />
              Daftar sebagai Kontraktor
            </NuxtLink>
            <NuxtLink to="/auth/register?role=pemilik" class="btn-ghost w-full md:w-auto">
              <HomeIcon size="20" class="mr-2" />
              Daftar sebagai Pemilik Rumah
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Tukang Section -->
    <section class="py-16 bg-bg-surface">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-text-900 mb-4">
            Tukang Terpercaya & Berpengalaman
          </h2>
          <p class="text-text-500 max-w-2xl mx-auto">
            Temukan tukang profesional dengan rating tinggi dan portofolio terbaik
          </p>
        </div>

        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 relative">
              <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari berdasarkan keahlian atau lokasi..."
                class="form-input pl-10 w-full"
              />
            </div>
            <select v-model="selectedSkill" class="form-input md:w-48">
              <option value="">Semua Keahlian</option>
              <option value="bangunan">Tukang Bangunan</option>
              <option value="listrik">Tukang Listrik</option>
              <option value="plumbing">Tukang Plumbing</option>
              <option value="cat">Tukang Cat</option>
              <option value="kayu">Tukang Kayu</option>
              <option value="atap">Tukang Atap</option>
            </select>
            <button
              @click="searchTukang"
              class="btn-primary whitespace-nowrap"
            >
              <SearchIcon size="20" class="mr-2" />
              Cari Tukang
            </button>
          </div>
        </div>

        <!-- Featured Tukang Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div
            v-for="tukang in filteredTukang"
            :key="tukang.id"
            class="card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Tukang Header -->
            <div class="text-center mb-4">
              <div class="relative inline-block mb-3">
                <img
                  :src="tukang.avatar"
                  :alt="tukang.name"
                  class="w-20 h-20 rounded-full object-cover mx-auto border-4 border-primary/10"
                />
                <div
                  v-if="tukang.isOnline"
                  class="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-3 border-white rounded-full"
                ></div>
                <div
                  v-if="tukang.isVerified"
                  class="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center"
                >
                  <CheckIcon size="14" />
                </div>
              </div>
              
              <h3 class="font-heading font-semibold text-lg text-text-900 mb-1">
                {{ tukang.name }}
              </h3>
              <p class="text-primary font-medium mb-2">{{ tukang.primarySkill }}</p>
              
              <!-- Rating -->
              <div class="flex items-center justify-center space-x-1 mb-3">
                <div class="flex items-center">
                  <StarIcon
                    v-for="i in 5"
                    :key="i"
                    size="16"
                    :class="i <= Math.floor(tukang.rating) ? 'text-warning fill-current' : 'text-gray-300'"
                  />
                </div>
                <span class="text-sm font-medium text-text-900 ml-1">
                  {{ tukang.rating }}
                </span>
                <span class="text-sm text-text-500">({{ tukang.reviewCount }})</span>
              </div>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1 justify-center">
                <span
                  v-for="skill in tukang.skills.slice(0, 3)"
                  :key="skill"
                  class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="tukang.skills.length > 3"
                  class="px-2 py-1 bg-gray-100 text-text-500 text-xs rounded-full"
                >
                  +{{ tukang.skills.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Location & Experience -->
            <div class="text-center mb-4 space-y-1">
              <div class="flex items-center justify-center text-sm text-text-500">
                <MapPinIcon size="14" class="mr-1" />
                <span>{{ tukang.location }}</span>
              </div>
              <div class="flex items-center justify-center text-sm text-text-500">
                <ClockIcon size="14" class="mr-1" />
                <span>{{ tukang.experience }} tahun pengalaman</span>
              </div>
            </div>

            <!-- Price -->
            <div class="text-center mb-4">
              <p class="text-lg font-bold text-text-900">
                {{ formatCurrency(tukang.hourlyRate) }}/jam
              </p>
              <p class="text-sm text-text-500">
                {{ formatCurrency(tukang.dailyRate) }}/hari
              </p>
            </div>

            <!-- Badges -->
            <div class="flex justify-center gap-1 mb-4">
              <span
                v-if="tukang.isVerified"
                class="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full"
              >
                <CheckIcon size="10" class="mr-1" />
                Verified
              </span>
              <span
                v-if="tukang.isCertified"
                class="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                <AwardIcon size="10" class="mr-1" />
                Certified
              </span>
              <span
                v-if="tukang.isOnline"
                class="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full"
              >
                <div class="w-2 h-2 bg-success rounded-full mr-1"></div>
                Online
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2">
              <button
                @click="quickHire(tukang)"
                class="w-full btn-primary text-sm"
              >
                <BriefcaseIcon size="16" class="mr-2" />
                Hire Sekarang
              </button>
              <button
                @click="startChat(tukang)"
                class="w-full btn-ghost text-sm"
              >
                <MessageCircleIcon size="16" class="mr-2" />
                Chat Langsung
              </button>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center">
          <NuxtLink
            to="/tukang/search"
            class="btn-ghost inline-flex items-center"
          >
            Lihat Semua Tukang
            <ChevronRightIcon size="20" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-3xl md:text-4xl font-bold text-primary mb-2">1,200+</div>
            <div class="text-text-600">Tukang Terdaftar</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-primary mb-2">5,000+</div>
            <div class="text-text-600">Proyek Selesai</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-primary mb-2">4.8/5</div>
            <div class="text-text-600">Rating Rata-rata</div>
          </div>
          <div>
            <div class="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
            <div class="text-text-600">Kepuasan Klien</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-bg-surface">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-text-900 mb-4">
            Kenapa Pilih TukangIn?
          </h2>
          <p class="text-text-500 max-w-2xl mx-auto">
            Platform lengkap untuk mengembangkan karir sebagai tukang profesional
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <BookOpenIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Pelatihan Berkualitas</h3>
            <p class="text-text-500">
              Materi pembelajaran dari ahli berpengalaman dengan sertifikat resmi
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <SmartphoneIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Belajar Fleksibel</h3>
            <p class="text-text-500">
              Akses materi kapan saja, di mana saja melalui smartphone atau laptop
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <UsersIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Komunitas Aktif</h3>
            <p class="text-text-500">
              Bergabung dengan ribuan tukang profesional se-Indonesia
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <TrendingUpIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Tingkatkan Penghasilan</h3>
            <p class="text-text-500">
              Dapatkan akses ke proyek-proyek dengan bayaran yang lebih tinggi
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <ShieldIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Sertifikat Terpercaya</h3>
            <p class="text-text-500">
              Sertifikat yang diakui oleh industri konstruksi Indonesia
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <MapPinIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Jangkauan Nasional</h3>
            <p class="text-text-500">
              Temukan peluang kerja di seluruh Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">
          Siap Memulai Perjalanan Anda?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Bergabunglah dengan ribuan tukang yang sudah memulai transformasi karir mereka
        </p>
        <NuxtLink to="/auth/register" class="btn-secondary">
          Mulai Sekarang - Gratis
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-text-900 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-4">
          <h3 class="text-xl font-heading font-bold">TukangIn</h3>
          <p class="text-sm opacity-80">Platform Tukang Indonesia</p>
        </div>
        <p class="text-sm opacity-60">
          © 2025 TukangIn. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare function navigateTo(url: string): any

// Component state
const searchQuery = ref('')
const selectedSkill = ref('')

// Mock featured tukang data
const featuredTukang = [
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Bangunan',
    skills: ['Bangunan', 'Listrik', 'Plumbing'],
    rating: 4.8,
    reviewCount: 24,
    experience: 8,
    location: 'Jakarta Selatan',
    hourlyRate: 65000,
    dailyRate: 500000,
    isOnline: true,
    isVerified: true,
    isCertified: true
  },
  {
    id: 2,
    name: 'Ahmad Wijaya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Listrik',
    skills: ['Listrik', 'Elektronik', 'Panel'],
    rating: 4.9,
    reviewCount: 31,
    experience: 12,
    location: 'Jakarta Timur',
    hourlyRate: 75000,
    dailyRate: 600000,
    isOnline: false,
    isVerified: true,
    isCertified: true
  },
  {
    id: 3,
    name: 'Slamet Raharjo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Plumbing',
    skills: ['Plumbing', 'Sanitasi', 'Air'],
    rating: 4.7,
    reviewCount: 18,
    experience: 6,
    location: 'Jakarta Barat',
    hourlyRate: 55000,
    dailyRate: 450000,
    isOnline: true,
    isVerified: false,
    isCertified: true
  },
  {
    id: 4,
    name: 'Dedi Kurniawan',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Cat',
    skills: ['Cat', 'Dekorasi', 'Finishing'],
    rating: 4.8,
    reviewCount: 22,
    experience: 9,
    location: 'Bandung',
    hourlyRate: 50000,
    dailyRate: 400000,
    isOnline: true,
    isVerified: true,
    isCertified: false
  },
  {
    id: 5,
    name: 'Hendra Susanto',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Kayu',
    skills: ['Kayu', 'Furniture', 'Pintu'],
    rating: 4.6,
    reviewCount: 15,
    experience: 7,
    location: 'Surabaya',
    hourlyRate: 60000,
    dailyRate: 480000,
    isOnline: false,
    isVerified: true,
    isCertified: true
  },
  {
    id: 6,
    name: 'Wahyu Prasetyo',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Atap',
    skills: ['Atap', 'Genteng', 'Plafon'],
    rating: 4.9,
    reviewCount: 28,
    experience: 11,
    location: 'Yogyakarta',
    hourlyRate: 70000,
    dailyRate: 550000,
    isOnline: true,
    isVerified: true,
    isCertified: true
  },
  {
    id: 7,
    name: 'Agus Setiawan',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Besi',
    skills: ['Las', 'Besi', 'Konstruksi'],
    rating: 4.7,
    reviewCount: 19,
    experience: 10,
    location: 'Medan',
    hourlyRate: 65000,
    dailyRate: 520000,
    isOnline: true,
    isVerified: true,
    isCertified: true
  },
  {
    id: 8,
    name: 'Rudi Hartono',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Keramik',
    skills: ['Keramik', 'Granit', 'Marmer'],
    rating: 4.8,
    reviewCount: 26,
    experience: 8,
    location: 'Semarang',
    hourlyRate: 58000,
    dailyRate: 460000,
    isOnline: false,
    isVerified: true,
    isCertified: false
  }
]

// Computed properties
const filteredTukang = computed(() => {
  let filtered = [...featuredTukang]
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(tukang => 
      tukang.name.toLowerCase().includes(query) ||
      tukang.primarySkill.toLowerCase().includes(query) ||
      tukang.location.toLowerCase().includes(query) ||
      tukang.skills.some(skill => skill.toLowerCase().includes(query))
    )
  }
  
  // Filter by selected skill
  if (selectedSkill.value) {
    filtered = filtered.filter(tukang => 
      tukang.primarySkill.toLowerCase().includes(selectedSkill.value.toLowerCase()) ||
      tukang.skills.some(skill => skill.toLowerCase().includes(selectedSkill.value.toLowerCase()))
    )
  }
  
  // Show max 8 tukang on landing page
  return filtered.slice(0, 8)
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const searchTukang = () => {
  // Navigate to search page with current filters
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('search', searchQuery.value)
  if (selectedSkill.value) params.set('skill', selectedSkill.value)
  
  const url = `/tukang/search${params.toString() ? '?' + params.toString() : ''}`
  navigateTo(url)
}

const quickHire = (tukang: any) => {
  // Navigate to project creation with pre-selected tukang
  navigateTo(`/kontraktor/projects/create?tukang=${tukang.id}`)
}

const startChat = (tukang: any) => {
  // Navigate to chat or login if not authenticated
  navigateTo(`/auth/login?redirect=/kontraktor/chat/${tukang.id}`)
}

// SEO and meta configuration
useHead({
  title: 'TukangIn - Platform Pelatihan Tukang Indonesia',
  meta: [
    {
      name: 'description',
      content: 'Platform pelatihan, sertifikasi, dan personal branding untuk tukang informal Indonesia. Tingkatkan keahlian dan dapatkan peluang kerja lebih baik.'
    },
    {
      property: 'og:title',
      content: 'TukangIn - Platform Pelatihan Tukang Indonesia'
    },
    {
      property: 'og:description',
      content: 'Bergabunglah dengan ribuan tukang profesional. Dapatkan pelatihan, sertifikasi, dan peluang kerja terbaik.'
    }
  ]
})
</script>