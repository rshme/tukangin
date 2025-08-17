<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="max-w-7xl mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/" class="text-gray-700 hover:text-primary">
              Beranda
            </NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <NuxtLink to="/courses" class="ml-1 text-gray-700 hover:text-primary">
                Pelatihan
              </NuxtLink>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-1 text-gray-500">{{ course.title }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Course Header -->
          <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-3">
                  <span :class="getBadgeClass(course.level)" class="px-3 py-1 text-sm font-medium rounded-full">
                    {{ course.level }}
                  </span>
                  <span class="text-sm text-gray-500">{{ course.category }}</span>
                </div>
                
                <h1 class="text-2xl md:text-3xl font-heading font-bold text-text-900 mb-3">
                  {{ course.title }}
                </h1>
                
                <p class="text-lg text-text-500 mb-4">
                  {{ course.description }}
                </p>

                <!-- Course Meta -->
                <div class="flex flex-wrap items-center gap-6 text-sm text-text-500">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                    {{ course.participants }} peserta terdaftar
                  </div>
                  
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {{ course.rating }} ({{ course.reviews }} ulasan)
                  </div>
                  
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                    </svg>
                    {{ course.duration }}
                  </div>
                  
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                    {{ course.instructor }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Course Image -->
            <div class="relative h-64 md:h-80 bg-gradient-to-r from-primary to-primary-600 rounded-lg overflow-hidden">
              <img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
                class="w-full h-full object-cover"
              >
              <div v-else class="flex items-center justify-center h-full">
                <svg class="w-24 h-24 text-white opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Course Tabs -->
          <div class="bg-white rounded-lg shadow-sm border mb-6">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8 px-6" aria-label="Course information tabs">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'py-4 px-1 border-b-2 font-medium text-sm',
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  {{ tab.name }}
                </button>
              </nav>
            </div>

            <div class="p-6">
              <!-- Overview Tab -->
              <div v-if="activeTab === 'overview'">
                <div class="space-y-6">
                  <!-- What You'll Learn -->
                  <div>
                    <h3 class="text-lg font-semibold text-text-900 mb-3">
                      Yang Akan Anda Pelajari
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        v-for="skill in course.skills"
                        :key="skill"
                        class="flex items-center"
                      >
                        <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        <span class="text-text-900">{{ skill }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Requirements -->
                  <div>
                    <h3 class="text-lg font-semibold text-text-900 mb-3">
                      Persyaratan
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="requirement in course.requirements"
                        :key="requirement"
                        class="flex items-start"
                      >
                        <svg class="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                        </svg>
                        <span class="text-text-900">{{ requirement }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Description -->
                  <div>
                    <h3 class="text-lg font-semibold text-text-900 mb-3">
                      Deskripsi Pelatihan
                    </h3>
                    <div class="prose prose-blue max-w-none text-text-900">
                      <p>{{ course.fullDescription }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Curriculum Tab -->
              <div v-if="activeTab === 'curriculum'">
                <h3 class="text-lg font-semibold text-text-900 mb-4">
                  Kurikulum Pelatihan
                </h3>
                <div class="space-y-4">
                  <div
                    v-for="(module, index) in course.curriculum"
                    :key="index"
                    class="border border-gray-200 rounded-lg"
                  >
                    <button
                      @click="toggleModule(index)"
                      class="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <div>
                        <h4 class="font-medium text-text-900">
                          Modul {{ index + 1 }}: {{ module.title }}
                        </h4>
                        <p class="text-sm text-text-500 mt-1">
                          {{ module.lessons.length }} pelajaran • {{ module.duration }}
                        </p>
                      </div>
                      <svg
                        :class="[
                          'w-5 h-5 text-gray-400 transition-transform',
                          expandedModules.includes(index) ? 'rotate-180' : ''
                        ]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    
                    <div
                      v-if="expandedModules.includes(index)"
                      class="px-4 pb-4 border-t border-gray-200"
                    >
                      <ul class="space-y-2 mt-3">
                        <li
                          v-for="lesson in module.lessons"
                          :key="lesson"
                          class="flex items-center text-sm text-text-900"
                        >
                          <svg class="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                          </svg>
                          {{ lesson }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reviews Tab -->
              <div v-if="activeTab === 'reviews'">
                <div class="space-y-6">
                  <!-- Rating Summary -->
                  <div class="flex items-center space-x-8">
                    <div class="text-center">
                      <div class="text-4xl font-bold text-text-900">{{ course.rating }}</div>
                      <div class="flex items-center justify-center mt-1">
                        <div class="flex">
                          <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="text-sm text-text-500 mt-1">{{ course.reviews }} ulasan</div>
                    </div>
                    
                    <div class="flex-1">
                      <div v-for="(count, stars) in course.ratingBreakdown" :key="stars" class="flex items-center space-x-3 mb-1">
                        <div class="text-sm text-text-500 w-8">{{ stars }}★</div>
                        <div class="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            class="bg-yellow-500 h-2 rounded-full"
                            :style="{ width: `${(count / course.reviews) * 100}%` }"
                          ></div>
                        </div>
                        <div class="text-sm text-text-500 w-8">{{ count }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Individual Reviews -->
                  <div class="space-y-4">
                    <div
                      v-for="review in course.reviewsList"
                      :key="review.id"
                      class="border-b border-gray-200 pb-4"
                    >
                      <div class="flex items-start space-x-4">
                        <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {{ review.name.charAt(0) }}
                        </div>
                        <div class="flex-1">
                          <div class="flex items-center space-x-2 mb-1">
                            <h4 class="font-medium text-text-900">{{ review.name }}</h4>
                            <div class="flex">
                              <svg v-for="i in review.rating" :key="i" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            </div>
                            <span class="text-sm text-text-500">{{ review.date }}</span>
                          </div>
                          <p class="text-text-900">{{ review.comment }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Sticky Enrollment Card -->
          <div class="sticky top-8">
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <!-- Price -->
              <div class="text-center mb-6">
                <div class="flex items-center justify-center space-x-2 mb-2">
                  <span class="text-3xl font-bold text-primary">
                    {{ formatPrice(course.price) }}
                  </span>
                  <span v-if="course.originalPrice" class="text-lg text-gray-500 line-through">
                    {{ formatPrice(course.originalPrice) }}
                  </span>
                </div>
                <div class="text-sm text-text-500">
                  {{ course.paymentOptions }}
                </div>
                <div v-if="course.originalPrice" class="text-sm text-green-600 font-medium">
                  Hemat {{ formatPrice(course.originalPrice - course.price) }}!
                </div>
              </div>

              <!-- Enroll Button -->
              <Button
                size="lg"
                class="w-full mb-4"
                @click="enrollCourse"
                :loading="enrolling"
              >
                Daftar Sekarang
              </Button>

              <!-- Trial Button -->
              <Button
                variant="ghost"
                size="lg"
                class="w-full mb-6"
                @click="startTrial"
              >
                Coba Gratis 3 Hari
              </Button>

              <!-- Course Info -->
              <div class="space-y-4 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Durasi</span>
                  <span class="font-medium">{{ course.duration }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Level</span>
                  <span class="font-medium">{{ course.level }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Sertifikat</span>
                  <span class="font-medium text-green-600">✓ LPJK</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Akses</span>
                  <span class="font-medium">Selamanya</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Bahasa</span>
                  <span class="font-medium">Indonesia</span>
                </div>
              </div>
            </div>

            <!-- Instructor Info -->
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h3 class="text-lg font-semibold text-text-900 mb-4">Instruktur</h3>
              <div class="flex items-start space-x-4">
                <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-medium">
                  {{ course.instructor.charAt(0) }}
                </div>
                <div>
                  <h4 class="font-medium text-text-900">{{ course.instructor }}</h4>
                  <p class="text-sm text-text-500 mb-2">{{ course.instructorTitle }}</p>
                  <div class="flex items-center text-sm text-text-500 space-x-4">
                    <span>⭐ {{ course.instructorRating }}</span>
                    <span>👥 {{ course.instructorStudents }} siswa</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- What's Included -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <h3 class="text-lg font-semibold text-text-900 mb-4">Yang Termasuk</h3>
              <ul class="space-y-3">
                <li
                  v-for="item in course.includes"
                  :key="item"
                  class="flex items-start"
                >
                  <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm text-text-900">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          Pelatihan tidak ditemukan
        </h3>
        <p class="text-gray-500 mb-4">
          Pelatihan yang Anda cari tidak tersedia atau telah dihapus.
        </p>
        <Button @click="$router.push('/courses')">
          Kembali ke Daftar Pelatihan
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'

// Props
const route = useRoute()
const courseId = route.params.id

// Reactive data
const loading = ref(true)
const enrolling = ref(false)
const activeTab = ref('overview')
const expandedModules = ref([])

// Tabs configuration
const tabs = [
  { id: 'overview', name: 'Ringkasan' },
  { id: 'curriculum', name: 'Kurikulum' },
  { id: 'reviews', name: 'Ulasan' }
]

// Mock course data - in real app, this would come from API
const course = ref(null)

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

const toggleModule = (index) => {
  if (expandedModules.value.includes(index)) {
    expandedModules.value = expandedModules.value.filter(i => i !== index)
  } else {
    expandedModules.value.push(index)
  }
}

const enrollCourse = async () => {
  enrolling.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // In real app, handle enrollment logic here
  alert('Pendaftaran berhasil! Anda akan diarahkan ke halaman pembayaran.')
  
  enrolling.value = false
}

const startTrial = () => {
  // In real app, start trial logic here
  alert('Trial 3 hari dimulai! Anda dapat mengakses materi pelatihan terbatas.')
}

// Load course data
const loadCourse = async () => {
  loading.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock data based on courseId
  const courses = {
    '1': {
      id: 1,
      title: 'Pelatihan Dasar Tukang Listrik Rumahan',
      description: 'Pelajari dasar-dasar instalasi listrik rumahan yang aman dan sesuai standar. Cocok untuk pemula yang ingin memulai karir sebagai tukang listrik.',
      fullDescription: 'Pelatihan komprehensif yang dirancang khusus untuk tukang pemula yang ingin menguasai keterampilan instalasi listrik rumahan. Dengan menggunakan metode pembelajaran praktis dan teori yang mudah dipahami, Anda akan mempelajari semua aspek penting dalam instalasi listrik yang aman dan sesuai dengan standar nasional.',
      image: 'https://picsum.photos/seed/listrik-rumahan-1/400/240',
      level: 'Pemula',
      category: 'Keterampilan Dasar',
      duration: '5 Hari',
      price: 750000,
      originalPrice: 1000000,
      paymentOptions: 'Bisa dicicil 3x',
      participants: 1234,
      rating: 4.8,
      reviews: 156,
      instructor: 'Budi Santoso',
      instructorTitle: 'Elektrik Senior, 15+ tahun pengalaman',
      instructorRating: 4.9,
      instructorStudents: 2341,
      skills: [
        'Instalasi Saklar dan Stop Kontak',
        'Pemasangan Lampu dan Fitting',
        'Kabel Management dan Routing',
        'Safety Procedures dan APD',
        'Troubleshooting Dasar',
        'Pembacaan Diagram Listrik',
        'Penggunaan Multimeter',
        'Instalasi MCB dan Sekering'
      ],
      requirements: [
        'Tidak ada pengalaman sebelumnya diperlukan',
        'Usia minimal 18 tahun',
        'Kondisi fisik sehat',
        'Dapat membaca dan menulis',
        'Komitmen untuk mengikuti pelatihan penuh'
      ],
      includes: [
        'Modul pembelajaran digital',
        'Video tutorial step-by-step',
        'Sertifikat LPJK',
        'Kit peralatan dasar',
        'Akses grup diskusi',
        'Konsultasi dengan instruktur',
        'Job placement assistance',
        'Update materi selamanya'
      ],
      curriculum: [
        {
          title: 'Pengenalan Dasar Kelistrikan',
          duration: '1 hari',
          lessons: [
            'Konsep dasar listrik (arus, tegangan, hambatan)',
            'Jenis-jenis komponen listrik',
            'Alat-alat kerja tukang listrik',
            'Standar keselamatan kerja'
          ]
        },
        {
          title: 'Instalasi Titik Lampu',
          duration: '1.5 hari',
          lessons: [
            'Perencanaan titik lampu',
            'Pemasangan saklar tunggal dan ganda',
            'Instalasi fitting lampu',
            'Pengujian rangkaian'
          ]
        },
        {
          title: 'Instalasi Stop Kontak',
          duration: '1 hari',
          lessons: [
            'Jenis-jenis stop kontak',
            'Pemasangan stop kontak biasa',
            'Instalasi stop kontak khusus (AC, water heater)',
            'Grounding dan pengaman'
          ]
        },
        {
          title: 'Sistem Distribusi Panel',
          duration: '1.5 hari',
          lessons: [
            'Pengenalan panel listrik',
            'Pemasangan MCB dan sekering',
            'Wiring diagram sederhana',
            'Testing dan commissioning'
          ]
        }
      ],
      ratingBreakdown: {
        5: 120,
        4: 28,
        3: 6,
        2: 1,
        1: 1
      },
      reviewsList: [
        {
          id: 1,
          name: 'Ahmad Rizki',
          rating: 5,
          date: '2 minggu lalu',
          comment: 'Pelatihan sangat bagus dan mudah dipahami. Instruktur sabar dan berpengalaman. Sekarang saya sudah bisa kerja mandiri sebagai tukang listrik.'
        },
        {
          id: 2,
          name: 'Sari Dewi',
          rating: 5,
          date: '1 bulan lalu',
          comment: 'Materi lengkap dan praktis. Yang paling saya suka adalah dapat sertifikat resmi LPJK yang bisa dipakai untuk melamar kerja di proyek pemerintah.'
        },
        {
          id: 3,
          name: 'Budi Hartono',
          rating: 4,
          date: '1 bulan lalu',
          comment: 'Pelatihan bagus, tapi mungkin durasi bisa diperpanjang sedikit. Overall recommended untuk yang mau belajar listrik dari nol.'
        }
      ]
    },
    '2': {
      id: 2,
      title: 'Sertifikasi Tukang Batu Profesional',
      description: 'Program komprehensif untuk menjadi tukang batu bersertifikat LPJK. Termasuk teknik modern dan peralatan terbaru.',
      fullDescription: 'Program sertifikasi lengkap yang dirancang untuk menghasilkan tukang batu profesional yang kompeten dan bersertifikat. Mencakup semua aspek pekerjaan masonry dari foundation hingga finishing dengan standar kualitas tinggi.',
      image: 'https://picsum.photos/seed/tukang-batu-2/400/240',
      level: 'Menengah',
      category: 'Spesialisasi',
      duration: '10 Hari',
      price: 1200000,
      originalPrice: null,
      paymentOptions: 'Bisa dicicil 5x',
      participants: 856,
      rating: 4.9,
      reviews: 94,
      instructor: 'Joko Widodo',
      instructorTitle: 'Master Tukang Batu, Sertifikasi Internasional',
      instructorRating: 4.9,
      instructorStudents: 1456,
      skills: [
        'Teknik Cor Beton',
        'Pemasangan Bata Merah & Batako',
        'Finishing Plester & Acian',
        'Quality Control',
        'Perhitungan Material',
        'Waterproofing',
        'Structural Masonry',
        'Project Management Dasar'
      ],
      requirements: [
        'Pengalaman minimal 6 bulan sebagai tukang',
        'Kondisi fisik prima',
        'Dapat bekerja di ketinggian',
        'Komitmen mengikuti full training',
        'Lulus tes praktek awal'
      ],
      includes: [
        'Sertifikat LPJK Resmi',
        'Modul pelatihan lengkap',
        'Praktik dengan project real',
        'Mentoring 1-on-1',
        'Akses job portal eksklusif',
        'Peralatan praktik',
        'Insurance coverage selama training',
        'Alumni network access'
      ],
      curriculum: [
        {
          title: 'Foundation & Structural',
          duration: '3 hari',
          lessons: [
            'Site preparation dan leveling',
            'Foundation laying techniques',
            'Reinforcement installation',
            'Concrete mixing dan pouring'
          ]
        },
        {
          title: 'Masonry Techniques',
          duration: '4 hari', 
          lessons: [
            'Brick laying patterns',
            'Mortar preparation',
            'Wall construction',
            'Opening installation'
          ]
        },
        {
          title: 'Finishing & Quality',
          duration: '3 hari',
          lessons: [
            'Plastering techniques',
            'Surface finishing',
            'Waterproofing application',
            'Quality inspection'
          ]
        }
      ],
      ratingBreakdown: {
        5: 85,
        4: 7,
        3: 2,
        2: 0,
        1: 0
      },
      reviewsList: [
        {
          id: 1,
          name: 'Supardi',
          rating: 5,
          date: '3 minggu lalu',
          comment: 'Pelatihan terbaik yang pernah saya ikuti. Langsung dapat kerja di proyek perumahan besar setelah lulus.'
        },
        {
          id: 2,
          name: 'Wawan Setiawan',
          rating: 5,
          date: '1 bulan lalu',
          comment: 'Instruktur sangat berpengalaman, materinya up to date dengan teknik modern. Worth every penny!'
        }
      ]
    }
  }
  
  course.value = courses[courseId] || null
  loading.value = false
}

// Load course on mount
onMounted(() => {
  loadCourse()
})
</script>