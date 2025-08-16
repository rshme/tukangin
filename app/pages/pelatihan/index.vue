<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-heading font-bold text-text-900">
              Katalog Pelatihan
            </h1>
            <p class="text-text-500 mt-1">
              Tingkatkan keahlian dengan pelatihan bersertifikat
            </p>
          </div>
          
          <!-- Search -->
          <div class="hidden md:block w-80">
            <div class="relative">
              <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari pelatihan..."
                class="form-input pl-10"
                @input="handleSearch"
              />
            </div>
          </div>
        </div>

        <!-- Mobile Search -->
        <div class="md:hidden mt-4">
          <div class="relative">
            <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pelatihan..."
              class="form-input pl-10"
              @input="handleSearch"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <aside class="lg:w-80">
          <div class="card p-6">
            <h3 class="font-heading font-semibold text-lg mb-4">Filter</h3>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-text-900 mb-3">Kategori</h4>
              <div class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category.value"
                  class="flex items-center"
                >
                  <input
                    v-model="selectedCategories"
                    :value="category.value"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-sm text-text-900">
                    {{ category.label }}
                    <span class="text-text-500">({{ category.count }})</span>
                  </span>
                </label>
              </div>
            </div>

            <!-- Level Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-text-900 mb-3">Level</h4>
              <div class="space-y-2">
                <label
                  v-for="level in levels"
                  :key="level.value"
                  class="flex items-center"
                >
                  <input
                    v-model="selectedLevels"
                    :value="level.value"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-sm text-text-900">{{ level.label }}</span>
                </label>
              </div>
            </div>

            <!-- Price Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-text-900 mb-3">Harga</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="priceFilter"
                    value="free"
                    type="radio"
                    name="price"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-sm text-text-900">Gratis</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="priceFilter"
                    value="paid"
                    type="radio"
                    name="price"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-sm text-text-900">Berbayar</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="priceFilter"
                    value="all"
                    type="radio"
                    name="price"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-sm text-text-900">Semua</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <button
              @click="clearFilters"
              class="btn-ghost w-full"
            >
              Hapus Filter
            </button>
          </div>
        </aside>

        <!-- Course Grid -->
        <main class="flex-1">
          <!-- Sort Options -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-text-500">
              Menampilkan {{ filteredCourses.length }} dari {{ totalCourses }} pelatihan
            </p>
            
            <select
              v-model="sortBy"
              class="form-input w-48"
              @change="applySorting"
            >
              <option value="popular">Paling Populer</option>
              <option value="newest">Terbaru</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="i in 6"
              :key="i"
              class="card p-6 animate-pulse"
            >
              <div class="h-48 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div class="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>

          <!-- Course Cards -->
          <div v-else class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="course in filteredCourses"
              :key="course.id"
              class="card hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToCourse(course.id)"
            >
              <!-- Course Image -->
              <div class="relative">
                <img
                  :src="course.thumbnail"
                  :alt="course.title"
                  class="w-full h-48 object-cover rounded-t-lg"
                  loading="lazy"
                />
                
                <!-- Price Badge -->
                <div class="absolute top-4 right-4">
                  <span
                    :class="course.price === 0 ? 'bg-success text-white' : 'bg-primary text-white'"
                    class="px-2 py-1 rounded-full text-sm font-medium"
                  >
                    {{ course.price === 0 ? 'Gratis' : formatPrice(course.price) }}
                  </span>
                </div>

                <!-- Level Badge -->
                <div class="absolute top-4 left-4">
                  <span class="bg-bg-surface text-text-900 px-2 py-1 rounded-full text-xs font-medium">
                    {{ getLevelLabel(course.level) }}
                  </span>
                </div>
              </div>

              <!-- Course Content -->
              <div class="p-6">
                <!-- Category -->
                <p class="text-primary text-sm font-medium mb-2">
                  {{ getCategoryLabel(course.category) }}
                </p>

                <!-- Title -->
                <h3 class="font-heading font-semibold text-lg text-text-900 mb-2 line-clamp-2">
                  {{ course.title }}
                </h3>

                <!-- Description -->
                <p class="text-text-500 text-sm mb-4 line-clamp-2">
                  {{ course.description }}
                </p>

                <!-- Course Meta -->
                <div class="flex items-center justify-between text-sm text-text-500 mb-4">
                  <div class="flex items-center">
                    <ClockIcon size="16" class="mr-1" />
                    {{ course.duration }} jam
                  </div>
                  <div class="flex items-center">
                    <UsersIcon size="16" class="mr-1" />
                    {{ course.enrolled }} peserta
                  </div>
                </div>

                <!-- Rating -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex items-center text-accent mr-2">
                      <StarIcon 
                        v-for="star in 5" 
                        :key="star"
                        size="14"
                        :class="star <= Math.floor(course.rating) ? 'fill-current' : 'stroke-current fill-transparent'"
                      />
                    </div>
                    <span class="text-sm font-medium text-text-900">
                      {{ course.rating.toFixed(1) }}
                    </span>
                  </div>

                  <!-- Certificate Badge -->
                  <div v-if="course.certificate" class="flex items-center text-success">
                    <AwardIcon size="16" class="mr-1" />
                    <span class="text-xs">Sertifikat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!isLoading && filteredCourses.length === 0" class="text-center py-12">
            <BookOpenIcon size="64" class="mx-auto text-text-500 mb-4" />
            <h3 class="text-xl font-heading font-semibold text-text-900 mb-2">
              Tidak ada pelatihan ditemukan
            </h3>
            <p class="text-text-500 mb-4">
              Coba ubah filter atau kata kunci pencarian
            </p>
            <button @click="clearFilters" class="btn-primary">
              Hapus Semua Filter
            </button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Dasar-dasar Konstruksi Bangunan',
    description: 'Pelajari fundamental pembangunan rumah dari pondasi hingga atap',
    category: 'construction',
    level: 'beginner',
    price: 0,
    duration: 12,
    enrolled: 2341,
    rating: 4.8,
    certificate: true,
    thumbnail: 'https://picsum.photos/seed/construction-1/640/360'
  },
  {
    id: '2',
    title: 'Instalasi Listrik Rumah Tinggal',
    description: 'Panduan lengkap instalasi listrik yang aman dan sesuai standar',
    category: 'electrical',
    level: 'intermediate',
    price: 150000,
    duration: 8,
    enrolled: 1456,
    rating: 4.9,
    certificate: true,
    thumbnail: 'https://picsum.photos/seed/electrical-2/640/360'
  },
  {
    id: '3',
    title: 'Sistem Plumbing Modern',
    description: 'Teknik perpipaan modern untuk rumah dan gedung',
    category: 'plumbing',
    level: 'intermediate',
    price: 120000,
    duration: 6,
    enrolled: 892,
    rating: 4.7,
    certificate: true,
    thumbnail: 'https://picsum.photos/seed/plumbing-3/640/360'
  },
  {
    id: '4',
    title: 'Teknik Pengecatan Profesional',
    description: 'Rahasia pengecatan yang tahan lama dan berkualitas tinggi',
    category: 'finishing',
    level: 'beginner',
    price: 0,
    duration: 4,
    enrolled: 3421,
    rating: 4.6,
    certificate: false,
    thumbnail: 'https://picsum.photos/seed/finishing-4/640/360'
  },
  {
    id: '5',
    title: 'Furniture Custom & Woodworking',
    description: 'Membuat furniture custom dengan teknik woodworking modern',
    category: 'woodworking',
    level: 'advanced',
    price: 300000,
    duration: 20,
    enrolled: 567,
    rating: 4.9,
    certificate: true,
    thumbnail: 'https://picsum.photos/seed/woodworking-5/640/360'
  }
]

