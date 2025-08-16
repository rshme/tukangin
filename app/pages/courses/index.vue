<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-primary to-primary-600 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl md:text-4xl font-heading font-bold mb-4">
            Pelatihan & Sertifikasi Tukang
          </h1>
          <p class="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Tingkatkan kemampuan dan dapatkan sertifikat resmi untuk meningkatkan pendapatan dan peluang kerja Anda
          </p>
        </div>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-accent">150+</div>
            <div class="text-sm text-blue-100">Pelatihan Tersedia</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-accent">5,000+</div>
            <div class="text-sm text-blue-100">Tukang Tersertifikasi</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-accent">95%</div>
            <div class="text-sm text-blue-100">Tingkat Keberhasilan</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-accent">LPJK</div>
            <div class="text-sm text-blue-100">Sertifikat Resmi</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Input -->
          <div class="flex-1">
            <label for="course-search" class="block text-sm font-medium text-text-900 mb-2">
              Cari Pelatihan
            </label>
            <div class="relative">
              <input
                id="course-search"
                v-model="searchQuery"
                type="text"
                placeholder="Masukkan nama pelatihan atau skill..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
              <svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Category Filter -->
          <div class="md:w-48">
            <label for="category-filter" class="block text-sm font-medium text-text-900 mb-2">
              Kategori
            </label>
            <select
              id="category-filter"
              v-model="selectedCategory"
              class="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Semua Kategori</option>
              <option value="dasar">Keterampilan Dasar</option>
              <option value="lanjutan">Keterampilan Lanjutan</option>
              <option value="spesialisasi">Spesialisasi</option>
              <option value="keselamatan">Keselamatan Kerja</option>
            </select>
          </div>

          <!-- Duration Filter -->
          <div class="md:w-40">
            <label for="duration-filter" class="block text-sm font-medium text-text-900 mb-2">
              Durasi
            </label>
            <select
              id="duration-filter"
              v-model="selectedDuration"
              class="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Semua Durasi</option>
              <option value="1-3">1-3 Hari</option>
              <option value="4-7">4-7 Hari</option>
              <option value="8-14">1-2 Minggu</option>
              <option value="15+">Lebih dari 2 Minggu</option>
            </select>
          </div>
        </div>

        <!-- Quick Filter Tags -->
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="text-sm text-text-500 mr-2">Populer:</span>
          <button
            v-for="tag in popularTags"
            :key="tag"
            @click="searchQuery = tag"
            class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="course in filteredCourses"
          :key="course.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
          @click="navigateToCourse(course.id)"
        >
          <!-- Course Image -->
          <div class="relative h-48 bg-gradient-to-r from-primary to-primary-600 rounded-t-lg overflow-hidden">
            <img
              v-if="course.image"
              :src="course.image"
              :alt="course.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="flex items-center justify-center h-full">
              <svg class="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            
            <!-- Course Badge -->
            <div class="absolute top-3 left-3">
              <span :class="getBadgeClass(course.level)" class="px-3 py-1 text-xs font-medium rounded-full">
                {{ course.level }}
              </span>
            </div>
            
            <!-- Duration Badge -->
            <div class="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {{ course.duration }}
            </div>
          </div>

          <!-- Course Content -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-text-900 mb-2 line-clamp-2">
              {{ course.title }}
            </h3>
            
            <p class="text-text-500 text-sm mb-4 line-clamp-3">
              {{ course.description }}
            </p>

            <!-- Course Meta -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-4 text-sm text-text-500">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                  {{ course.participants }} peserta
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  {{ course.rating }}
                </div>
              </div>
            </div>

            <!-- Skills You'll Learn -->
            <div class="mb-4">
              <h4 class="text-sm font-medium text-text-900 mb-2">Yang Akan Dipelajari:</h4>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="skill in course.skills.slice(0, 3)"
                  :key="skill"
                  class="px-2 py-1 text-xs bg-blue-50 text-primary rounded"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="course.skills.length > 3"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  +{{ course.skills.length - 3 }} lainnya
                </span>
              </div>
            </div>

            <!-- Price and CTA -->
            <div class="flex items-center justify-between">
              <div>
                <div class="flex flex-wrap items-center space-x-2">
                  <span class="block text-2xl font-bold text-primary">
                    {{ formatPrice(course.price) }}
                  </span>
                  <span v-if="course.originalPrice" class="block text-sm text-gray-500 line-through">
                    {{ formatPrice(course.originalPrice) }}
                  </span>
                </div>
                <div class="text-xs text-text-500">
                  {{ course.paymentOptions }}
                </div>
              </div>
              
              <Button
                size="sm"
                class="ml-2"
                @click.stop="navigateToCourse(course.id)"
              >
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCourses.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Tidak ada pelatihan ditemukan
        </h3>
        <p class="text-gray-500 mb-4">
          Coba ubah filter pencarian atau kata kunci Anda
        </p>
        <Button variant="ghost" @click="resetFilters">
          Reset Filter
        </Button>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center mt-8">
        <Button
          variant="ghost"
          size="lg"
          :loading="loading"
          @click="loadMore"
        >
          Muat Lebih Banyak
        </Button>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-secondary to-orange-600 text-white py-12 px-4 mt-12">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-heading font-bold mb-4">
          Siap Meningkatkan Karir Anda?
        </h2>
        <p class="text-lg mb-6 text-orange-100">
          Bergabunglah dengan ribuan tukang yang telah meningkatkan pendapatan mereka melalui sertifikasi resmi
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            class="bg-primary text-secondary hover:bg-gray-100"
            @click="$router.push('/auth/register')"
          >
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'

