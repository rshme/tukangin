<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div class="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="md:col-span-2 space-y-4">
              <div class="h-32 bg-gray-200 rounded"></div>
              <div class="h-24 bg-gray-200 rounded"></div>
            </div>
            <div class="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Content -->
    <div v-else-if="job" class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-text-500 mb-6">
          <NuxtLink to="/jobs/search" class="hover:text-primary">Cari Proyek</NuxtLink>
          <ChevronRightIcon size="16" />
          <span class="text-text-900">{{ job.title }}</span>
        </nav>

        <!-- Job Header -->
        <div class="mb-8">
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div class="flex-1">
              <h1 class="text-3xl font-heading font-bold text-text-900 mb-4">
                {{ job.title }}
              </h1>
              
              <div class="flex flex-wrap items-center gap-4 mb-6">
                <div class="flex items-center text-text-600">
                  <MapPinIcon size="20" class="mr-2" />
                  {{ job.location }}
                </div>
                <div class="flex items-center text-text-600">
                  <CalendarIcon size="20" class="mr-2" />
                  Mulai {{ formatDate(job.startDate) }}
                </div>
                <div class="flex items-center text-text-600">
                  <ClockIcon size="20" class="mr-2" />
                  Diposting {{ job.timeAgo }}
                </div>
                <span
                  class="px-3 py-1 text-sm font-medium rounded-full"
                  :class="getUrgencyClass(job.urgency)"
                >
                  {{ getUrgencyLabel(job.urgency) }}
                </span>
              </div>

              <!-- Skills Required -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="skill in job.skills"
                  :key="skill"
                  class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {{ getSkillLabel(skill) }}
                </span>
              </div>
            </div>

            <!-- Budget & Actions -->
            <div class="lg:w-80">
              <div class="card p-6">
                <div class="text-center mb-6">
                  <div class="text-sm text-text-500 mb-1">Budget Proyek</div>
                  <div class="text-2xl font-bold text-text-900">
                    {{ formatBudget(job) }}
                  </div>
                </div>

                <div class="space-y-4 mb-6">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-text-500">Lamaran diterima:</span>
                    <span class="font-medium">{{ job.applicationsCount }} tukang</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-text-500">Batas lamaran:</span>
                    <span class="font-medium">{{ formatDate(job.applicationDeadline) }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-text-500">Estimasi durasi:</span>
                    <span class="font-medium">{{ job.estimatedDuration }} {{ job.durationUnit }}</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <button
                    @click="applyToJob"
                    :disabled="hasApplied || isApplying"
                    class="btn-primary w-full"
                  >
                    <span v-if="isApplying">Mengirim Lamaran...</span>
                    <span v-else-if="hasApplied">Sudah Melamar</span>
                    <span v-else>Lamar Proyek</span>
                  </button>
                  
                  <button
                    @click="contactClient"
                    class="btn-ghost w-full"
                  >
                    <MessageCircleIcon size="20" class="mr-2" />
                    Hubungi Client
                  </button>
                  
                  <button
                    @click="saveJob"
                    :class="isSaved ? 'btn-primary' : 'btn-ghost'"
                    class="w-full"
                  >
                    <HeartIcon size="20" class="mr-2" :class="{ 'fill-current': isSaved }" />
                    {{ isSaved ? 'Tersimpan' : 'Simpan Proyek' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Project Images -->
            <div v-if="job.images && job.images.length > 0">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Foto Proyek
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="(image, index) in job.images"
                  :key="index"
                  class="aspect-video cursor-pointer rounded-lg overflow-hidden"
                  @click="openImageModal(index)"
                >
                  <img
                    :src="image"
                    :alt="`Foto proyek ${index + 1}`"
                    class="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </div>

            <!-- Project Description -->
            <div>
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Deskripsi Proyek
              </h2>
              <div class="prose prose-gray max-w-none">
                <p class="text-text-600 leading-relaxed whitespace-pre-line">
                  {{ job.description }}
                </p>
              </div>
            </div>

            <!-- Project Requirements -->
            <div v-if="job.requirements && job.requirements.length > 0">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Persyaratan Khusus
              </h2>
              <ul class="space-y-2">
                <li
                  v-for="requirement in job.requirements"
                  :key="requirement"
                  class="flex items-start"
                >
                  <CheckCircleIcon size="20" class="text-success mr-3 mt-0.5 flex-shrink-0" />
                  <span class="text-text-600">{{ requirement }}</span>
                </li>
              </ul>
            </div>

            <!-- Payment Methods -->
            <div v-if="job.paymentMethods && job.paymentMethods.length > 0">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Metode Pembayaran
              </h2>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="method in job.paymentMethods"
                  :key="method"
                  class="px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                >
                  {{ getPaymentMethodLabel(method) }}
                </span>
              </div>
            </div>

            <!-- Additional Notes -->
            <div v-if="job.notes">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Catatan Tambahan
              </h2>
              <div class="bg-bg-surface p-4 rounded-lg">
                <p class="text-text-600 whitespace-pre-line">{{ job.notes }}</p>
              </div>
            </div>

            <!-- Similar Jobs -->
            <div v-if="similarJobs.length > 0">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-4">
                Proyek Serupa
              </h2>
              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="similarJob in similarJobs"
                  :key="similarJob.id"
                  class="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  @click="navigateToJob(similarJob.id)"
                >
                  <h3 class="font-semibold text-text-900 mb-2 line-clamp-2">
                    {{ similarJob.title }}
                  </h3>
                  <div class="flex items-center text-sm text-text-500 mb-2">
                    <MapPinIcon size="16" class="mr-1" />
                    {{ similarJob.location }}
                  </div>
                  <div class="text-primary font-semibold">
                    {{ formatBudget(similarJob) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Client Info -->
            <div class="card p-6">
              <h3 class="font-semibold text-text-900 mb-4">Informasi Client</h3>
              
              <div class="flex items-center mb-4">
                <img
                  :src="job.client.avatar"
                  :alt="job.client.name"
                  class="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div class="flex items-center">
                    <h4 class="font-semibold text-text-900">{{ job.client.name }}</h4>
                    <CheckCircleIcon
                      v-if="job.client.verified"
                      size="16"
                      class="ml-2 text-success"
                    />
                  </div>
                  <div class="flex items-center text-sm text-text-500">
                    <StarIcon size="14" class="mr-1" />
                    {{ job.client.rating }} ({{ job.client.reviewsCount }} ulasan)
                  </div>
                </div>
              </div>

              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-text-500">Bergabung:</span>
                  <span class="font-medium">{{ job.client.joinDate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-500">Proyek selesai:</span>
                  <span class="font-medium">{{ job.client.completedProjects }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-500">Tingkat respon:</span>
                  <span class="font-medium">{{ job.client.responseRate }}%</span>
                </div>
              </div>

              <button
                @click="viewClientProfile"
                class="btn-ghost w-full mt-4"
              >
                Lihat Profil Lengkap
              </button>
            </div>

            <!-- Project Stats -->
            <div class="card p-6">
              <h3 class="font-semibold text-text-900 mb-4">Statistik Proyek</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Dilihat</span>
                  <span class="font-semibold">{{ job.viewCount }} kali</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Lamaran</span>
                  <span class="font-semibold">{{ job.applicationsCount }} tukang</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Diposting</span>
                  <span class="font-semibold">{{ job.timeAgo }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-text-500">Berakhir</span>
                  <span class="font-semibold">{{ formatDate(job.applicationDeadline) }}</span>
                </div>
              </div>
            </div>

            <!-- Safety Tips -->
            <div class="card p-6 bg-warning/5 border-warning/20">
              <h3 class="font-semibold text-text-900 mb-4 flex items-center">
                <ShieldCheckIcon size="20" class="mr-2 text-warning" />
                Tips Keamanan
              </h3>
              
              <ul class="space-y-2 text-sm text-text-600">
                <li class="flex items-start">
                  <div class="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Pastikan bertemu client di tempat umum untuk diskusi awal
                </li>
                <li class="flex items-start">
                  <div class="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Buat kontrak kerja yang jelas sebelum memulai
                </li>
                <li class="flex items-start">
                  <div class="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Jangan transfer uang muka tanpa memverifikasi identitas client
                </li>
                <li class="flex items-start">
                  <div class="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Laporkan aktivitas mencurigakan ke TukangIn
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto">
        <AlertCircleIcon size="64" class="mx-auto text-gray-400 mb-4" />
        <h1 class="text-2xl font-bold text-text-900 mb-2">Proyek Tidak Ditemukan</h1>
        <p class="text-text-500 mb-6">
          Proyek yang Anda cari mungkin sudah dihapus atau tidak tersedia.
        </p>
        <NuxtLink to="/jobs/search" class="btn-primary">
          Cari Proyek Lain
        </NuxtLink>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      @click="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <img
          :src="job?.images?.[currentImageIndex]"
          alt="Project"
          class="max-w-full max-h-full object-contain"
        />
        <button
          @click="closeImageModal"
          class="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
        >
          <XIcon size="24" />
        </button>
        
        <!-- Navigation -->
        <button
          v-if="currentImageIndex > 0"
          @click.stop="prevImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
        >
          <ChevronLeftIcon size="24" />
        </button>
        <button
          v-if="job && job.images && currentImageIndex < job.images.length - 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
        >
          <ChevronRightIcon size="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Types
interface Job {
  id: string
  title: string
  description: string
  location: string
  startDate: string
  applicationDeadline: string
  urgency: 'low' | 'medium' | 'high'
  budget?: number
  budgetMin?: number
  budgetMax?: number
  budgetType: 'fixed' | 'range'
  estimatedDuration: number
  durationUnit: string
  skills: string[]
  images?: string[]
  requirements?: string[]
  paymentMethods?: string[]
  notes?: string
  applicationsCount: number
  viewCount: number
  timeAgo: string
  client: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    reviewsCount: number
    joinDate: string
    completedProjects: number
    responseRate: number
  }
}

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare function navigateTo(url: string): any

const route = useRoute()
const jobId = route.params.id as string

// Component state
const isLoading = ref(true)
const job = ref<Job | null>(null)
const similarJobs = ref<Job[]>([])
const hasApplied = ref(false)
const isApplying = ref(false)
const isSaved = ref(false)
const showImageModal = ref(false)
const currentImageIndex = ref(0)

// Mock data
const mockJob: Job = {
  id: '1',
  title: 'Renovasi Kamar Mandi Utama',
  description: `Kami membutuhkan tukang berpengalaman untuk renovasi total kamar mandi utama di rumah kami. 

Ruang lingkup pekerjaan:
- Bongkar keramik lama dan instalasi plumbing existing
- Pemasangan keramik dinding dan lantai baru
- Instalasi shower set dan wastafel baru  
- Perbaikan sistem plumbing dan sanitasi
- Pengecatan dan finishing

Ukuran kamar mandi: 3x4 meter
Kondisi saat ini: Keramik lama sudah pecah-pecah, plumbing bocor di beberapa titik
Target selesai: Desain modern minimalis dengan warna netral

Kami sudah menyiapkan material keramik dan fixtures. Tukang hanya perlu menyediakan alat kerja dan material pendukung seperti semen, lem, dll.`,
  location: 'Kebayoran Baru, Jakarta Selatan',
  startDate: '2024-02-15',
  applicationDeadline: '2024-02-10',
  urgency: 'medium',
  budgetType: 'range',
  budgetMin: 15000000,
  budgetMax: 25000000,
  estimatedDuration: 14,
  durationUnit: 'hari',
  skills: ['plumbing', 'keramik', 'listrik'],
  images: [
    '/images/bathroom-current-1.jpg',
    '/images/bathroom-current-2.jpg',
    '/images/bathroom-design.jpg'
  ],
  requirements: [
    'Pengalaman minimal 3 tahun dalam renovasi kamar mandi',
    'Memiliki alat kerja lengkap (bor, gerinda, dll)',
    'Bisa bekerja weekday dan weekend',
    'Memberikan garansi kerja minimal 6 bulan'
  ],
  paymentMethods: ['transfer', 'installment'],
  notes: 'Lokasi di lantai 2, akses tangga agak sempit. Parkir motor tersedia di depan rumah. Lebih diutamakan tukang yang sudah pernah mengerjakan proyek serupa dan bisa menunjukkan portfolio.',
  applicationsCount: 12,
  viewCount: 89,
  timeAgo: '2 jam lalu',
  client: {
    id: 'c1',
    name: 'Budi Santoso',
    avatar: '/images/avatar-1.jpg',
    verified: true,
    rating: 4.8,
    reviewsCount: 23,
    joinDate: 'Maret 2023',
    completedProjects: 15,
    responseRate: 92
  }
}

const mockSimilarJobs: Job[] = [
  {
    id: '2',
    title: 'Renovasi Dapur Minimalis',
    description: 'Renovasi dapur dengan konsep minimalis modern...',
    location: 'Pondok Indah, Jakarta Selatan',
    startDate: '2024-02-20',
    applicationDeadline: '2024-02-15',
    urgency: 'low',
    budgetType: 'range',
    budgetMin: 20000000,
    budgetMax: 30000000,
    estimatedDuration: 21,
    durationUnit: 'hari',
    skills: ['keramik', 'kayu', 'listrik'],
    applicationsCount: 8,
    viewCount: 45,
    timeAgo: '1 hari lalu',
    client: {
      id: 'c2',
      name: 'Sari Dewi',
      avatar: '/images/avatar-2.jpg',
      verified: true,
      rating: 4.9,
      reviewsCount: 31,
      joinDate: 'Januari 2023',
      completedProjects: 12,
      responseRate: 95
    }
  }
]

// Computed properties
const skills = [
  { value: 'bangunan', label: 'Tukang Bangunan' },
  { value: 'listrik', label: 'Tukang Listrik' },
  { value: 'plumbing', label: 'Tukang Plumbing' },
  { value: 'cat', label: 'Tukang Cat' },
  { value: 'kayu', label: 'Tukang Kayu' },
  { value: 'keramik', label: 'Tukang Keramik' },
  { value: 'atap', label: 'Tukang Atap' }
]

const paymentMethods = [
  { value: 'cash', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'installment', label: 'Cicilan/Bertahap' },
  { value: 'after_completion', label: 'Setelah Selesai' }
]

const urgencyLevels = [
  { value: 'low', label: 'Normal' },
  { value: 'medium', label: 'Mendesak' },
  { value: 'high', label: 'Sangat Mendesak' }
]

// Methods
const loadJob = async () => {
  try {
    isLoading.value = true
    
    // In real app, fetch from API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (jobId === '1') {
      job.value = mockJob
      similarJobs.value = mockSimilarJobs
      
      // Check if user has applied (mock check)
      hasApplied.value = false
      isSaved.value = false
    } else {
      job.value = null
    }
  } catch (error) {
    console.error('Failed to load job:', error)
    job.value = null
  } finally {
    isLoading.value = false
  }
}

const applyToJob = async () => {
  if (!job.value || hasApplied.value) return
  
  isApplying.value = true
  
  try {
    // In real app, submit application to API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    hasApplied.value = true
    job.value.applicationsCount++
    
    alert('Lamaran berhasil dikirim!')
  } catch (error) {
    console.error('Failed to apply:', error)
    alert('Gagal mengirim lamaran. Silakan coba lagi.')
  } finally {
    isApplying.value = false
  }
}

const contactClient = () => {
  if (!job.value) return
  navigateTo(`/chat/new?client=${job.value.client.id}&project=${job.value.id}`)
}

const saveJob = () => {
  isSaved.value = !isSaved.value
  // In real app, save to user's saved jobs
}

const viewClientProfile = () => {
  if (!job.value) return
  navigateTo(`/client/${job.value.client.id}`)
}

const navigateToJob = (id: string) => {
  navigateTo(`/jobs/${id}`)
}

const openImageModal = (index: number) => {
  currentImageIndex.value = index
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (job.value && job.value.images && currentImageIndex.value < job.value.images.length - 1) {
    currentImageIndex.value++
  }
}

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatBudget = (jobData: Job) => {
  if (jobData.budgetType === 'fixed') {
    return formatCurrency(jobData.budget!)
  } else {
    return `${formatCurrency(jobData.budgetMin!)} - ${formatCurrency(jobData.budgetMax!)}`
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getSkillLabel = (skillValue: string) => {
  const skill = skills.find(s => s.value === skillValue)
  return skill ? skill.label : skillValue
}

const getPaymentMethodLabel = (methodValue: string) => {
  const method = paymentMethods.find(m => m.value === methodValue)
  return method ? method.label : methodValue
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

// Load data on mount
onMounted(() => {
  loadJob()
})

// SEO
useHead({
  title: computed(() => {
    if (job.value) {
      return `${job.value.title} - TukangIn`
    }
    return 'Proyek - TukangIn'
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        if (job.value) {
          return `${job.value.description.slice(0, 160)}...`
        }
        return 'Detail proyek konstruksi dan renovasi di TukangIn'
      })
    }
  ]
})
</script>
