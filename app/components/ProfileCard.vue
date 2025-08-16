<!-- 
ProfileCard Component - Displays tukang profile information
Implements Gestalt principles: Proximity, Similarity, Common Region
-->
<template>
  <div class="card hover:shadow-lg transition-shadow duration-300">
    <!-- Profile Header -->
    <div class="relative">
      <!-- Background/Banner -->
      <div class="h-20 bg-gradient-to-r from-primary to-primary-600 rounded-t-lg"></div>
      
      <!-- Avatar -->
      <div class="absolute -bottom-8 left-6">
        <div class="relative">
          <img
            v-if="profile.avatar"
            :src="profile.avatar"
            :alt="`Foto ${profile.name}`"
            class="w-16 h-16 rounded-full border-4 border-bg-surface object-cover"
            loading="lazy"
          />
          <div
            v-else
            class="w-16 h-16 rounded-full border-4 border-bg-surface bg-text-500 flex items-center justify-center"
          >
            <UserIcon size="24" class="text-bg-surface" />
          </div>
          
          <!-- Verification Badge -->
          <div
            v-if="profile.isVerified"
            class="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-bg-surface"
          >
            <CheckCircleIcon size="16" class="text-white" />
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="absolute top-4 right-4">
        <button
          @click="$emit('contact', profile.id)"
          class="btn btn-secondary text-sm px-3 py-1"
        >
          <MessageSquareIcon size="16" class="mr-1" />
          Kontak
        </button>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="p-6 pt-12">
      <!-- Basic Info (Proximity principle) -->
      <div class="mb-4">
        <h3 class="font-heading font-semibold text-lg text-text-900 mb-1">
          {{ profile.name }}
        </h3>
        <p class="text-text-500 text-sm mb-2">{{ profile.profession }}</p>
        
        <!-- Location & Experience -->
        <div class="flex items-center space-x-4 text-sm text-text-500">
          <div class="flex items-center">
            <MapPinIcon size="14" class="mr-1" />
            {{ profile.location }}
          </div>
          <div class="flex items-center">
            <ClockIcon size="14" class="mr-1" />
            {{ profile.experience }} tahun
          </div>
        </div>
      </div>

      <!-- Rating & Stats (Similarity principle) -->
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex items-center text-accent mr-2">
            <StarIcon 
              v-for="star in 5" 
              :key="star"
              :size="16"
              :class="star <= Math.floor(profile.rating) ? 'fill-current' : 'stroke-current fill-transparent'"
            />
          </div>
          <span class="text-sm font-medium text-text-900">{{ profile.rating.toFixed(1) }}</span>
          <span class="text-sm text-text-500 ml-1">({{ profile.reviewCount }} ulasan)</span>
        </div>
        
        <div class="text-right">
          <p class="text-lg font-semibold text-primary">{{ formatPrice(profile.priceRange.min) }}</p>
          <p class="text-xs text-text-500">mulai dari</p>
        </div>
      </div>

      <!-- Skills/Certifications (Common Region principle) -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in profile.topSkills"
            :key="skill"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
          >
            {{ skill }}
          </span>
          <span
            v-if="profile.certificationCount > 0"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success"
          >
            <AwardIcon size="12" class="mr-1" />
            {{ profile.certificationCount }} sertifikat
          </span>
        </div>
      </div>

      <!-- Recent Project Preview -->
      <div v-if="profile.recentProject" class="mb-4">
        <h4 class="text-sm font-medium text-text-900 mb-2">Proyek Terbaru</h4>
        <div class="flex items-start space-x-3">
          <img
            :src="profile.recentProject.image"
            :alt="profile.recentProject.title"
            class="w-12 h-12 rounded object-cover"
            loading="lazy"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-text-900 truncate">
              {{ profile.recentProject.title }}
            </p>
            <p class="text-xs text-text-500">
              {{ formatDate(profile.recentProject.completedAt) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          @click="$emit('viewProfile', profile.id)"
          class="btn-ghost flex-1 text-sm"
        >
          <EyeIcon size="16" class="mr-1" />
          Lihat Profil
        </button>
        <button
          @click="$emit('bookmark', profile.id)"
          class="btn-ghost px-3"
          :class="{ 'text-accent': profile.isBookmarked }"
        >
          <BookmarkIcon 
            size="16" 
            :class="profile.isBookmarked ? 'fill-current' : ''"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface RecentProject {
  title: string
  image: string
  completedAt: string
}

interface TukangProfile {
  id: string
  name: string
  profession: string
  location: string
  experience: number
  rating: number
  reviewCount: number
  priceRange: {
    min: number
    max: number
  }
  topSkills: string[]
  certificationCount: number
  avatar?: string
  isVerified: boolean
  isBookmarked: boolean
  recentProject?: RecentProject
}

interface Props {
  profile: TukangProfile
}

interface Emits {
  contact: [id: string]
  viewProfile: [id: string]
  bookmark: [id: string]
}

// Props and emits
defineProps<Props>()
defineEmits<Emits>()

// Utility functions
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' }).format(
    Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}
</script>

<style scoped>
/* Additional styles for enhanced visual hierarchy */
.card {
  @apply transform hover:scale-[1.02] transition-all duration-300;
}

/* Ensure touch targets meet 44px minimum */
button {
  @apply touch-target;
}

/* Star rating animation */
.star-rating {
  @apply transition-colors duration-200;
}
</style>