// Reactive state
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedLevels = ref<string[]>([])
const priceFilter = ref('all')
const sortBy = ref('popular')
const isLoading = ref(false)

// Filter options
const categories = ref([
  { value: 'construction', label: 'Konstruksi', count: 15 },
  { value: 'electrical', label: 'Listrik', count: 8 },
  { value: 'plumbing', label: 'Plumbing', count: 6 },
  { value: 'finishing', label: 'Finishing', count: 12 },
  { value: 'woodworking', label: 'Perkayuan', count: 4 }
])

const levels = ref([
  { value: 'beginner', label: 'Pemula' },
  { value: 'intermediate', label: 'Menengah' },
  { value: 'advanced', label: 'Lanjutan' }
])

// Computed
const totalCourses = computed(() => mockCourses.length)

const filteredCourses = computed(() => {
  let filtered = [...mockCourses]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(course =>
      selectedCategories.value.includes(course.category)
    )
  }

  // Level filter
  if (selectedLevels.value.length > 0) {
    filtered = filtered.filter(course =>
      selectedLevels.value.includes(course.level)
    )
  }

  // Price filter
  if (priceFilter.value === 'free') {
    filtered = filtered.filter(course => course.price === 0)
  } else if (priceFilter.value === 'paid') {
    filtered = filtered.filter(course => course.price > 0)
  }

  return filtered
})

// Methods
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getCategoryLabel = (category: string) => {
  const cat = categories.value.find(c => c.value === category)
  return cat?.label || category
}

const getLevelLabel = (level: string) => {
  const lvl = levels.value.find(l => l.value === level)
  return lvl?.label || level
}

const handleSearch = debounce(() => {
  // Search is handled reactively through computed
}, 300)

const applyFilters = () => {
  // Filters are applied reactively through computed
}

const applySorting = () => {
  // In a real app, this would trigger a new API call or sort the data
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedLevels.value = []
  priceFilter.value = 'all'
  sortBy.value = 'popular'
}

const navigateToCourse = (courseId: string) => {
  navigateTo(`/pelatihan/${courseId}`)
}

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// SEO
useHead({
  title: 'Katalog Pelatihan - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Jelajahi berbagai pelatihan berkualitas untuk tukang. Dapatkan sertifikat resmi dan tingkatkan keahlian Anda.'
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
