<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Search Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <!-- Search Bar -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div class="flex-1 max-w-2xl">
            <div class="relative">
              <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari proyek, keahlian, atau lokasi..."
                class="form-input pl-10 pr-4"
                @keyup.enter="performSearch"
              />
              <button
                @click="performSearch"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-4 py-1.5"
              >
                Cari
              </button>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="showFilters = !showFilters"
              class="btn-ghost flex items-center"
            >
              <FilterIcon size="20" class="mr-2" />
              Filter
              <span v-if="activeFiltersCount > 0" class="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">
                {{ activeFiltersCount }}
              </span>
            </button>
            
            <select v-model="sortBy" class="form-input w-48">
              <option value="newest">Terbaru</option>
              <option value="budget_high">Budget Tertinggi</option>
              <option value="budget_low">Budget Terendah</option>
              <option value="deadline">Deadline Terdekat</option>
              <option value="location">Lokasi Terdekat</option>
            </select>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="filter in activeFilters"
            :key="filter.key"
            class="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            {{ filter.label }}
            <button
              @click="removeFilter(filter.key)"
              class="ml-2 hover:bg-primary/20 rounded-full p-0.5"
            >
              <XIcon size="14" />
            </button>
          </span>
          <button
            @click="clearAllFilters"
            class="text-danger text-sm hover:underline"
          >
            Hapus Semua
          </button>
        </div>

        <!-- Results Summary -->
        <div class="flex items-center justify-between text-sm text-text-500">
          <span>
            Menampilkan {{ filteredJobs.length }} dari {{ totalJobs }} proyek
            <span v-if="searchQuery" class="font-medium">untuk "{{ searchQuery }}"</span>
          </span>
          <span>Diperbarui {{ lastUpdated }}</span>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div
          class="lg:w-80"
          :class="{ 'hidden lg:block': !showFilters }"
        >
          <div class="card p-6 sticky top-4">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-heading font-semibold text-text-900">Filter Pencarian</h3>
              <button
                @click="showFilters = false"
                class="lg:hidden text-text-500 hover:text-text-900"
              >
                <XIcon size="20" />
              </button>
            </div>

            <div class="space-y-6">
              <!-- Location Filter -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Lokasi</h4>
                <div class="space-y-2">
                  <label
                    v-for="city in cities"
                    :key="city.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.location"
                      :value="city.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">{{ city.label }}</span>
                    <span class="ml-auto text-xs text-text-500">({{ city.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Skills Filter -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Keahlian</h4>
                <div class="space-y-2">
                  <label
                    v-for="skill in skills"
                    :key="skill.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.skills"
                      :value="skill.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">{{ skill.label }}</span>
                    <span class="ml-auto text-xs text-text-500">({{ skill.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Budget Range -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Budget</h4>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label for="budgetMin" class="block text-xs text-text-500 mb-1">Minimum</label>
                      <input
                        id="budgetMin"
                        v-model="filters.budgetMin"
                        type="number"
                        min="0"
                        step="100000"
                        class="form-input text-sm"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label for="budgetMax" class="block text-xs text-text-500 mb-1">Maksimum</label>
                      <input
                        id="budgetMax"
                        v-model="filters.budgetMax"
                        type="number"
                        min="0"
                        step="100000"
                        class="form-input text-sm"
                        placeholder="∞"
                      />
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <label
                      v-for="range in budgetRanges"
                      :key="range.value"
                      class="flex items-center cursor-pointer"
                    >
                      <input
                        v-model="filters.budgetRange"
                        :value="range.value"
                        type="radio"
                        name="budgetRange"
                        class="h-4 w-4 text-primary border-border focus:ring-primary mr-3"
                      />
                      <span class="text-sm text-text-900">{{ range.label }}</span>
                      <span class="ml-auto text-xs text-text-500">({{ range.count }})</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Project Type -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Jenis Proyek</h4>
                <div class="space-y-2">
                  <label
                    v-for="type in projectTypes"
                    :key="type.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.projectType"
                      :value="type.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">{{ type.label }}</span>
                    <span class="ml-auto text-xs text-text-500">({{ type.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Urgency -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Tingkat Urgensi</h4>
                <div class="space-y-2">
                  <label
                    v-for="urgency in urgencyLevels"
                    :key="urgency.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.urgency"
                      :value="urgency.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">{{ urgency.label }}</span>
                    <span class="ml-auto text-xs text-text-500">({{ urgency.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Additional Filters -->
              <div>
                <h4 class="font-medium text-text-900 mb-3">Lainnya</h4>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="filters.withImages"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">Ada Foto</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="filters.verifiedOnly"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">Client Terverifikasi</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="filters.openApplications"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">Masih Buka Lamaran</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              @click="applyFilters"
              class="btn-primary w-full mt-6"
            >
              Terapkan Filter
            </button>
          </div>
        </div>

        <!-- Results List -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-4">
            <div
              v-for="i in 5"
              :key="i"
              class="card p-6 animate-pulse"
            >
              <div class="flex space-x-4">
                <div class="w-24 h-24 bg-gray-200 rounded-lg"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Results -->
          <div v-else-if="filteredJobs.length > 0" class="space-y-4">
            <div
              v-for="job in paginatedJobs"
              :key="job.id"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToJob(job.id)"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <!-- Project Image -->
                <div class="md:w-32 md:h-32 w-full h-48 flex-shrink-0">
                  <img
                    v-if="job.images && job.images.length > 0"
                    :src="job.images[0]"
                    :alt="job.title"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center"
                  >
                    <ImageIcon size="32" class="text-gray-400" />
                  </div>
                </div>

                <!-- Project Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg font-semibold text-text-900 mb-1 truncate">
                        {{ job.title }}
                      </h3>
                      <div class="flex items-center space-x-4 text-sm text-text-500 mb-2">
                        <div class="flex items-center">
                          <MapPinIcon size="16" class="mr-1" />
                          {{ job.location }}
                        </div>
                        <div class="flex items-center">
                          <CalendarIcon size="16" class="mr-1" />
                          {{ formatDate(job.startDate) }}
                        </div>
                        <div class="flex items-center">
                          <ClockIcon size="16" class="mr-1" />
                          {{ job.timeAgo }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Urgency Badge -->
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full flex-shrink-0"
                      :class="getUrgencyClass(job.urgency)"
                    >
                      {{ getUrgencyLabel(job.urgency) }}
                    </span>
                  </div>

                  <p class="text-text-600 mb-4 line-clamp-2">
                    {{ job.description }}
                  </p>

                  <!-- Skills Required -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="skill in job.skills.slice(0, 3)"
                      :key="skill"
                      class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {{ getSkillLabel(skill) }}
                    </span>
                    <span
                      v-if="job.skills.length > 3"
                      class="px-2 py-1 bg-gray-100 text-text-500 text-xs rounded-full"
                    >
                      +{{ job.skills.length - 3 }} lainnya
                    </span>
                  </div>

                  <!-- Bottom Info -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <!-- Budget -->
                      <div>
                        <span class="text-lg font-bold text-text-900">
                          {{ formatBudget(job) }}
                        </span>
                      </div>
                      
                      <!-- Applications Count -->
                      <div class="flex items-center text-sm text-text-500">
                        <UsersIcon size="16" class="mr-1" />
                        {{ job.applicationsCount }} lamaran
                      </div>
                    </div>

                    <!-- Client Info -->
                    <div class="flex items-center space-x-2">
                      <img
                        :src="job.client.avatar"
                        :alt="job.client.name"
                        class="w-8 h-8 rounded-full"
                      />
                      <div class="text-sm">
                        <div class="flex items-center">
                          <span class="font-medium text-text-900">{{ job.client.name }}</span>
                          <CheckCircleIcon
                            v-if="job.client.verified"
                            size="16"
                            class="ml-1 text-success"
                          />
                        </div>
                        <div class="flex items-center text-text-500">
                          <StarIcon size="12" class="mr-1" />
                          {{ job.client.rating }} ({{ job.client.reviewsCount }})
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <SearchIcon size="48" class="mx-auto text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-text-900 mb-2">
              Tidak ada proyek ditemukan
            </h3>
            <p class="text-text-500 mb-6">
              Coba ubah kata kunci pencarian atau filter yang dipilih
            </p>
            <button
              @click="clearAllFilters"
              class="btn-primary"
            >
              Hapus Semua Filter
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8">
            <div class="flex items-center space-x-2">
              <button
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
                class="btn-ghost"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <ChevronLeftIcon size="20" />
              </button>
              
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                class="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors"
                :class="page === currentPage 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 text-text-900'"
              >
                {{ page }}
              </button>
              
              <button
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
                class="btn-ghost"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              >
                <ChevronRightIcon size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// Types
interface Job {
  id: string
  title: string
  description: string
  location: string
  city: string
  startDate: string
  urgency: 'low' | 'medium' | 'high'
  budget?: number
  budgetMin?: number
  budgetMax?: number
  budgetType: 'fixed' | 'range'
  skills: string[]
  images?: string[]
  applicationsCount: number
  timeAgo: string
  client: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    reviewsCount: number
  }
}

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare const useRouter: any
declare function navigateTo(url: string): any

const route = useRoute()
const router = useRouter()

// Component state
const searchQuery = ref(route.query.q || '')
const showFilters = ref(false)
const isLoading = ref(false)
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const filters = reactive({
  location: [] as string[],
  skills: [] as string[],
  budgetMin: null as number | null,
  budgetMax: null as number | null,
  budgetRange: '',
  projectType: [] as string[],
  urgency: [] as string[],
  withImages: false,
  verifiedOnly: false,
  openApplications: false
})

// Filter options
const cities = [
  { value: 'jakarta', label: 'Jakarta', count: 125 },
  { value: 'bandung', label: 'Bandung', count: 89 },
  { value: 'surabaya', label: 'Surabaya', count: 76 },
  { value: 'medan', label: 'Medan', count: 45 },
  { value: 'yogyakarta', label: 'Yogyakarta', count: 34 },
  { value: 'semarang', label: 'Semarang', count: 28 }
]

const skills = [
  { value: 'bangunan', label: 'Tukang Bangunan', count: 89 },
  { value: 'listrik', label: 'Tukang Listrik', count: 67 },
  { value: 'plumbing', label: 'Tukang Plumbing', count: 54 },
  { value: 'cat', label: 'Tukang Cat', count: 78 },
  { value: 'kayu', label: 'Tukang Kayu', count: 45 },
  { value: 'keramik', label: 'Tukang Keramik', count: 38 }
]

const budgetRanges = [
  { value: '0-5000000', label: 'Di bawah 5 Juta', count: 45 },
  { value: '5000000-15000000', label: '5 - 15 Juta', count: 89 },
  { value: '15000000-50000000', label: '15 - 50 Juta', count: 67 },
  { value: '50000000+', label: 'Di atas 50 Juta', count: 23 }
]

const projectTypes = [
  { value: 'renovasi', label: 'Renovasi', count: 112 },
  { value: 'pembangunan', label: 'Pembangunan Baru', count: 78 },
  { value: 'perbaikan', label: 'Perbaikan', count: 89 },
  { value: 'instalasi', label: 'Instalasi', count: 45 }
]

const urgencyLevels = [
  { value: 'low', label: 'Normal', count: 145 },
  { value: 'medium', label: 'Mendesak', count: 78 },
  { value: 'high', label: 'Sangat Mendesak', count: 23 }
]

// Mock data
const allJobs = ref<Job[]>([
  {
    id: '1',
    title: 'Renovasi Kamar Mandi Utama',
    description: 'Renovasi total kamar mandi utama termasuk pergantian keramik, fixtures, dan sistem plumbing. Ukuran 3x4 meter dengan desain modern minimalis.',
    location: 'Kebayoran Baru, Jakarta Selatan',
    city: 'jakarta',
    startDate: '2024-02-15',
    urgency: 'medium',
    budgetType: 'range',
    budgetMin: 15000000,
    budgetMax: 25000000,
    skills: ['plumbing', 'keramik', 'listrik'],
    images: ['/images/bathroom-1.jpg'],
    applicationsCount: 12,
    timeAgo: '2 jam lalu',
    client: {
      id: 'c1',
      name: 'Budi Santoso',
      avatar: '/images/avatar-1.jpg',
      verified: true,
      rating: 4.8,
      reviewsCount: 23
    }
  },
  {
    id: '2',
    title: 'Pembangunan Rumah 2 Lantai',
    description: 'Pembangunan rumah baru 2 lantai dengan luas bangunan 120m2. Sudah ada izin IMB dan desain arsitek. Lokasi strategis di perumahan.',
    location: 'Cimahi, Bandung',
    city: 'bandung',
    startDate: '2024-03-01',
    urgency: 'low',
    budgetType: 'fixed',
    budget: 450000000,
    skills: ['bangunan', 'listrik', 'plumbing'],
    images: ['/images/house-1.jpg', '/images/house-2.jpg'],
    applicationsCount: 28,
    timeAgo: '5 jam lalu',
    client: {
      id: 'c2',
      name: 'PT. Karya Mandiri',
      avatar: '/images/company-1.jpg',
      verified: true,
      rating: 4.9,
      reviewsCount: 156
    }
  },
  {
    id: '3',
    title: 'Perbaikan Atap Bocor',
    description: 'Perbaikan atap genteng yang bocor di beberapa titik. Perlu penggantian genteng dan perbaikan rangka kayu yang lapuk.',
    location: 'Sukolilo, Surabaya',
    city: 'surabaya',
    startDate: '2024-01-25',
    urgency: 'high',
    budgetType: 'range',
    budgetMin: 3000000,
    budgetMax: 8000000,
    skills: ['atap', 'kayu'],
    applicationsCount: 8,
    timeAgo: '1 hari lalu',
    client: {
      id: 'c3',
      name: 'Siti Aminah',
      avatar: '/images/avatar-2.jpg',
      verified: false,
      rating: 4.5,
      reviewsCount: 7
    }
  }
])

const totalJobs = computed(() => allJobs.value.length)
const lastUpdated = ref('5 menit lalu')

// Computed properties
const filteredJobs = computed(() => {
  let jobs = [...allJobs.value]

  // Search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.skills.some(skill => getSkillLabel(skill).toLowerCase().includes(query))
    )
  }

  // Location filter
  if (filters.location.length > 0) {
    jobs = jobs.filter(job => filters.location.includes(job.city))
  }

  // Skills filter
  if (filters.skills.length > 0) {
    jobs = jobs.filter(job =>
      job.skills.some(skill => filters.skills.includes(skill))
    )
  }

  // Budget filter
  if (filters.budgetMin || filters.budgetMax) {
    jobs = jobs.filter(job => {
      const jobMin = job.budgetType === 'fixed' ? job.budget! : job.budgetMin!
      const jobMax = job.budgetType === 'fixed' ? job.budget! : job.budgetMax!
      
      if (filters.budgetMin && jobMax < filters.budgetMin) return false
      if (filters.budgetMax && jobMin > filters.budgetMax) return false
      
      return true
    })
  }

  // Urgency filter
  if (filters.urgency.length > 0) {
    jobs = jobs.filter(job => filters.urgency.includes(job.urgency))
  }

  // Additional filters
  if (filters.withImages) {
    jobs = jobs.filter(job => job.images && job.images.length > 0)
  }

  if (filters.verifiedOnly) {
    jobs = jobs.filter(job => job.client.verified)
  }

  // Sort
  switch (sortBy.value) {
    case 'budget_high':
      jobs.sort((a, b) => {
        const budgetA = a.budgetType === 'fixed' ? a.budget! : a.budgetMax!
        const budgetB = b.budgetType === 'fixed' ? b.budget! : b.budgetMax!
        return budgetB - budgetA
      })
      break
    case 'budget_low':
      jobs.sort((a, b) => {
        const budgetA = a.budgetType === 'fixed' ? a.budget! : a.budgetMin!
        const budgetB = b.budgetType === 'fixed' ? b.budget! : b.budgetMin!
        return budgetA - budgetB
      })
      break
    case 'deadline':
      jobs.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      break
    default:
      // newest - already in correct order
      break
  }

  return jobs
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / itemsPerPage))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredJobs.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  // Show max 5 pages
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const activeFilters = computed(() => {
  const active = []
  
  if (filters.location.length > 0) {
    filters.location.forEach(loc => {
      const city = cities.find(c => c.value === loc)
      if (city) active.push({ key: `location-${loc}`, label: city.label })
    })
  }
  
  if (filters.skills.length > 0) {
    filters.skills.forEach(skill => {
      const skillData = skills.find(s => s.value === skill)
      if (skillData) active.push({ key: `skill-${skill}`, label: skillData.label })
    })
  }
  
  if (filters.budgetMin || filters.budgetMax) {
    const min = filters.budgetMin ? formatCurrency(filters.budgetMin) : '0'
    const max = filters.budgetMax ? formatCurrency(filters.budgetMax) : '∞'
    active.push({ key: 'budget', label: `Budget: ${min} - ${max}` })
  }
  
  if (filters.urgency.length > 0) {
    filters.urgency.forEach(urgency => {
      const urgencyData = urgencyLevels.find(u => u.value === urgency)
      if (urgencyData) active.push({ key: `urgency-${urgency}`, label: urgencyData.label })
    })
  }
  
  return active
})

const activeFiltersCount = computed(() => activeFilters.value.length)

// Methods
const performSearch = () => {
  currentPage.value = 1
  // Update URL
  router.push({
    query: { ...route.query, q: searchQuery.value || undefined }
  })
}

const applyFilters = () => {
  currentPage.value = 1
  showFilters.value = false
}

const removeFilter = (key: string) => {
  if (key.startsWith('location-')) {
    const loc = key.replace('location-', '')
    filters.location = filters.location.filter(l => l !== loc)
  } else if (key.startsWith('skill-')) {
    const skill = key.replace('skill-', '')
    filters.skills = filters.skills.filter(s => s !== skill)
  } else if (key === 'budget') {
    filters.budgetMin = null
    filters.budgetMax = null
    filters.budgetRange = ''
  } else if (key.startsWith('urgency-')) {
    const urgency = key.replace('urgency-', '')
    filters.urgency = filters.urgency.filter(u => u !== urgency)
  }
}

const clearAllFilters = () => {
  Object.assign(filters, {
    location: [],
    skills: [],
    budgetMin: null,
    budgetMax: null,
    budgetRange: '',
    projectType: [],
    urgency: [],
    withImages: false,
    verifiedOnly: false,
    openApplications: false
  })
  searchQuery.value = ''
  currentPage.value = 1
}

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToJob = (jobId: string) => {
  navigateTo(`/jobs/${jobId}`)
}

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatBudget = (job: Job) => {
  if (job.budgetType === 'fixed') {
    return formatCurrency(job.budget!)
  } else {
    return `${formatCurrency(job.budgetMin!)} - ${formatCurrency(job.budgetMax!)}`
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getSkillLabel = (skillValue: string) => {
  const skill = skills.find(s => s.value === skillValue)
  return skill ? skill.label : skillValue
}

const getUrgencyLabel = (urgency: string) => {
  const level = urgencyLevels.find(u => u.value === urgency)
  return level ? level.label : urgency
}

const getUrgencyClass = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'bg-danger/10 text-danger'
    case 'medium':
      return 'bg-warning/10 text-warning'
    default:
      return 'bg-success/10 text-success'
  }
}

// Load data
onMounted(() => {
  // In real app, load from API based on route params
  if (route.query.location) {
    filters.location = Array.isArray(route.query.location) 
      ? route.query.location 
      : [route.query.location]
  }
  
  if (route.query.skills) {
    filters.skills = Array.isArray(route.query.skills) 
      ? route.query.skills 
      : [route.query.skills]
  }
})

// SEO
useHead({
  title: computed(() => {
    let title = 'Cari Proyek'
    if (searchQuery.value) title += ` "${searchQuery.value}"`
    return `${title} - TukangIn`
  }),
  meta: [
    {
      name: 'description',
      content: 'Temukan proyek konstruksi dan renovasi terbaru di TukangIn. Cari berdasarkan lokasi, keahlian, dan budget.'
    }
  ]
})
</script>
