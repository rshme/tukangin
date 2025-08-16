<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-heading font-bold text-text-900">
              Buat Proyek Baru
            </h1>
            <p class="text-text-500 mt-1">
              Posting proyek Anda dan temukan tukang terbaik
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <button @click="saveDraft" class="btn-ghost">
              Simpan Draft
            </button>
            <NuxtLink to="/client/dashboard" class="text-text-500 hover:text-text-900">
              <XIcon size="24" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="flex items-center"
              :class="{ 'flex-1': index < steps.length - 1 }"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                  :class="currentStep >= step.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-text-500'"
                >
                  <CheckIcon v-if="currentStep > step.id" size="20" />
                  <span v-else>{{ step.id }}</span>
                </div>
                <span
                  class="ml-3 font-medium"
                  :class="currentStep >= step.id ? 'text-primary' : 'text-text-500'"
                >
                  {{ step.title }}
                </span>
              </div>
              <div
                v-if="index < steps.length - 1"
                class="flex-1 mx-6 h-1 rounded-full"
                :class="currentStep > step.id ? 'bg-primary' : 'bg-gray-200'"
              ></div>
            </div>
          </div>
        </div>

        <form @submit.prevent="nextStep">
          <!-- Step 1: Basic Information -->
          <div v-if="currentStep === 1" class="card p-8">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Informasi Dasar Proyek
            </h2>

            <div class="space-y-6">
              <!-- Project Title -->
              <div>
                <label for="title" class="block text-sm font-medium text-text-900 mb-2">
                  Judul Proyek *
                </label>
                <input
                  id="title"
                  v-model="project.title"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Contoh: Renovasi Kamar Mandi Utama"
                />
                <p class="text-xs text-text-500 mt-1">
                  Gunakan judul yang jelas dan spesifik
                </p>
              </div>

              <!-- Project Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-text-900 mb-2">
                  Kategori Pekerjaan *
                </label>
                <select
                  id="category"
                  v-model="project.category"
                  required
                  class="form-input"
                >
                  <option value="">Pilih kategori</option>
                  <option value="renovasi">Renovasi</option>
                  <option value="pembangunan">Pembangunan Baru</option>
                  <option value="perbaikan">Perbaikan</option>
                  <option value="instalasi">Instalasi</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <!-- Skills Required -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Keahlian yang Dibutuhkan *
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label
                    v-for="skill in availableSkills"
                    :key="skill.value"
                    class="flex items-center p-3 border border-border rounded-lg hover:border-primary/50 cursor-pointer transition-colors"
                    :class="{ 'border-primary bg-primary/5': project.requiredSkills.includes(skill.value) }"
                  >
                    <input
                      v-model="project.requiredSkills"
                      :value="skill.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <div>
                      <div class="font-medium text-text-900">{{ skill.label }}</div>
                      <div class="text-xs text-text-500">{{ skill.description }}</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Project Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-text-900 mb-2">
                  Deskripsi Proyek *
                </label>
                <textarea
                  id="description"
                  v-model="project.description"
                  required
                  rows="5"
                  class="form-input"
                  placeholder="Jelaskan detail pekerjaan yang ingin dilakukan, kondisi saat ini, hasil yang diharapkan, dll."
                ></textarea>
                <p class="text-xs text-text-500 mt-1">
                  {{ project.description.length }}/1000 karakter
                </p>
              </div>

              <!-- Project Images -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Foto Kondisi Saat Ini
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    v-for="(image, index) in project.images"
                    :key="index"
                    class="relative aspect-square"
                  >
                    <img
                      :src="image"
                      alt="Project"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      @click="removeImage(index)"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center"
                    >
                      <XIcon size="12" />
                    </button>
                  </div>
                  
                  <label
                    v-if="project.images.length < 8"
                    class="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <CameraIcon size="24" class="text-text-500 mb-2" />
                    <span class="text-xs text-text-500 text-center">Tambah Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      @change="handleImageUpload"
                      class="hidden"
                    />
                  </label>
                </div>
                <p class="text-xs text-text-500 mt-2">
                  Upload maksimal 8 foto untuk membantu tukang memahami kondisi proyek
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2: Location & Timeline -->
          <div v-if="currentStep === 2" class="card p-8">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Lokasi & Jadwal
            </h2>

            <div class="space-y-6">
              <!-- Project Location -->
              <div>
                <label for="address" class="block text-sm font-medium text-text-900 mb-2">
                  Alamat Proyek *
                </label>
                <textarea
                  id="address"
                  v-model="project.address"
                  required
                  rows="3"
                  class="form-input"
                  placeholder="Masukkan alamat lengkap proyek"
                ></textarea>
              </div>

              <!-- City -->
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="city" class="block text-sm font-medium text-text-900 mb-2">
                    Kota *
                  </label>
                  <select
                    id="city"
                    v-model="project.city"
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
                  </select>
                </div>

                <div>
                  <label for="district" class="block text-sm font-medium text-text-900 mb-2">
                    Kecamatan
                  </label>
                  <input
                    id="district"
                    v-model="project.district"
                    type="text"
                    class="form-input"
                    placeholder="Masukkan kecamatan"
                  />
                </div>
              </div>

              <!-- Timeline -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Jadwal Proyek *
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label for="startDate" class="block text-sm text-text-500 mb-2">
                      Tanggal Mulai
                    </label>
                    <input
                      id="startDate"
                      v-model="project.startDate"
                      type="date"
                      required
                      class="form-input"
                      :min="today"
                    />
                  </div>
                  <div>
                    <label for="deadline" class="block text-sm text-text-500 mb-2">
                      Deadline (Opsional)
                    </label>
                    <input
                      id="deadline"
                      v-model="project.deadline"
                      type="date"
                      class="form-input"
                      :min="project.startDate || today"
                    />
                  </div>
                </div>
              </div>

              <!-- Duration Estimate -->
              <div>
                <label for="duration" class="block text-sm font-medium text-text-900 mb-2">
                  Estimasi Durasi Pengerjaan
                </label>
                <div class="flex items-center space-x-4">
                  <input
                    id="duration"
                    v-model="project.estimatedDuration"
                    type="number"
                    min="1"
                    class="form-input w-24"
                    placeholder="0"
                  />
                  <select v-model="project.durationUnit" class="form-input w-32">
                    <option value="hari">Hari</option>
                    <option value="minggu">Minggu</option>
                    <option value="bulan">Bulan</option>
                  </select>
                </div>
                <p class="text-xs text-text-500 mt-1">
                  Berikan estimasi yang realistis untuk membantu tukang merencanakan jadwal
                </p>
              </div>

              <!-- Urgency -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Tingkat Urgensi
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label
                    v-for="urgency in urgencyLevels"
                    :key="urgency.value"
                    class="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    :class="{ 'border-primary bg-primary/5': project.urgency === urgency.value }"
                  >
                    <input
                      v-model="project.urgency"
                      :value="urgency.value"
                      type="radio"
                      name="urgency"
                      class="h-4 w-4 text-primary border-border focus:ring-primary mr-3"
                    />
                    <div>
                      <div class="font-medium text-text-900">{{ urgency.label }}</div>
                      <div class="text-xs text-text-500">{{ urgency.description }}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Budget & Requirements -->
          <div v-if="currentStep === 3" class="card p-8">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Budget & Persyaratan
            </h2>

            <div class="space-y-6">
              <!-- Budget Type -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Tipe Budget *
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <label
                    class="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    :class="{ 'border-primary bg-primary/5': project.budgetType === 'fixed' }"
                  >
                    <input
                      v-model="project.budgetType"
                      value="fixed"
                      type="radio"
                      name="budgetType"
                      class="h-4 w-4 text-primary border-border focus:ring-primary mr-3"
                    />
                    <div>
                      <div class="font-medium text-text-900">Budget Tetap</div>
                      <div class="text-xs text-text-500">Saya punya budget yang sudah pasti</div>
                    </div>
                  </label>
                  
                  <label
                    class="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                    :class="{ 'border-primary bg-primary/5': project.budgetType === 'range' }"
                  >
                    <input
                      v-model="project.budgetType"
                      value="range"
                      type="radio"
                      name="budgetType"
                      class="h-4 w-4 text-primary border-border focus:ring-primary mr-3"
                    />
                    <div>
                      <div class="font-medium text-text-900">Range Budget</div>
                      <div class="text-xs text-text-500">Saya punya kisaran budget</div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Budget Amount -->
              <div v-if="project.budgetType === 'fixed'">
                <label for="budget" class="block text-sm font-medium text-text-900 mb-2">
                  Budget Proyek *
                </label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                  <input
                    id="budget"
                    v-model="project.budget"
                    type="number"
                    required
                    min="0"
                    step="100000"
                    class="form-input pl-12"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Budget Range -->
              <div v-if="project.budgetType === 'range'" class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="budgetMin" class="block text-sm font-medium text-text-900 mb-2">
                    Budget Minimum *
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                    <input
                      id="budgetMin"
                      v-model="project.budgetMin"
                      type="number"
                      required
                      min="0"
                      step="100000"
                      class="form-input pl-12"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label for="budgetMax" class="block text-sm font-medium text-text-900 mb-2">
                    Budget Maksimum *
                  </label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">Rp</span>
                    <input
                      id="budgetMax"
                      v-model="project.budgetMax"
                      type="number"
                      required
                      min="0"
                      step="100000"
                      class="form-input pl-12"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <!-- Payment Method -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Metode Pembayaran
                </div>
                <div class="space-y-3">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="project.paymentMethods"
                      :value="method.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3"
                    />
                    <span class="text-sm text-text-900">{{ method.label }}</span>
                  </label>
                </div>
              </div>

              <!-- Requirements -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Persyaratan Khusus
                </div>
                <div class="space-y-3">
                  <label
                    v-for="requirement in specialRequirements"
                    :key="requirement.value"
                    class="flex items-start"
                  >
                    <input
                      v-model="project.requirements"
                      :value="requirement.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3 mt-0.5"
                    />
                    <div>
                      <span class="text-sm font-medium text-text-900">{{ requirement.label }}</span>
                      <p class="text-xs text-text-500">{{ requirement.description }}</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Additional Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-text-900 mb-2">
                  Catatan Tambahan
                </label>
                <textarea
                  id="notes"
                  v-model="project.notes"
                  rows="4"
                  class="form-input"
                  placeholder="Tambahkan informasi penting lainnya yang perlu diketahui tukang..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Step 4: Review & Publish -->
          <div v-if="currentStep === 4" class="card p-8">
            <h2 class="text-xl font-heading font-semibold text-text-900 mb-6">
              Review & Publikasi
            </h2>

            <!-- Project Summary -->
            <div class="bg-bg-page rounded-lg p-6 mb-6">
              <h3 class="font-semibold text-text-900 mb-4">Ringkasan Proyek</h3>
              
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-text-900 mb-2">{{ project.title }}</h4>
                  <p class="text-sm text-text-500 mb-4">{{ project.description }}</p>
                  
                  <div class="space-y-2">
                    <div class="flex items-center text-sm">
                      <TagIcon size="16" class="mr-2 text-text-500" />
                      <span>{{ project.category }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <MapPinIcon size="16" class="mr-2 text-text-500" />
                      <span>{{ project.city }}</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <CalendarIcon size="16" class="mr-2 text-text-500" />
                      <span>Mulai {{ formatDate(project.startDate) }}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div class="mb-4">
                    <h5 class="font-medium text-text-900 mb-2">Budget</h5>
                    <p class="text-lg font-bold text-primary">
                      <span v-if="project.budgetType === 'fixed'">
                        {{ formatCurrency(project.budget) }}
                      </span>
                      <span v-else>
                        {{ formatCurrency(project.budgetMin) }} - {{ formatCurrency(project.budgetMax) }}
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <h5 class="font-medium text-text-900 mb-2">Keahlian yang Dibutuhkan</h5>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="skill in project.requiredSkills"
                        :key="skill"
                        class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {{ getSkillLabel(skill) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Visibility Settings -->
            <div class="mb-6">
              <h3 class="font-semibold text-text-900 mb-4">Pengaturan Publikasi</h3>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 class="font-medium text-text-900">Tukang yang Bisa Melamar</h4>
                    <p class="text-sm text-text-500">Pilih siapa yang bisa melihat dan melamar proyek ini</p>
                  </div>
                  <select v-model="project.visibility" class="form-input w-48">
                    <option value="public">Semua Tukang</option>
                    <option value="verified">Hanya Tukang Terverifikasi</option>
                    <option value="certified">Hanya Tukang Bersertifikat</option>
                    <option value="favorites">Hanya Tukang Favorit</option>
                  </select>
                </div>
                
                <div class="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 class="font-medium text-text-900">Batas Waktu Lamaran</h4>
                    <p class="text-sm text-text-500">Berapa lama proyek ini terbuka untuk lamaran</p>
                  </div>
                  <select v-model="project.applicationDeadline" class="form-input w-48">
                    <option value="3">3 Hari</option>
                    <option value="7">1 Minggu</option>
                    <option value="14">2 Minggu</option>
                    <option value="30">1 Bulan</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Terms Acceptance -->
            <div class="mb-6">
              <label class="flex items-start">
                <input
                  v-model="agreedToTerms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-primary border-border rounded focus:ring-primary mr-3 mt-0.5"
                />
                <div class="text-sm">
                  <span class="text-text-900">Saya setuju dengan </span>
                  <a href="#" class="text-primary hover:text-primary-600">Syarat & Ketentuan</a>
                  <span class="text-text-900"> dan </span>
                  <a href="#" class="text-primary hover:text-primary-600">Kebijakan Privasi</a>
                  <span class="text-text-900"> TukangIn</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="prevStep"
              class="btn-ghost"
            >
              <ChevronLeftIcon size="20" class="mr-2" />
              Sebelumnya
            </button>
            <div v-else></div>

            <div class="flex space-x-4">
              <button
                v-if="currentStep < steps.length"
                type="submit"
                class="btn-primary"
              >
                Selanjutnya
                <ChevronRightIcon size="20" class="ml-2" />
              </button>
              <button
                v-else
                type="button"
                @click="publishProject"
                :disabled="!agreedToTerms || isPublishing"
                class="btn-primary"
              >
                {{ isPublishing ? 'Mempublikasi...' : 'Publikasikan Proyek' }}
              </button>
            </div>
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

// Get query params for pre-selected tukang
const route = useRoute()
const preSelectedTukang = route.query.tukang

// Component state
const currentStep = ref(1)
const agreedToTerms = ref(false)
const isPublishing = ref(false)

// Steps configuration
const steps = [
  { id: 1, title: 'Informasi Dasar' },
  { id: 2, title: 'Lokasi & Jadwal' },
  { id: 3, title: 'Budget & Persyaratan' },
  { id: 4, title: 'Review & Publikasi' }
]

// Form data
const project = reactive({
  title: '',
  category: '',
  requiredSkills: [] as string[],
  description: '',
  images: [] as string[],
  address: '',
  city: '',
  district: '',
  startDate: '',
  deadline: '',
  estimatedDuration: null as number | null,
  durationUnit: 'hari',
  urgency: '',
  budgetType: 'range',
  budget: null as number | null,
  budgetMin: null as number | null,
  budgetMax: null as number | null,
  paymentMethods: [] as string[],
  requirements: [] as string[],
  notes: '',
  visibility: 'public',
  applicationDeadline: '7'
})

// Options data
const availableSkills = [
  { value: 'bangunan', label: 'Tukang Bangunan', description: 'Konstruksi & struktur' },
  { value: 'listrik', label: 'Tukang Listrik', description: 'Instalasi & perbaikan listrik' },
  { value: 'plumbing', label: 'Tukang Plumbing', description: 'Instalasi & perbaikan air' },
  { value: 'cat', label: 'Tukang Cat', description: 'Pengecatan & finishing' },
  { value: 'kayu', label: 'Tukang Kayu', description: 'Furniture & konstruksi kayu' },
  { value: 'keramik', label: 'Tukang Keramik', description: 'Pemasangan lantai & dinding' },
  { value: 'atap', label: 'Tukang Atap', description: 'Perbaikan & pemasangan atap' },
  { value: 'besi', label: 'Tukang Las/Besi', description: 'Konstruksi besi & pengelasan' }
]

const urgencyLevels = [
  { value: 'low', label: 'Normal', description: 'Tidak terburu-buru' },
  { value: 'medium', label: 'Mendesak', description: 'Perlu segera dikerjakan' },
  { value: 'high', label: 'Sangat Mendesak', description: 'Butuh penanganan cepat' }
]

const paymentMethods = [
  { value: 'cash', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'installment', label: 'Cicilan/Bertahap' },
  { value: 'after_completion', label: 'Setelah Selesai' }
]

const specialRequirements = [
  {
    value: 'insurance',
    label: 'Asuransi Kerja',
    description: 'Tukang harus memiliki asuransi'
  },
  {
    value: 'experience',
    label: 'Pengalaman Minimal 3 Tahun',
    description: 'Hanya tukang berpengalaman'
  },
  {
    value: 'tools',
    label: 'Bawa Alat Sendiri',
    description: 'Tukang menyediakan alat kerja'
  },
  {
    value: 'weekend',
    label: 'Tersedia Weekend',
    description: 'Bisa bekerja akhir pekan'
  }
]

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods
const nextStep = () => {
  if (validateCurrentStep()) {
    if (currentStep.value < steps.length) {
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
  // Basic validation - in real app, implement comprehensive validation
  if (currentStep.value === 1) {
    return project.title && project.category && project.requiredSkills.length > 0 && project.description
  }
  if (currentStep.value === 2) {
    return project.address && project.city && project.startDate && project.urgency
  }
  if (currentStep.value === 3) {
    if (project.budgetType === 'fixed') {
      return project.budget && project.budget > 0
    } else {
      return project.budgetMin && project.budgetMax && project.budgetMin < project.budgetMax
    }
  }
  return true
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  files.forEach(file => {
    if (project.images.length < 8) {
      // In real app, upload to server and get URL
      const reader = new FileReader()
      reader.onload = (e) => {
        project.images.push(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeImage = (index: number) => {
  project.images.splice(index, 1)
}

const saveDraft = () => {
  // In real app, save to API
  alert('Draft disimpan')
}

const publishProject = async () => {
  if (!agreedToTerms.value) return
  
  isPublishing.value = true
  
  try {
    // In real app, submit to API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Proyek berhasil dipublikasi!')
    navigateTo('/client/projects')
  } catch (error) {
    console.error('Failed to publish project:', error)
    alert('Gagal mempublikasi proyek. Silakan coba lagi.')
  } finally {
    isPublishing.value = false
  }
}

const formatCurrency = (amount: number | null) => {
  if (!amount) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getSkillLabel = (skillValue: string) => {
  const skill = availableSkills.find(s => s.value === skillValue)
  return skill ? skill.label : skillValue
}

// Pre-fill data if tukang is pre-selected
if (preSelectedTukang) {
  // In real app, fetch tukang data and pre-fill relevant skills
}

// SEO
useHead({
  title: 'Buat Proyek Baru - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Posting proyek konstruksi Anda dan temukan tukang terbaik di TukangIn'
    }
  ]
})
</script>