// Meta tags for SEO
useHead({
  title: 'Pelatihan & Sertifikasi Tukang - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Temukan pelatihan dan sertifikasi tukang terbaik untuk meningkatkan kemampuan dan pendapatan Anda. Sertifikat resmi LPJK tersedia.'
    },
    {
      property: 'og:title',
      content: 'Pelatihan & Sertifikasi Tukang - TukangIn'
    },
    {
      property: 'og:description',
      content: 'Tingkatkan kemampuan dengan pelatihan berkualitas dan dapatkan sertifikat resmi untuk meningkatkan peluang kerja.'
    }
  ]
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDuration = ref('')
const loading = ref(false)
const hasMore = ref(true)

// Popular search tags
const popularTags = [
  'Tukang Listrik',
  'Tukang Batu',
  'Tukang Cat',
  'Keselamatan Kerja',
  'Instalasi Pipa'
]

// Mock courses data - in real app, this would come from API
const courses = ref([
  {
    id: 1,
    title: 'Pelatihan Dasar Tukang Listrik Rumahan',
    description: 'Pelajari dasar-dasar instalasi listrik rumahan yang aman dan sesuai standar. Cocok untuk pemula yang ingin memulai karir sebagai tukang listrik.',
    image: 'https://picsum.photos/seed/listrik-rumahan-1/400/240',
    level: 'Pemula',
    duration: '5 Hari',
    price: 750000,
    originalPrice: 1000000,
    paymentOptions: 'Bisa dicicil 3x',
    category: 'dasar',
    participants: 1234,
    rating: 4.8,
    skills: ['Instalasi Saklar', 'Pemasangan Lampu', 'Kabel Management', 'Safety Procedures', 'Troubleshooting Dasar']
  },
  {
    id: 2,
    title: 'Sertifikasi Tukang Batu Profesional',
    description: 'Program komprehensif untuk menjadi tukang batu bersertifikat LPJK. Termasuk teknik modern dan peralatan terbaru.',
    image: 'https://picsum.photos/seed/tukang-batu-2/400/240',
    level: 'Menengah',
    duration: '10 Hari',
    price: 1200000,
    originalPrice: null,
    paymentOptions: 'Bisa dicicil 5x',
    category: 'spesialisasi',
    participants: 856,
    rating: 4.9,
    skills: ['Cor Beton', 'Pasang Bata', 'Finishing', 'Quality Control', 'Material Calculation']
  },
  {
    id: 3,
    title: 'Keselamatan Kerja Konstruksi (K3)',
    description: 'Pelatihan wajib keselamatan kerja untuk semua pekerja konstruksi. Sertifikat berlaku untuk semua proyek pemerintah.',
    image: 'https://picsum.photos/seed/k3-keselamatan-3/400/240',
    level: 'Wajib',
    duration: '3 Hari',
    price: 400000,
    originalPrice: null,
    paymentOptions: 'Bayar sekali',
    category: 'keselamatan',
    participants: 2341,
    rating: 4.7,
    skills: ['APD', 'Safety Procedures', 'Emergency Response', 'Risk Assessment', 'Documentation']
  },
  {
    id: 4,
    title: 'Tukang Cat Profesional & Dekoratif',
    description: 'Dari pengecatan dasar hingga teknik dekoratif advanced. Termasuk penggunaan alat modern dan finishing berkualitas tinggi.',
    image: 'https://picsum.photos/seed/tukang-cat-4/400/240',
    level: 'Lanjutan',
    duration: '7 Hari',
    price: 950000,
    originalPrice: 1300000,
    paymentOptions: 'Bisa dicicil 4x',
    category: 'lanjutan',
    participants: 567,
    rating: 4.6,
    skills: ['Wall Preparation', 'Paint Mixing', 'Decorative Techniques', 'Spray Painting', 'Color Theory']
  },
  {
    id: 5,
    title: 'Instalasi Pipa dan Plumbing Modern',
    description: 'Pelatihan lengkap sistem perpipaan modern, dari instalasi dasar hingga maintenance sistem kompleks.',
    image: 'https://picsum.photos/seed/plumbing-5/400/240',
    level: 'Menengah',
    duration: '8 Hari',
    price: 850000,
    originalPrice: null,
    paymentOptions: 'Bisa dicicil 3x',
    category: 'spesialisasi',
    participants: 423,
    rating: 4.8,
    skills: ['Pipe Installation', 'Leak Detection', 'Water Systems', 'Drainage', 'Maintenance']
  },
  {
    id: 6,
    title: 'Tukang Kayu & Furniture Making',
    description: 'Dari carpentry dasar hingga pembuatan furniture custom. Menggunakan tools modern dan teknik joinery profesional.',
    image: 'https://picsum.photos/seed/woodworking-6/400/240',
    level: 'Lanjutan',
    duration: '12 Hari',
    price: 1400000,
    originalPrice: 1800000,
    paymentOptions: 'Bisa dicicil 6x',
    category: 'lanjutan',
    participants: 298,
    rating: 4.9,
    skills: ['Wood Working', 'Joinery', 'Finishing', 'Tool Usage', 'Design Reading']
  }
])

// Computed properties
const filteredCourses = computed(() => {
  let filtered = courses.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.skills.some(skill => skill.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(course => course.category === selectedCategory.value)
  }

  if (selectedDuration.value) {
    // Duration filtering logic
    const duration = selectedDuration.value
    filtered = filtered.filter(course => {
      const courseDays = parseInt(course.duration)
      if (duration === '1-3') return courseDays >= 1 && courseDays <= 3
      if (duration === '4-7') return courseDays >= 4 && courseDays <= 7
      if (duration === '8-14') return courseDays >= 8 && courseDays <= 14
      if (duration === '15+') return courseDays >= 15
      return true
    })
  }

  return filtered
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const getBadgeClass = (level) => {
  const classes = {
    'Pemula': 'bg-green-100 text-green-800',
    'Menengah': 'bg-blue-100 text-blue-800',
    'Lanjutan': 'bg-purple-100 text-purple-800',
    'Wajib': 'bg-red-100 text-red-800'
  }
  return classes[level] || 'bg-gray-100 text-gray-800'
}

const navigateToCourse = (courseId) => {
  navigateTo(`/courses/${courseId}`)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedDuration.value = ''
}

const loadMore = () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    hasMore.value = false // For demo purposes
  }, 1000)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>