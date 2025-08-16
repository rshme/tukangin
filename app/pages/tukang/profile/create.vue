<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Progress Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-2xl font-heading font-bold text-text-900">
            {{ isEditing ? 'Edit Profil' : 'Buat Profil Tukang' }}
          </h1>
          <NuxtLink to="/tukang/dashboard" class="text-text-500 hover:text-text-900">
            <XIcon size="24" />
          </NuxtLink>
        </div>

        <!-- Progress Bar -->
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm text-text-500">
            Langkah {{ currentStep }} dari {{ totalSteps }}
          </span>
          <span class="text-sm text-text-500">
            {{ Math.round((currentStep / totalSteps) * 100) }}% selesai
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary h-2 rounded-full transition-all duration-300"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Step 1: Basic Info -->
        <div v-if="currentStep === 1" class="card p-8">
          <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
            Informasi Dasar
          </h2>

          <form @submit.prevent="nextStep" class="space-y-6">
            <!-- Profile Photo -->
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  v-if="form.avatar"
                  :src="form.avatar"
                  alt="Foto profil"
                  class="w-24 h-24 rounded-full object-cover mx-auto"
                />
                <div
                  v-else
                  class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto"
                >
                  <UserIcon size="32" class="text-text-500" />
                </div>
                
                <label
                  for="avatar-upload"
                  class="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600"
                >
                  <CameraIcon size="16" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  @change="handleAvatarUpload"
                  class="hidden"
                />
              </div>
              <p class="text-sm text-text-500 mt-2">
                Upload foto profil untuk meningkatkan kredibilitas
              </p>
            </div>

            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-text-900 mb-2">
                Nama Lengkap *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="form-input"
                placeholder="Masukkan nama lengkap"
                :class="{ 'border-danger': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-danger">{{ errors.name }}</p>
            </div>

            <!-- Phone (readonly, from auth) -->
            <div>
              <label for="phone" class="block text-sm font-medium text-text-900 mb-2">
                Nomor Telepon
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                readonly
                class="form-input bg-gray-50"
                placeholder="08xxxxxxxxxx"
              />
              <p class="text-xs text-text-500 mt-1">
                Nomor telepon tidak dapat diubah
              </p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-text-900 mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="email@contoh.com"
                :class="{ 'border-danger': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-danger">{{ errors.email }}</p>
            </div>

            <!-- Location -->
            <div>
              <label for="location" class="block text-sm font-medium text-text-900 mb-2">
                Lokasi Domisili *
              </label>
              <select
                id="location"
                v-model="form.location"
                required
                class="form-input"
                :class="{ 'border-danger': errors.location }"
              >
                <option value="">Pilih kota</option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
                <option value="surabaya">Surabaya</option>
                <option value="medan">Medan</option>
                <option value="yogyakarta">Yogyakarta</option>
                <option value="semarang">Semarang</option>
                <option value="other">Lainnya</option>
              </select>
              <p v-if="errors.location" class="mt-1 text-sm text-danger">{{ errors.location }}</p>
            </div>

            <!-- Date of Birth -->
            <div>
              <label for="dateOfBirth" class="block text-sm font-medium text-text-900 mb-2">
                Tanggal Lahir *
              </label>
              <input
                id="dateOfBirth"
                v-model="form.dateOfBirth"
                type="date"
                required
                class="form-input"
                :class="{ 'border-danger': errors.dateOfBirth }"
              />
              <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-danger">{{ errors.dateOfBirth }}</p>
            </div>

            <div class="flex justify-end">
              <button type="submit" class="btn-primary">
                Selanjutnya
              </button>
            </div>
          </form>
        </div>

        <!-- Step 2: Skills & Experience -->
        <div v-if="currentStep === 2" class="card p-8">
          <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
            Keahlian & Pengalaman
          </h2>

          <form @submit.prevent="nextStep" class="space-y-6">
            <!-- Primary Skill -->
            <div>
              <label for="primarySkill" class="block text-sm font-medium text-text-900 mb-2">
                Keahlian Utama *
              </label>
              <select
                id="primarySkill"
                v-model="form.primarySkill"
                required
                class="form-input"
                :class="{ 'border-danger': errors.primarySkill }"
              >
                <option value="">Pilih keahlian utama</option>
                <option value="bangunan">Tukang Bangunan</option>
                <option value="listrik">Tukang Listrik</option>
                <option value="plumbing">Tukang Plumbing</option>
                <option value="cat">Tukang Cat</option>
                <option value="kayu">Tukang Kayu</option>
                <option value="besi">Tukang Las/Besi</option>
                <option value="keramik">Tukang Keramik</option>
                <option value="atap">Tukang Atap</option>
              </select>
              <p v-if="errors.primarySkill" class="mt-1 text-sm text-danger">{{ errors.primarySkill }}</p>
            </div>

            <!-- Additional Skills -->
            <div>
              <label class="block text-sm font-medium text-text-900 mb-2">
                Keahlian Tambahan
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label
                  v-for="skill in additionalSkills"
                  :key="skill.value"
                  class="flex items-center"
                >
                  <input
                    v-model="form.skills"
                    :value="skill.value"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">{{ skill.label }}</span>
                </label>
              </div>
            </div>

            <!-- Experience Years -->
            <div>
              <label for="experience" class="block text-sm font-medium text-text-900 mb-2">
                Lama Pengalaman *
              </label>
              <select
                id="experience"
                v-model="form.experienceYears"
                required
                class="form-input"
                :class="{ 'border-danger': errors.experienceYears }"
              >
                <option value="">Pilih pengalaman</option>
                <option value="0-1">Kurang dari 1 tahun</option>
                <option value="1-3">1-3 tahun</option>
                <option value="3-5">3-5 tahun</option>
                <option value="5-10">5-10 tahun</option>
                <option value="10+">Lebih dari 10 tahun</option>
              </select>
              <p v-if="errors.experienceYears" class="mt-1 text-sm text-danger">{{ errors.experienceYears }}</p>
            </div>

            <!-- Description -->
            <div>
              <label for="description" class="block text-sm font-medium text-text-900 mb-2">
                Deskripsi Singkat *
              </label>
              <textarea
                id="description"
                v-model="form.description"
                required
                rows="4"
                class="form-input"
                placeholder="Ceritakan sedikit tentang pengalaman dan keahlian Anda..."
                :class="{ 'border-danger': errors.description }"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-danger">{{ errors.description }}</p>
              <p class="text-xs text-text-500 mt-1">
                {{ form.description.length }}/500 karakter
              </p>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="prevStep" class="btn-ghost">
                Kembali
              </button>
              <button type="submit" class="btn-primary">
                Selanjutnya
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Rates & Availability -->
        <div v-if="currentStep === 3" class="card p-8">
          <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
            Tarif & Ketersediaan
          </h2>

          <form @submit.prevent="nextStep" class="space-y-6">
            <!-- Hourly Rate -->
            <div>
              <label for="hourlyRate" class="block text-sm font-medium text-text-900 mb-2">
                Tarif per Jam *
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                <input
                  id="hourlyRate"
                  v-model="form.hourlyRate"
                  type="number"
                  required
                  min="0"
                  step="1000"
                  class="form-input pl-12"
                  placeholder="50000"
                  :class="{ 'border-danger': errors.hourlyRate }"
                />
              </div>
              <p v-if="errors.hourlyRate" class="mt-1 text-sm text-danger">{{ errors.hourlyRate }}</p>
              <p class="text-xs text-text-500 mt-1">
                Tarif rata-rata untuk keahlian Anda: Rp 45.000 - Rp 80.000/jam
              </p>
            </div>

            <!-- Daily Rate -->
            <div>
              <label for="dailyRate" class="block text-sm font-medium text-text-900 mb-2">
                Tarif per Hari
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                <input
                  id="dailyRate"
                  v-model="form.dailyRate"
                  type="number"
                  min="0"
                  step="10000"
                  class="form-input pl-12"
                  placeholder="400000"
                />
              </div>
            </div>

            <!-- Availability -->
            <div>
              <label class="block text-sm font-medium text-text-900 mb-2">
                Ketersediaan Kerja *
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="form.availability"
                    value="fulltime"
                    type="radio"
                    name="availability"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Full-time (Senin-Sabtu)</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.availability"
                    value="parttime"
                    type="radio"
                    name="availability"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Part-time (Fleksibel)</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.availability"
                    value="weekend"
                    type="radio"
                    name="availability"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Weekend saja</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.availability"
                    value="project"
                    type="radio"
                    name="availability"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Berdasarkan proyek</span>
                </label>
              </div>
            </div>

            <!-- Work Radius -->
            <div>
              <label for="workRadius" class="block text-sm font-medium text-text-900 mb-2">
                Radius Kerja *
              </label>
              <select
                id="workRadius"
                v-model="form.workRadius"
                required
                class="form-input"
              >
                <option value="">Pilih radius kerja</option>
                <option value="5">Dalam kota (5km)</option>
                <option value="15">Sekitar kota (15km)</option>
                <option value="30">Antar kota (30km)</option>
                <option value="50">Regional (50km)</option>
                <option value="unlimited">Seluruh Indonesia</option>
              </select>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="prevStep" class="btn-ghost">
                Kembali
              </button>
              <button type="submit" class="btn-primary">
                Selanjutnya
              </button>
            </div>
          </form>
        </div>

        <!-- Step 4: Portfolio & Documents -->
        <div v-if="currentStep === 4" class="card p-8">
          <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
            Portofolio & Dokumen
          </h2>

          <form @submit.prevent="submitProfile" class="space-y-6">
            <!-- Portfolio Images -->
            <div>
              <label class="block text-sm font-medium text-text-900 mb-2">
                Foto Hasil Kerja
              </label>
              <div class="grid grid-cols-3 gap-4 mb-4">
                <div
                  v-for="(image, index) in form.portfolioImages"
                  :key="index"
                  class="relative aspect-square"
                >
                  <img
                    :src="image"
                    alt="Portfolio"
                    class="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    @click="removePortfolioImage(index)"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center"
                  >
                    <XIcon size="12" />
                  </button>
                </div>
                
                <label
                  v-if="form.portfolioImages.length < 6"
                  class="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                >
                  <ImageIcon size="24" class="text-text-500 mb-2" />
                  <span class="text-xs text-text-500 text-center">Tambah Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    @change="handlePortfolioUpload"
                    class="hidden"
                  />
                </label>
              </div>
              <p class="text-xs text-text-500">
                Upload maksimal 6 foto hasil kerja terbaik Anda
              </p>
            </div>

            <!-- Certificates -->
            <div>
              <label class="block text-sm font-medium text-text-900 mb-2">
                Sertifikat Keahlian
              </label>
              <div class="space-y-3">
                <div
                  v-for="(cert, index) in form.certificates"
                  :key="index"
                  class="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <AwardIcon size="20" class="text-success" />
                    <div>
                      <p class="text-sm font-medium text-text-900">{{ cert.name }}</p>
                      <p class="text-xs text-text-500">{{ cert.issuer }} · {{ cert.year }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removeCertificate(index)"
                    class="text-danger hover:text-danger/80"
                  >
                    <XIcon size="16" />
                  </button>
                </div>
                
                <button
                  type="button"
                  @click="showAddCertificate = true"
                  class="w-full p-3 border-2 border-dashed border-border rounded-lg text-text-500 hover:border-primary hover:text-primary"
                >
                  + Tambah Sertifikat
                </button>
              </div>
            </div>

            <div class="flex justify-between">
              <button type="button" @click="prevStep" class="btn-ghost">
                Kembali
              </button>
              <button type="submit" class="btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Menyimpan...' : 'Selesai' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Certificate Modal -->
    <div
      v-if="showAddCertificate"
      class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4"
      @click="showAddCertificate = false"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div
        class="relative bg-bg-surface rounded-lg p-6 w-full max-w-md"
        @click.stop
      >
        <h3 class="text-lg font-heading font-semibold text-text-900 mb-4">
          Tambah Sertifikat
        </h3>
        
        <form @submit.prevent="addCertificate" class="space-y-4">
          <div>
            <label for="certName" class="block text-sm font-medium text-text-900 mb-2">
              Nama Sertifikat *
            </label>
            <input
              id="certName"
              v-model="newCertificate.name"
              type="text"
              required
              class="form-input"
              placeholder="Contoh: Tukang Bangunan Bersertifikat"
            />
          </div>
          
          <div>
            <label for="certIssuer" class="block text-sm font-medium text-text-900 mb-2">
              Penerbit *
            </label>
            <input
              id="certIssuer"
              v-model="newCertificate.issuer"
              type="text"
              required
              class="form-input"
              placeholder="Contoh: Kemnaker RI"
            />
          </div>
          
          <div>
            <label for="certYear" class="block text-sm font-medium text-text-900 mb-2">
              Tahun *
            </label>
            <input
              id="certYear"
              v-model="newCertificate.year"
              type="number"
              required
              min="1980"
              :max="new Date().getFullYear()"
              class="form-input"
              placeholder="2024"
            />
          </div>
          
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddCertificate = false"
              class="btn-ghost"
            >
              Batal
            </button>
            <button type="submit" class="btn-primary">
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare function navigateTo(url: string): any

// Route params to check if editing
const route = useRoute()
const isEditing = computed(() => route.path.includes('/edit'))

// Form state
const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)
const showAddCertificate = ref(false)

