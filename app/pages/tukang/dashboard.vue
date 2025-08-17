<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header with User Info -->
    <header class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img
              v-if="user?.avatar"
              :src="user.avatar"
              :alt="`Foto ${user.name}`"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div
              v-else
              class="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            >
              <UserIcon size="24" class="text-white" />
            </div>

            <div>
              <h1 class="text-xl font-heading font-semibold text-text-900">
                Selamat datang, {{ user?.name || "Tukang" }}!
              </h1>
              <p class="text-sm text-text-500">
                {{ getGreeting() }} · {{ getCurrentDate() }}
              </p>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="flex items-center space-x-3">
            <button
              @click="showNotifications = !showNotifications"
              class="relative p-2 text-text-500 hover:text-text-900 rounded-full hover:bg-gray-100"
            >
              <BellIcon size="20" />
              <span
                v-if="unreadNotifications > 0"
                class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ unreadNotifications > 9 ? "9+" : unreadNotifications }}
              </span>
            </button>

            <NuxtLink to="/tukang/profile/edit" class="btn-ghost text-sm">
              <SettingsIcon size="16" class="mr-1" />
              Profil
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="card p-4 text-center">
          <div
            class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <BriefcaseIcon size="16" class="text-primary" />
          </div>
          <p class="text-2xl font-heading font-bold text-text-900">
            {{ stats.activeJobs }}
          </p>
          <p class="text-xs text-text-500">Pekerjaan Aktif</p>
        </div>

        <div class="card p-4 text-center">
          <div
            class="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <AwardIcon size="16" class="text-success" />
          </div>
          <p class="text-2xl font-heading font-bold text-text-900">
            {{ stats.certificates }}
          </p>
          <p class="text-xs text-text-500">Sertifikat</p>
        </div>

        <div class="card p-4 text-center">
          <div
            class="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <StarIcon size="16" class="text-accent" />
          </div>
          <p class="text-2xl font-heading font-bold text-text-900">
            {{ stats.rating.toFixed(1) }}
          </p>
          <p class="text-xs text-text-500">Rating</p>
        </div>

        <div class="card p-4 text-center">
          <div
            class="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <TrendingUpIcon size="16" class="text-secondary" />
          </div>
          <p class="text-2xl font-heading font-bold text-text-900">
            {{ formatPrice(stats.monthlyEarnings) }}
          </p>
          <p class="text-xs text-text-500">Bulan Ini</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card p-6 mb-8">
        <h3 class="font-heading font-semibold text-text-900 mb-4">
          Aksi Cepat
        </h3>

        <div class="space-y-3">
          <NuxtLink
            to="/tukang/portfolio"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderIcon size="20" class="text-primary mr-3" />
            <span class="text-sm text-text-900">Kelola Portofolio</span>
          </NuxtLink>

          <NuxtLink
            to="/courses"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BookOpenIcon size="20" class="text-accent mr-3" />
            <span class="text-sm text-text-900">Cari Pelatihan</span>
          </NuxtLink>

          <button
            @click="shareProfile"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
          >
            <ShareIcon size="20" class="text-secondary mr-3" />
            <span class="text-sm text-text-900">Bagikan Profil</span>
          </button>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Completion -->
          <div
            v-if="!user?.profileComplete"
            class="card p-6 border-l-4 border-l-accent"
          >
            <div class="flex items-start space-x-4">
              <div
                class="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <AlertCircleIcon size="20" class="text-accent" />
              </div>
              <div class="flex-1">
                <h3
                  class="font-heading font-semibold text-lg text-text-900 mb-2"
                >
                  Lengkapi Profil Anda
                </h3>
                <p class="text-text-500 mb-4">
                  Profil yang lengkap meningkatkan peluang mendapat pekerjaan
                  hingga 5x lebih besar!
                </p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm text-text-500"
                    >Kelengkapan: {{ profileCompletion }}%</span
                  >
                  <div class="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-accent h-2 rounded-full transition-all duration-300"
                      :style="{ width: `${profileCompletion}%` }"
                    ></div>
                  </div>
                </div>
                <NuxtLink to="/tukang/profile/create" class="btn-primary">
                  Lengkapi Sekarang
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Job Matches -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-heading font-semibold text-lg text-text-900">
                Pekerjaan untuk Anda
              </h3>
              <NuxtLink
                to="/jobs/search"
                class="text-primary text-sm hover:text-primary-600"
              >
                Lihat Semua
              </NuxtLink>
            </div>

            <div class="space-y-4">
              <div
                v-for="job in jobMatches"
                :key="job.id"
                class="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                @click="navigateToJob(job.id)"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <h4 class="font-medium text-text-900 mb-1">
                      {{ job.title }}
                    </h4>
                    <p class="text-sm text-text-500 mb-2">{{ job.company }}</p>
                    <div
                      class="flex items-center text-sm text-text-500 space-x-4"
                    >
                      <div class="flex items-center">
                        <MapPinIcon size="14" class="mr-1" />
                        {{ job.location }}
                      </div>
                      <div class="flex items-center">
                        <ClockIcon size="14" class="mr-1" />
                        {{ job.duration }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-primary">
                      {{ formatPrice(job.budget) }}
                    </p>
                    <p class="text-xs text-text-500">{{ job.paymentType }}</p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="skill in job.skills.slice(0, 3)"
                      :key="skill"
                      class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {{ skill }}
                    </span>
                    <span
                      v-if="job.skills.length > 3"
                      class="px-2 py-1 bg-gray-100 text-text-500 text-xs rounded-full"
                    >
                      +{{ job.skills.length - 3 }} lagi
                    </span>
                  </div>
                  <span class="text-xs text-success"
                    >{{ job.matchPercentage }}% cocok</span
                  >
                </div>
              </div>
            </div>

            <div v-if="jobMatches.length === 0" class="text-center py-8">
              <BriefcaseIcon size="48" class="mx-auto text-text-500 mb-3" />
              <p class="text-text-500 mb-4">Belum ada pekerjaan yang cocok</p>
              <NuxtLink to="/tukang/profile/create" class="btn-primary">
                Lengkapi Profil untuk Rekomendasi
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Training Recommendations -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-heading font-semibold text-text-900">
                Pelatihan Direkomendasikan
              </h3>
              <NuxtLink
                to="/courses"
                class="text-primary text-sm hover:text-primary-600"
              >
                Lihat Semua
              </NuxtLink>
            </div>

            <div class="space-y-4">
              <div
                v-for="training in recommendedTrainings"
                :key="training.id"
                class="border border-border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                @click="navigateToTraining(training.id)"
              >
                <img
                  :src="training.thumbnail"
                  :alt="training.title"
                  class="w-full h-24 object-cover rounded mb-3"
                  loading="lazy"
                />
                <h4 class="font-medium text-sm text-text-900 mb-1 line-clamp-2">
                  {{ training.title }}
                </h4>
                <div
                  class="flex items-center justify-between text-xs text-text-500"
                >
                  <span>{{ training.duration }} jam</span>
                  <span class="text-success font-medium">
                    {{
                      training.price === 0
                        ? "Gratis"
                        : formatPrice(training.price)
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card p-6">
            <h3 class="font-heading font-semibold text-lg text-text-900 mb-4">
              Aktivitas Terbaru
            </h3>

            <div class="space-y-4">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    activity.type === 'job' ? 'bg-primary/10 text-primary' : '',
                    activity.type === 'training'
                      ? 'bg-success/10 text-success'
                      : '',
                    activity.type === 'certificate'
                      ? 'bg-accent/10 text-accent'
                      : '',
                  ]"
                >
                  <component :is="getActivityIcon(activity.type)" size="16" />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text-900">{{ activity.title }}</p>
                  <p class="text-xs text-text-500">
                    {{ formatRelativeTime(activity.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications Popup -->
    <div
      v-if="showNotifications"
      class="fixed inset-0 z-50 overflow-hidden"
      @click="showNotifications = false"
    >
      <div class="absolute inset-0 bg-black/20"></div>
      <div
        class="absolute top-16 right-4 w-80 bg-bg-surface rounded-lg shadow-lg border border-border max-h-96 overflow-y-auto"
        @click.stop
      >
        <div class="p-4 border-b border-border">
          <h3 class="font-heading font-semibold text-text-900">Notifikasi</h3>
        </div>
        <div class="divide-y divide-border">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="p-4 hover:bg-gray-50"
          >
            <p class="text-sm text-text-900 mb-1">{{ notification.title }}</p>
            <p class="text-xs text-text-500">
              {{ formatRelativeTime(notification.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "~/stores/user";

// Nuxt auto-imported helpers
declare const useHead: any;
declare function navigateTo(url: string): any;

// User store
const userStore = useUserStore();
const user = computed(() => userStore.user);

// Reactive state
const showNotifications = ref(false);
const unreadNotifications = ref(3);

// Mock data
const stats = ref({
  activeJobs: 2,
  certificates: 4,
  rating: 4.8,
  monthlyEarnings: 12500000,
});

const profileCompletion = computed(() => {
  if (!user.value) return 0;
  let completion = 0;
  if (user.value.name) completion += 20;
  if (user.value.phone) completion += 20;
  if (user.value.avatar) completion += 20;
  if (user.value.profileComplete) completion += 40;
  return completion;
});

const jobMatches = ref([
  {
    id: "1",
    title: "Renovasi Rumah Type 45",
    company: "PT. Sukses Bangun",
    location: "Jakarta Selatan",
    duration: "2-3 minggu",
    budget: 15000000,
    paymentType: "per proyek",
    skills: ["Bangunan", "Cat", "Keramik", "Plumbing"],
    matchPercentage: 95,
    postedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Instalasi Listrik Rumah Baru",
    company: "CV. Listrik Jaya",
    location: "Tangerang",
    duration: "1 minggu",
    budget: 8000000,
    paymentType: "per proyek",
    skills: ["Listrik", "Panel", "Instalasi"],
    matchPercentage: 88,
    postedAt: "2025-01-14",
  },
]);

const recommendedTrainings = ref([
  {
    id: "1",
    title: "Teknik Las Modern untuk Konstruksi",
    duration: 16,
    price: 125000,
    thumbnail: "https://picsum.photos/seed/welding-1/300/200",
  },
  {
    id: "2",
    title: "Manajemen Proyek untuk Tukang",
    duration: 8,
    price: 150000,
    thumbnail: "https://picsum.photos/seed/management-2/300/200",
  },
]);

const recentActivities = ref([
  {
    id: "1",
    type: "job",
    title: 'Melamar pekerjaan "Renovasi Dapur Minimalis"',
    createdAt: "2025-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "training",
    title: 'Menyelesaikan pelatihan "Dasar Konstruksi"',
    createdAt: "2025-01-14T15:45:00Z",
  },
  {
    id: "3",
    type: "certificate",
    title: 'Mendapat sertifikat "Tukang Bangunan Terampil"',
    createdAt: "2025-01-13T09:20:00Z",
  },
]);

const notifications = ref([
  {
    id: "1",
    title: "Aplikasi Anda diterima untuk proyek renovasi!",
    createdAt: "2025-01-15T14:30:00Z",
  },
  {
    id: "2",
    title: 'Pelatihan baru: "Teknik Plumbing Modern"',
    createdAt: "2025-01-15T09:15:00Z",
  },
  {
    id: "3",
    title: "Profil Anda dilihat 12 kali minggu ini",
    createdAt: "2025-01-14T16:45:00Z",
  },
]);

// Methods
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat pagi";
  if (hour < 17) return "Selamat siang";
  return "Selamat sore";
};

const getCurrentDate = () => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Baru saja";
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
  return date.toLocaleDateString("id-ID");
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "job":
      return "BriefcaseIcon";
    case "training":
      return "BookOpenIcon";
    case "certificate":
      return "AwardIcon";
    default:
      return "CircleIcon";
  }
};

const navigateToJob = (jobId: string) => {
  navigateTo(`/jobs/search/${jobId}`);
};

const navigateToTraining = (trainingId: string) => {
  navigateTo(`/courses/${trainingId}`);
};

const shareProfile = () => {
  if (navigator.share && user.value) {
    navigator.share({
      title: `Profil ${user.value.name} - TukangIn`,
      text: `Lihat profil tukang profesional ${user.value.name} di TukangIn`,
      url: `${window.location.origin}/tukang/profile/${user.value.id}`,
    });
  } else {
    // Fallback: copy to clipboard
    const profileUrl = `${window.location.origin}/tukang/profile/${user.value?.id}`;
    navigator.clipboard.writeText(profileUrl);
    // You would show a toast notification here
    alert("Link profil disalin ke clipboard!");
  }
};

// SEO
useHead({
  title: "Dashboard - TukangIn",
  meta: [
    {
      name: "description",
      content:
        "Dashboard tukang profesional - kelola pekerjaan, pelatihan, dan sertifikat Anda",
    },
  ],
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>
