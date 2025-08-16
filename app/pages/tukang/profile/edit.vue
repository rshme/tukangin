<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-heading font-bold text-text-900">
            Edit Profil
          </h1>
          <div class="flex items-center space-x-4">
            <button @click="saveProfile" class="btn-primary" :disabled="isSaving">
              {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
            </button>
            <NuxtLink to="/tukang/dashboard" class="text-text-500 hover:text-text-900">
              <XIcon size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Sidebar - Profile Photo & Quick Stats -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-8">
              <!-- Profile Photo -->
              <div class="text-center mb-6">
                <div class="relative inline-block">
                  <img
                    v-if="profile.avatar"
                    :src="profile.avatar"
                    alt="Foto profil"
                    class="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <div
                    v-else
                    class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto"
                  >
                    <UserIcon size="48" class="text-text-500" />
                  </div>
                  
                  <label
                    for="avatar-upload"
                    class="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600"
                  >
                    <CameraIcon size="20" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    @change="handleAvatarUpload"
                    class="hidden"
                  />
                </div>
                <h3 class="text-lg font-heading font-semibold text-text-900 mt-4">
                  {{ profile.name }}
                </h3>
                <p class="text-text-500">{{ profile.primarySkill }}</p>
              </div>

              <!-- Profile Completion -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-text-900">Kelengkapan Profil</span>
                  <span class="text-sm text-text-500">{{ profileCompletion }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-success h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${profileCompletion}%` }"
                  ></div>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-text-500">Rating</span>
                  <div class="flex items-center space-x-1">
                    <StarIcon size="16" class="text-warning fill-current" />
                    <span class="text-sm font-medium text-text-900">4.8</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-text-500">Proyek Selesai</span>
                  <span class="text-sm font-medium text-text-900">12</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-text-500">Tingkat Respons</span>
                  <span class="text-sm font-medium text-text-900">95%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content - Form Sections -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Basic Information -->
            <div class="card p-6">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
                Informasi Dasar
              </h2>

              <form @submit.prevent class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="name" class="block text-sm font-medium text-text-900 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      id="name"
                      v-model="profile.name"
                      type="text"
                      required
                      class="form-input"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium text-text-900 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      v-model="profile.email"
                      type="email"
                      class="form-input"
                      placeholder="email@contoh.com"
                    />
                  </div>

                  <div>
                    <label for="phone" class="block text-sm font-medium text-text-900 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      id="phone"
                      v-model="profile.phone"
                      type="tel"
                      readonly
                      class="form-input bg-gray-50"
                      placeholder="08xxxxxxxxxx"
                    />
                    <p class="text-xs text-text-500 mt-1">
                      Nomor telepon tidak dapat diubah
                    </p>
                  </div>

                  <div>
                    <label for="location" class="block text-sm font-medium text-text-900 mb-2">
                      Lokasi Domisili *
                    </label>
                    <select
                      id="location"
                      v-model="profile.location"
                      required
                      class="form-input"
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
                  </div>

                  <div>
                    <label for="dateOfBirth" class="block text-sm font-medium text-text-900 mb-2">
                      Tanggal Lahir *
                    </label>
                    <input
                      id="dateOfBirth"
                      v-model="profile.dateOfBirth"
                      type="date"
                      required
                      class="form-input"
                    />
                  </div>
                </div>
              </form>
            </div>

            <!-- Skills & Experience -->
            <div class="card p-6">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
                Keahlian & Pengalaman
              </h2>

              <form @submit.prevent class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="primarySkill" class="block text-sm font-medium text-text-900 mb-2">
                      Keahlian Utama *
                    </label>
                    <select
                      id="primarySkill"
                      v-model="profile.primarySkill"
                      required
                      class="form-input"
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
                  </div>

                  <div>
                    <label for="experience" class="block text-sm font-medium text-text-900 mb-2">
                      Lama Pengalaman *
                    </label>
                    <select
                      id="experience"
                      v-model="profile.experienceYears"
                      required
                      class="form-input"
                    >
                      <option value="">Pilih pengalaman</option>
                      <option value="0-1">Kurang dari 1 tahun</option>
                      <option value="1-3">1-3 tahun</option>
                      <option value="3-5">3-5 tahun</option>
                      <option value="5-10">5-10 tahun</option>
                      <option value="10+">Lebih dari 10 tahun</option>
                    </select>
                  </div>
                </div>

                <!-- Additional Skills -->
                <div>
                  <label class="block text-sm font-medium text-text-900 mb-3">
                    Keahlian Tambahan
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label
                      v-for="skill in additionalSkills"
                      :key="skill.value"
                      class="flex items-center"
                    >
                      <input
                        v-model="profile.skills"
                        :value="skill.value"
                        type="checkbox"
                        class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                      />
                      <span class="ml-2 text-sm text-text-900">{{ skill.label }}</span>
                    </label>
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label for="description" class="block text-sm font-medium text-text-900 mb-2">
                    Deskripsi Singkat *
                  </label>
                  <textarea
                    id="description"
                    v-model="profile.description"
                    required
                    rows="4"
                    class="form-input"
                    placeholder="Ceritakan sedikit tentang pengalaman dan keahlian Anda..."
                  ></textarea>
                  <p class="text-xs text-text-500 mt-1">
                    {{ profile.description.length }}/500 karakter
                  </p>
                </div>
              </form>
            </div>

            <!-- Rates & Availability -->
            <div class="card p-6">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
                Tarif & Ketersediaan
              </h2>

              <form @submit.prevent class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="hourlyRate" class="block text-sm font-medium text-text-900 mb-2">
                      Tarif per Jam *
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                      <input
                        id="hourlyRate"
                        v-model="profile.hourlyRate"
                        type="number"
                        required
                        min="0"
                        step="1000"
                        class="form-input pl-12"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div>
                    <label for="dailyRate" class="block text-sm font-medium text-text-900 mb-2">
                      Tarif per Hari
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                      <input
                        id="dailyRate"
                        v-model="profile.dailyRate"
                        type="number"
                        min="0"
                        step="10000"
                        class="form-input pl-12"
                        placeholder="400000"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-text-900 mb-3">
                      Ketersediaan Kerja *
                    </label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input
                          v-model="profile.availability"
                          value="fulltime"
                          type="radio"
                          name="availability"
                          class="h-4 w-4 text-primary border-border focus:ring-primary"
                        />
                        <span class="ml-2 text-sm text-text-900">Full-time (Senin-Sabtu)</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="profile.availability"
                          value="parttime"
                          type="radio"
                          name="availability"
                          class="h-4 w-4 text-primary border-border focus:ring-primary"
                        />
                        <span class="ml-2 text-sm text-text-900">Part-time (Fleksibel)</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="profile.availability"
                          value="weekend"
                          type="radio"
                          name="availability"
                          class="h-4 w-4 text-primary border-border focus:ring-primary"
                        />
                        <span class="ml-2 text-sm text-text-900">Weekend saja</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="profile.availability"
                          value="project"
                          type="radio"
                          name="availability"
                          class="h-4 w-4 text-primary border-border focus:ring-primary"
                        />
                        <span class="ml-2 text-text-900">Berdasarkan proyek</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label for="workRadius" class="block text-sm font-medium text-text-900 mb-2">
                      Radius Kerja *
                    </label>
                    <select
                      id="workRadius"
                      v-model="profile.workRadius"
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
                </div>
              </form>
            </div>

            <!-- Portfolio & Documents -->
            <div class="card p-6">
              <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
                Portofolio & Sertifikat
              </h2>

              <!-- Portfolio Images -->
              <div class="mb-8">
                <label class="block text-sm font-medium text-text-900 mb-3">
                  Foto Hasil Kerja
                </label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div
                    v-for="(image, index) in profile.portfolioImages"
                    :key="index"
                    class="relative aspect-square group"
                  >
                    <img
                      :src="image"
                      alt="Portfolio"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        @click="removePortfolioImage(index)"
                        class="w-8 h-8 bg-danger text-white rounded-full flex items-center justify-center"
                      >
                        <XIcon size="16" />
                      </button>
                    </div>
                  </div>
                  
                  <label
                    v-if="profile.portfolioImages.length < 6"
                    class="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary group"
                  >
                    <ImageIcon size="24" class="text-text-500 group-hover:text-primary mb-2" />
                    <span class="text-xs text-text-500 group-hover:text-primary text-center">Tambah Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      @change="handlePortfolioUpload"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>

              <!-- Certificates -->
              <div>
                <div class="flex items-center justify-between mb-3">
                  <label class="block text-sm font-medium text-text-900">
                    Sertifikat Keahlian
                  </label>
                  <button
                    type="button"
                    @click="showAddCertificate = true"
                    class="btn-ghost text-sm"
                  >
                    + Tambah
                  </button>
                </div>
                
                <div class="space-y-3">
                  <div
                    v-for="(cert, index) in profile.certificates"
                    :key="index"
                    class="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
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
                      class="text-text-400 hover:text-danger transition-colors"
                    >
                      <XIcon size="16" />
                    </button>
                  </div>
                  
                  <div
                    v-if="profile.certificates.length === 0"
                    class="text-center py-8 text-text-500"
                  >
                    <AwardIcon size="32" class="mx-auto mb-2 opacity-50" />
                    <p class="text-sm">Belum ada sertifikat</p>
                    <p class="text-xs">Tambahkan sertifikat untuk meningkatkan kredibilitas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
declare function navigateTo(url: string): any

// Form state
const isSaving = ref(false)
const showAddCertificate = ref(false)

// Mock profile data (in real app, fetch from API)
const profile = reactive({
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  name: 'Budi Santoso',
  phone: '08123456789',
  email: 'budi.santoso@email.com',
  location: 'jakarta',
  dateOfBirth: '1985-03-15',
  primarySkill: 'bangunan',
  skills: ['listrik', 'plumbing'],
  experienceYears: '5-10',
  description: 'Tukang bangunan berpengalaman dengan keahlian listrik dan plumbing. Sudah menangani berbagai proyek renovasi rumah dan pembangunan dari tahap awal hingga finishing.',
  hourlyRate: 65000,
  dailyRate: 500000,
  availability: 'fulltime',
  workRadius: '15',
  portfolioImages: [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=300&fit=crop'
  ],
  certificates: [
    {
      name: 'Tukang Bangunan Bersertifikat',
      issuer: 'Kemnaker RI',
      year: 2020
    },
    {
      name: 'Keselamatan Kerja Konstruksi',
      issuer: 'BNSP',
      year: 2022
    }
  ]
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

// Computed properties
const profileCompletion = computed(() => {
  let score = 0
  const maxScore = 10
  
  if (profile.name) score++
  if (profile.avatar) score++
  if (profile.email) score++
  if (profile.primarySkill) score++
  if (profile.skills.length > 0) score++
  if (profile.description) score++
  if (profile.hourlyRate) score++
  if (profile.portfolioImages.length > 0) score++
  if (profile.certificates.length > 0) score++
  if (profile.availability && profile.workRadius) score++
  
  return Math.round((score / maxScore) * 100)
})

// Methods
const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // In real app, upload to server and get URL
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handlePortfolioUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  files.forEach(file => {
    if (profile.portfolioImages.length < 6) {
      // In real app, upload to server and get URL
      const reader = new FileReader()
      reader.onload = (e) => {
        profile.portfolioImages.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  })
}

const removePortfolioImage = (index: number) => {
  profile.portfolioImages.splice(index, 1)
}

const addCertificate = () => {
  if (newCertificate.name && newCertificate.issuer && newCertificate.year) {
    profile.certificates.push({ ...newCertificate })
    
    // Reset form
    newCertificate.name = ''
    newCertificate.issuer = ''
    newCertificate.year = new Date().getFullYear()
    
    showAddCertificate.value = false
  }
}

const removeCertificate = (index: number) => {
  profile.certificates.splice(index, 1)
}

const saveProfile = async () => {
  isSaving.value = true
  
  try {
    // In real app, submit to API
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
    
    // Show success message
    alert('Profil berhasil disimpan!')
  } catch (error) {
    console.error('Failed to save profile:', error)
    alert('Gagal menyimpan profil. Silakan coba lagi.')
  } finally {
    isSaving.value = false
  }
}

// SEO
useHead({
  title: 'Edit Profil - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Edit profil tukang Anda untuk meningkatkan peluang mendapat pekerjaan di TukangIn'
    }
  ]
})
</script>