// Form data
const form = reactive({
  avatar: '',
  name: '',
  phone: '08123456789', // From auth
  email: '',
  location: '',
  dateOfBirth: '',
  primarySkill: '',
  skills: [] as string[],
  experienceYears: '',
  description: '',
  hourlyRate: null as number | null,
  dailyRate: null as number | null,
  availability: '',
  workRadius: '',
  portfolioImages: [] as string[],
  certificates: [] as Array<{
    name: string
    issuer: string
    year: number
  }>
})

// Error handling
const errors = reactive({
  name: '',
  email: '',
  location: '',
  dateOfBirth: '',
  primarySkill: '',
  experienceYears: '',
  description: '',
  hourlyRate: ''
})

// Additional skills options
const additionalSkills = [
  { value: 'bangunan', label: 'Bangunan' },
  { value: 'listrik', label: 'Listrik' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'cat', label: 'Cat' },
  { value: 'kayu', label: 'Kayu' },
  { value: 'besi', label: 'Las/Besi' },
  { value: 'keramik', label: 'Keramik' },
  { value: 'atap', label: 'Atap' },
  { value: 'taman', label: 'Taman' },
  { value: 'interior', label: 'Interior' }
]

// New certificate form
const newCertificate = reactive({
  name: '',
  issuer: '',
  year: new Date().getFullYear()
})

// Methods
const nextStep = () => {
  if (validateCurrentStep()) {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const validateCurrentStep = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  if (currentStep.value === 1) {
    if (!form.name.trim()) {
      errors.name = 'Nama wajib diisi'
      isValid = false
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Format email tidak valid'
      isValid = false
    }
    
    if (!form.location) {
      errors.location = 'Lokasi wajib dipilih'
      isValid = false
    }
    
    if (!form.dateOfBirth) {
      errors.dateOfBirth = 'Tanggal lahir wajib diisi'
      isValid = false
    }
  }

  if (currentStep.value === 2) {
    if (!form.primarySkill) {
      errors.primarySkill = 'Keahlian utama wajib dipilih'
      isValid = false
    }
    
    if (!form.experienceYears) {
      errors.experienceYears = 'Pengalaman wajib dipilih'
      isValid = false
    }
    
    if (!form.description.trim()) {
      errors.description = 'Deskripsi wajib diisi'
      isValid = false
    } else if (form.description.length > 500) {
      errors.description = 'Deskripsi maksimal 500 karakter'
      isValid = false
    }
  }

  if (currentStep.value === 3) {
    if (!form.hourlyRate || form.hourlyRate <= 0) {
      errors.hourlyRate = 'Tarif per jam wajib diisi'
      isValid = false
    }
  }

  return isValid
}

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // In real app, upload to server and get URL
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handlePortfolioUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  files.forEach(file => {
    if (form.portfolioImages.length < 6) {
      // In real app, upload to server and get URL
      const reader = new FileReader()
      reader.onload = (e) => {
        form.portfolioImages.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  })
}

const removePortfolioImage = (index: number) => {
  form.portfolioImages.splice(index, 1)
}

const addCertificate = () => {
  if (newCertificate.name && newCertificate.issuer && newCertificate.year) {
    form.certificates.push({ ...newCertificate })
    
    // Reset form
    newCertificate.name = ''
    newCertificate.issuer = ''
    newCertificate.year = new Date().getFullYear()
    
    showAddCertificate.value = false
  }
}

const removeCertificate = (index: number) => {
  form.certificates.splice(index, 1)
}

const submitProfile = async () => {
  if (!validateCurrentStep()) return

  isSubmitting.value = true
  
  try {
    // In real app, submit to API
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    
    // Redirect to dashboard
    navigateTo('/tukang/dashboard')
  } catch (error) {
    console.error('Failed to save profile:', error)
    alert('Gagal menyimpan profil. Silakan coba lagi.')
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useHead({
  title: `${isEditing.value ? 'Edit' : 'Buat'} Profil - TukangIn`,
  meta: [
    {
      name: 'description',
      content: 'Buat profil tukang profesional dan tingkatkan peluang mendapat pekerjaan di TukangIn'
    }
  ]
})
</script>
