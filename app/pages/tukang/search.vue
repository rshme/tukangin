<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border sticky top-0 z-40">
      <div class="container mx-auto px-4 py-4 sm:py-6">
        <!-- Mobile Header -->
        <div class="block lg:hidden">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h1 class="text-xl font-heading font-bold text-text-900">
                Cari Tukang
              </h1>
              <p class="text-sm text-text-500 mt-1">
                {{ filteredTukang.length }} tukang ditemukan
              </p>
            </div>
            
            <div class="flex items-center space-x-2">
              <!-- Mobile View Toggle -->
              <div class="flex items-center bg-bg-page rounded-lg p-1">
                <button
                  @click="viewMode = 'grid'"
                  class="p-1.5 rounded-md transition-colors"
                  :class="viewMode === 'grid' ? 'bg-bg-surface text-primary shadow-sm' : 'text-text-500'"
                >
                  <GridIcon size="16" />
                </button>
                <button
                  @click="viewMode = 'list'"
                  class="p-1.5 rounded-md transition-colors"
                  :class="viewMode === 'list' ? 'bg-bg-surface text-primary shadow-sm' : 'text-text-500'"
                >
                  <ListIcon size="16" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Search & Filter Bar -->
          <div class="flex items-center space-x-3">
            <!-- Search Input -->
            <div class="flex-1 relative">
              <SearchIcon size="18" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
              <input
                v-model="filters.search"
                type="text"
                class="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Cari tukang atau keahlian..."
              />
            </div>
            
            <!-- Mobile Filter Button -->
            <button
              @click="showMobileFilters = true"
              class="flex items-center px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium relative"
            >
              <FilterIcon size="16" class="mr-2" />
              Filter
              <span v-if="activeFiltersCount > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                {{ activeFiltersCount }}
              </span>
            </button>
            
            <!-- Mobile Sort -->
            <div class="relative">
              <button
                @click="showMobileSort = !showMobileSort"
                class="flex items-center px-4 py-2.5 border border-border rounded-lg text-sm font-medium"
              >
                <ArrowUpDownIcon size="16" class="mr-2" />
                Sort
              </button>
              
              <!-- Sort Dropdown -->
              <div
                v-if="showMobileSort"
                class="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50"
              >
                <div class="p-2">
                  <button
                    v-for="option in sortOptions"
                    :key="option.value"
                    @click="sortBy = option.value; showMobileSort = false"
                    class="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-bg-hover transition-colors"
                    :class="sortBy === option.value ? 'bg-primary/10 text-primary font-medium' : 'text-text-900'"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Header -->
        <div class="hidden lg:flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-heading font-bold text-text-900">
              Cari Tukang
            </h1>
            <p class="text-text-500 mt-1">
              Temukan tukang terbaik untuk proyek Anda
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- View Toggle -->
            <div class="flex items-center bg-bg-page rounded-lg p-1">
              <button
                @click="viewMode = 'grid'"
                class="p-2 rounded-md transition-colors"
                :class="viewMode === 'grid' ? 'bg-bg-surface text-primary shadow-sm' : 'text-text-500 hover:text-text-900'"
              >
                <GridIcon size="20" />
              </button>
              <button
                @click="viewMode = 'list'"
                class="p-2 rounded-md transition-colors"
                :class="viewMode === 'list' ? 'bg-bg-surface text-primary shadow-sm' : 'text-text-500 hover:text-text-900'"
              >
                <ListIcon size="20" />
              </button>
            </div>
            
            <!-- Sort -->
            <select v-model="sortBy" class="form-input py-2 text-sm min-w-[180px]">
              <option value="rating">Rating Tertinggi</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="experience">Pengalaman Terbanyak</option>
              <option value="distance">Jarak Terdekat</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-4 lg:py-8">
      <div class="lg:grid lg:grid-cols-4 lg:gap-8">
        <!-- Desktop Filters Sidebar -->
        <div class="hidden lg:block lg:col-span-1">
          <div class="card p-6 sticky top-24">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-heading font-semibold text-text-900">
                Filter
              </h2>
              <button
                @click="clearFilters"
                class="text-sm text-text-500 hover:text-primary"
              >
                Reset
              </button>
            </div>

            <!-- Desktop Search -->
            <div class="mb-6">
              <label for="desktop-search" class="block text-sm font-medium text-text-900 mb-2">
                Cari Nama/Keahlian
              </label>
              <div class="relative">
                <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
                <input
                  id="desktop-search"
                  v-model="filters.search"
                  type="text"
                  class="form-input pl-10"
                  placeholder="Masukkan nama atau keahlian"
                />
              </div>
            </div>

            <!-- Location -->
            <div class="mb-6">
              <label for="location" class="block text-sm font-medium text-text-900 mb-2">
                Lokasi
              </label>
              <select id="location" v-model="filters.location" class="form-input">
                <option value="">Semua Lokasi</option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
                <option value="surabaya">Surabaya</option>
                <option value="medan">Medan</option>
                <option value="yogyakarta">Yogyakarta</option>
                <option value="semarang">Semarang</option>
              </select>
            </div>

            <!-- Skills -->
            <div class="mb-6">
              <div class="block text-sm font-medium text-text-900 mb-3">
                Keahlian
              </div>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <label
                  v-for="skill in skillOptions"
                  :key="skill.value"
                  class="flex items-center"
                >
                  <input
                    v-model="filters.skills"
                    :value="skill.value"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">{{ skill.label }}</span>
                  <span class="ml-auto text-xs text-text-500">({{ skill.count }})</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <div class="block text-sm font-medium text-text-900 mb-3">
                Tarif per Jam (Rp)
              </div>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <input
                    v-model="filters.priceMin"
                    type="number"
                    min="0"
                    step="5000"
                    class="form-input flex-1"
                    placeholder="Min"
                  />
                  <span class="text-text-500">-</span>
                  <input
                    v-model="filters.priceMax"
                    type="number"
                    min="0"
                    step="5000"
                    class="form-input flex-1"
                    placeholder="Max"
                  />
                </div>
                <div class="flex items-center justify-between text-xs text-text-500">
                  <span>30.000</span>
                  <span>150.000</span>
                </div>
              </div>
            </div>

            <!-- Rating -->
            <div class="mb-6">
              <div class="block text-sm font-medium text-text-900 mb-3">
                Rating Minimum
              </div>
              <div class="space-y-2">
                <label
                  v-for="rating in [5, 4, 3, 2, 1]"
                  :key="rating"
                  class="flex items-center"
                >
                  <input
                    v-model="filters.minRating"
                    :value="rating"
                    type="radio"
                    name="minRating"
                    class="h-4 w-4 text-primary border-border focus:ring-primary"
                  />
                  <div class="ml-2 flex items-center">
                    <div class="flex items-center">
                      <StarIcon
                        v-for="i in 5"
                        :key="i"
                        size="14"
                        :class="i <= rating ? 'text-warning fill-current' : 'text-gray-300'"
                      />
                    </div>
                    <span class="ml-2 text-sm text-text-900">{{ rating }}.0+</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Availability -->
            <div class="mb-6">
              <div class="block text-sm font-medium text-text-900 mb-3">
                Ketersediaan
              </div>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="filters.availability"
                    value="immediate"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Tersedia Segera</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="filters.availability"
                    value="thisweek"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Minggu Ini</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="filters.availability"
                    value="thismonth"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Bulan Ini</span>
                </label>
              </div>
            </div>

            <!-- Certificates -->
            <div class="mb-6">
              <div class="block text-sm font-medium text-text-900 mb-3">
                Sertifikasi
              </div>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="filters.certified"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Bersertifikat</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="filters.verified"
                    type="checkbox"
                    class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span class="ml-2 text-sm text-text-900">Terverifikasi</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="lg:col-span-3">
          <!-- Desktop Results Header -->
          <div class="hidden lg:flex items-center justify-between mb-6">
            <div>
              <p class="text-text-900 font-medium">
                {{ filteredTukang.length }} tukang ditemukan
              </p>
              <p class="text-sm text-text-500">
                Hasil pencarian di {{ filters.location || 'semua lokasi' }}
              </p>
            </div>
          </div>

          <!-- Results Grid/List -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            <div
              v-for="tukang in paginatedTukang"
              :key="tukang.id"
              class="card p-4 lg:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="viewTukangProfile(tukang.id)"
            >
              <!-- Tukang Header -->
              <div class="flex items-start space-x-3 lg:space-x-4 mb-3 lg:mb-4">
                <div class="relative flex-shrink-0">
                  <img
                    :src="tukang.avatar"
                    :alt="tukang.name"
                    class="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div
                    v-if="tukang.isOnline"
                    class="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-success border-2 border-white rounded-full"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div>
                      <h3 class="font-semibold text-text-900 mb-1 text-sm lg:text-base">{{ tukang.name }}</h3>
                      <p class="text-xs lg:text-sm text-text-500 mb-2">{{ tukang.primarySkill }}</p>
                    </div>
                    <button
                      @click.stop="toggleFavorite(tukang.id)"
                      class="p-1 text-text-400 hover:text-danger transition-colors"
                    >
                      <HeartIcon 
                        size="18" 
                        :class="{ 'fill-current text-danger': tukang.isFavorite }"
                      />
                    </button>
                  </div>
                  
                  <!-- Rating & Experience -->
                  <div class="flex items-center space-x-3 lg:space-x-4 text-xs lg:text-sm">
                    <div class="flex items-center space-x-1">
                      <StarIcon size="12" class="text-warning fill-current" />
                      <span class="font-medium text-text-900">{{ tukang.rating }}</span>
                      <span class="text-text-500">({{ tukang.reviewCount }})</span>
                    </div>
                    <span class="text-text-500">{{ tukang.experience }}th</span>
                  </div>
                </div>
              </div>

              <!-- Skills - Mobile optimized -->
              <div class="mb-3 lg:mb-4">
                <div class="flex flex-wrap gap-1 lg:gap-2">
                  <span
                    v-for="skill in tukang.skills.slice(0, 2)"
                    :key="skill"
                    class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {{ skill }}
                  </span>
                  <span
                    v-if="tukang.skills.length > 2"
                    class="px-2 py-1 bg-gray-100 text-text-500 text-xs rounded-full"
                  >
                    +{{ tukang.skills.length - 2 }}
                  </span>
                </div>
              </div>

              <!-- Location & Price -->
              <div class="flex flex-wrap items-center justify-between text-xs lg:text-sm mb-3 lg:mb-4">
                <div class="md:w-full flex items-center text-text-500">
                  <MapPinIcon size="12" class="mr-1" />
                  <span class="truncate">{{ tukang.location }}</span>
                  <span class="mx-1">•</span>
                  <span>{{ tukang.distance }}km</span>
                </div>
                <div class="md:mt-2 text-right">
                  <p class="font-semibold text-text-900 text-xs lg:text-sm">{{ formatCurrency(tukang.hourlyRate) }}/jam</p>
                </div>
              </div>

              <!-- Badges -->
              <div class="flex items-center space-x-1 lg:space-x-2 mb-3 lg:mb-4">
                <span
                  v-if="tukang.isVerified"
                  class="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                >
                  <CheckIcon size="10" class="mr-1" />
                  <span class="hidden sm:inline">Terverifikasi</span>
                  <span class="sm:hidden">✓</span>
                </span>
                <span
                  v-if="tukang.isCertified"
                  class="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  <AwardIcon size="10" class="mr-1" />
                  <span class="hidden sm:inline">Bersertifikat</span>
                  <span class="sm:hidden">⭐</span>
                </span>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-2">
                <button
                  @click.stop="contactTukang(tukang.id)"
                  class="flex-1 btn-ghost text-xs lg:text-sm py-2"
                >
                  <MessageCircleIcon size="14" class="mr-1 lg:mr-2" />
                  Chat
                </button>
                <button
                  @click.stop="hireTukang(tukang.id)"
                  class="flex-1 btn-primary text-xs lg:text-sm py-2"
                >
                  Hire
                </button>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-else class="space-y-4">
            <div
              v-for="tukang in paginatedTukang"
              :key="tukang.id"
              class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
              @click="viewTukangProfile(tukang.id)"
            >
              <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <div class="relative flex-shrink-0">
                  <img
                    :src="tukang.avatar"
                    :alt="tukang.name"
                    class="w-20 h-20 rounded-full object-cover"
                  />
                  <div
                    v-if="tukang.isOnline"
                    class="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-2 border-white rounded-full"
                  ></div>
                </div>

                <!-- Main Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h3 class="text-lg font-semibold text-text-900 mb-1">{{ tukang.name }}</h3>
                      <p class="text-text-500 mb-2">{{ tukang.primarySkill }}</p>
                      
                      <!-- Rating & Experience -->
                      <div class="flex items-center space-x-4 text-sm">
                        <div class="flex items-center space-x-1">
                          <StarIcon size="16" class="text-warning fill-current" />
                          <span class="font-medium text-text-900">{{ tukang.rating }}</span>
                          <span class="text-text-500">({{ tukang.reviewCount }} ulasan)</span>
                        </div>
                        <span class="text-text-500">{{ tukang.experience }} tahun pengalaman</span>
                        <div class="flex items-center text-text-500">
                          <MapPinIcon size="14" class="mr-1" />
                          <span>{{ tukang.location }} ({{ tukang.distance }} km)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                      <div class="text-right">
                        <p class="font-semibold text-text-900 text-lg">{{ formatCurrency(tukang.hourlyRate) }}/jam</p>
                        <p class="text-sm text-text-500">{{ formatCurrency(tukang.dailyRate) }}/hari</p>
                      </div>
                      <button
                        @click.stop="toggleFavorite(tukang.id)"
                        class="p-2 text-text-400 hover:text-danger transition-colors"
                      >
                        <HeartIcon 
                          size="24" 
                          :class="{ 'fill-current text-danger': tukang.isFavorite }"
                        />
                      </button>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-text-600 mb-3 line-clamp-2">{{ tukang.description }}</p>

                  <!-- Skills -->
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="skill in tukang.skills"
                      :key="skill"
                      class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {{ skill }}
                    </span>
                  </div>

                  <!-- Badges & Actions -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <span
                        v-if="tukang.isVerified"
                        class="inline-flex items-center px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                      >
                        <CheckIcon size="14" class="mr-2" />
                        Terverifikasi
                      </span>
                      <span
                        v-if="tukang.isCertified"
                        class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        <AwardIcon size="14" class="mr-2" />
                        Bersertifikat
                      </span>
                      <span
                        v-if="tukang.isOnline"
                        class="inline-flex items-center px-3 py-1 bg-success/10 text-success text-sm rounded-full"
                      >
                        <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                        Online
                      </span>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                      <button
                        @click.stop="contactTukang(tukang.id)"
                        class="btn-ghost"
                      >
                        <MessageCircleIcon size="16" class="mr-2" />
                        Chat
                      </button>
                      <button
                        @click.stop="hireTukang(tukang.id)"
                        class="btn-primary"
                      >
                        Hire Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredTukang.length === 0" class="text-center py-12">
            <UsersIcon size="64" class="mx-auto text-text-300 mb-4" />
            <h3 class="text-lg font-medium text-text-900 mb-2">
              Tidak ada tukang ditemukan
            </h3>
            <p class="text-text-500 mb-6">
              Coba ubah filter pencarian atau perluas area pencarian
            </p>
            <button @click="clearFilters" class="btn-primary">
              Reset Filter
            </button>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-center space-x-1 lg:space-x-2 mt-6 lg:mt-8">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="p-2 text-text-500 hover:text-text-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-bg-hover"
            >
              <ChevronLeftIcon size="20" />
            </button>
            
            <div class="flex items-center space-x-1">
              <!-- Desktop pagination -->
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                class="hidden lg:flex px-3 py-2 text-sm rounded-lg transition-colors"
                :class="page === currentPage ? 'bg-primary text-white' : 'text-text-600 hover:bg-bg-hover'"
              >
                {{ page }}
              </button>
              
              <!-- Mobile pagination - show current page and total -->
              <span class="lg:hidden px-3 py-2 text-sm text-text-600">
                {{ currentPage }} / {{ totalPages }}
              </span>
            </div>
            
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="p-2 text-text-500 hover:text-text-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-bg-hover"
            >
              <ChevronRightIcon size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Filters Modal -->
    <div
      v-if="showMobileFilters"
      class="fixed inset-0 z-50 lg:hidden"
    >
      <div class="absolute inset-0 bg-black/50" @click="showMobileFilters = false"></div>
      <div class="absolute inset-y-0 right-0 w-full max-w-sm bg-bg-surface shadow-xl">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-border bg-white">
            <h2 class="text-lg font-heading font-semibold text-text-900">
              Filter Pencarian
            </h2>
            <button
              @click="showMobileFilters = false"
              class="p-2 text-text-500 hover:text-text-900 rounded-lg hover:bg-bg-hover"
            >
              <XIcon size="20" />
            </button>
          </div>
          
          <!-- Filter Content -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-6">
              <!-- Location -->
              <div>
                <label for="mobile-location" class="block text-sm font-medium text-text-900 mb-2">
                  Lokasi
                </label>
                <select id="mobile-location" v-model="filters.location" class="form-input">
                  <option value="">Semua Lokasi</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                  <option value="medan">Medan</option>
                  <option value="yogyakarta">Yogyakarta</option>
                  <option value="semarang">Semarang</option>
                </select>
              </div>

              <!-- Skills -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Keahlian
                </div>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <label
                    v-for="skill in skillOptions"
                    :key="skill.value"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.skills"
                      :value="skill.value"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">{{ skill.label }}</span>
                    <span class="ml-auto text-xs text-text-500">({{ skill.count }})</span>
                  </label>
                </div>
              </div>

              <!-- Price Range -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Tarif per Jam (Rp)
                </div>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 gap-3">
                    <input
                      v-model="filters.priceMin"
                      type="number"
                      min="0"
                      step="5000"
                      class="form-input"
                      placeholder="Minimum"
                    />
                    <input
                      v-model="filters.priceMax"
                      type="number"
                      min="0"
                      step="5000"
                      class="form-input"
                      placeholder="Maksimum"
                    />
                  </div>
                  <div class="flex items-center justify-between text-xs text-text-500">
                    <span>Rp 30.000</span>
                    <span>Rp 150.000</span>
                  </div>
                </div>
              </div>

              <!-- Rating -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Rating Minimum
                </div>
                <div class="space-y-2">
                  <label
                    v-for="rating in [5, 4, 3, 2, 1]"
                    :key="rating"
                    class="flex items-center"
                  >
                    <input
                      v-model="filters.minRating"
                      :value="rating"
                      type="radio"
                      name="mobileMinRating"
                      class="h-4 w-4 text-primary border-border focus:ring-primary"
                    />
                    <div class="ml-2 flex items-center">
                      <div class="flex items-center">
                        <StarIcon
                          v-for="i in 5"
                          :key="i"
                          size="14"
                          :class="i <= rating ? 'text-warning fill-current' : 'text-gray-300'"
                        />
                      </div>
                      <span class="ml-2 text-sm text-text-900">{{ rating }}.0+</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Availability -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Ketersediaan
                </div>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="filters.availability"
                      value="immediate"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">Tersedia Segera</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="filters.availability"
                      value="thisweek"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">Minggu Ini</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="filters.availability"
                      value="thismonth"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">Bulan Ini</span>
                  </label>
                </div>
              </div>

              <!-- Certificates -->
              <div>
                <div class="block text-sm font-medium text-text-900 mb-3">
                  Sertifikasi
                </div>
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="filters.certified"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">Bersertifikat</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="filters.verified"
                      type="checkbox"
                      class="h-4 w-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span class="ml-2 text-sm text-text-900">Terverifikasi</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer Actions -->
          <div class="p-4 border-t border-border bg-white">
            <div class="flex items-center space-x-3">
              <button
                @click="clearFilters"
                class="flex-1 btn-ghost"
              >
                Reset Filter
              </button>
              <button
                @click="showMobileFilters = false"
                class="flex-1 btn-primary"
              >
                Terapkan Filter
                <span v-if="activeFiltersCount > 0" class="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {{ activeFiltersCount }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare function navigateTo(url: string): any

// Component state
const viewMode = ref<'grid' | 'list'>('grid')
const sortBy = ref('rating')
const showMobileFilters = ref(false)
const showMobileSort = ref(false)
const currentPage = ref(1)
const itemsPerPage = 12

// Filters
const filters = reactive({
  search: '',
  location: '',
  skills: [] as string[],
  priceMin: null as number | null,
  priceMax: null as number | null,
  minRating: null as number | null,
  availability: [] as string[],
  certified: false,
  verified: false
})

// Sort options
const sortOptions = [
  { value: 'rating', label: 'Rating Tertinggi' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'experience', label: 'Pengalaman Terbanyak' },
  { value: 'distance', label: 'Jarak Terdekat' }
]

// Skills options
const skillOptions = [
  { value: 'bangunan', label: 'Tukang Bangunan', count: 45 },
  { value: 'listrik', label: 'Tukang Listrik', count: 32 },
  { value: 'plumbing', label: 'Tukang Plumbing', count: 28 },
  { value: 'cat', label: 'Tukang Cat', count: 38 },
  { value: 'kayu', label: 'Tukang Kayu', count: 22 },
  { value: 'besi', label: 'Tukang Las/Besi', count: 18 },
  { value: 'keramik', label: 'Tukang Keramik', count: 25 },
  { value: 'atap', label: 'Tukang Atap', count: 15 }
]

// Mock data - in real app this would come from API
const allTukang = [
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Bangunan',
    skills: ['Bangunan', 'Listrik', 'Plumbing'],
    rating: 4.8,
    reviewCount: 24,
    experience: 8,
    location: 'Jakarta Selatan',
    distance: 3.2,
    hourlyRate: 65000,
    dailyRate: 500000,
    description: 'Tukang bangunan berpengalaman dengan keahlian listrik dan plumbing. Sudah menangani berbagai proyek renovasi rumah.',
    isOnline: true,
    isVerified: true,
    isCertified: true,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Ahmad Wijaya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Listrik',
    skills: ['Listrik', 'Elektronik'],
    rating: 4.9,
    reviewCount: 31,
    experience: 12,
    location: 'Jakarta Timur',
    distance: 5.8,
    hourlyRate: 75000,
    dailyRate: 600000,
    description: 'Spesialis instalasi listrik rumah dan kantor. Berpengalaman menangani proyek besar dan kecil.',
    isOnline: false,
    isVerified: true,
    isCertified: true,
    isFavorite: true
  },
  {
    id: 3,
    name: 'Slamet Raharjo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    primarySkill: 'Tukang Plumbing',
    skills: ['Plumbing', 'Sanitasi'],
    rating: 4.7,
    reviewCount: 18,
    experience: 6,
    location: 'Jakarta Barat',
    distance: 8.1,
    hourlyRate: 55000,
    dailyRate: 450000,
    description: 'Ahli perbaikan dan instalasi sistem plumbing. Cepat dan bersih dalam bekerja.',
    isOnline: true,
    isVerified: false,
    isCertified: true,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Junaedi Kosasih',
    avatar: 'https://picsum.photos/seed/rina-puspita-4/150/150',
    primarySkill: 'Tukang Cat',
    skills: ['Pengecatan', 'Finishing', 'Dekoratif'],
    rating: 4.6,
    reviewCount: 12,
    experience: 5,
    location: 'Depok',
    distance: 12.3,
    hourlyRate: 50000,
    dailyRate: 400000,
    description: 'Spesialis pengecatan interior dan eksterior dengan perhatian tinggi pada detail finishing dan warna.',
    isOnline: false,
    isVerified: true,
    isCertified: false,
    isFavorite: false
  },
  {
    id: 5,
    name: 'Hendra Prakoso',
    avatar: 'https://picsum.photos/seed/hendra-prakoso-5/150/150',
    primarySkill: 'Tukang Kayu',
    skills: ['Carpentry', 'Furniture', 'Joinery'],
    rating: 4.9,
    reviewCount: 45,
    experience: 15,
    location: 'Bekasi',
    distance: 20.1,
    hourlyRate: 90000,
    dailyRate: 700000,
    description: 'Pengrajin kayu berpengalaman, membuat furniture custom dan struktur kayu untuk bangunan.',
    isOnline: true,
    isVerified: true,
    isCertified: true,
    isFavorite: true
  },
  {
    id: 6,
    name: 'Erwin Sutrisna',
    avatar: 'https://picsum.photos/seed/mawar-sari-6/150/150',
    primarySkill: 'Tukang Finishing',
    skills: ['Wall Preparation', 'Plastering', 'Tiling'],
    rating: 4.5,
    reviewCount: 9,
    experience: 4,
    location: 'Tangerang',
    distance: 18.4,
    hourlyRate: 48000,
    dailyRate: 380000,
    description: 'Cepat dan rapi dalam pekerjaan finishing, ahli memasang keramik dan plesteran halus.',
    isOnline: true,
    isVerified: false,
    isCertified: false,
    isFavorite: false
  },
  {
    id: 7,
    name: 'Dedi Kurniawan',
    avatar: 'https://picsum.photos/seed/dedi-kurniawan-7/150/150',
    primarySkill: 'Mandor',
    skills: ['Manajemen Proyek', 'Konstruksi', 'Quality Control'],
    rating: 4.8,
    reviewCount: 60,
    experience: 20,
    location: 'Bogor',
    distance: 35.0,
    hourlyRate: 120000,
    dailyRate: 900000,
    description: 'Mandor berpengalaman memimpin tim dan memastikan proyek selesai tepat waktu sesuai spesifikasi.',
    isOnline: false,
    isVerified: true,
    isCertified: true,
    isFavorite: false
  },
  {
    id: 8,
    name: 'Rian Budiman',
    avatar: 'https://picsum.photos/seed/siti-rahma-8/150/150',
    primarySkill: 'Tukang Plumbing',
    skills: ['Plumbing', 'Water Systems', 'Leak Repair'],
    rating: 4.7,
    reviewCount: 22,
    experience: 7,
    location: 'Jakarta Pusat',
    distance: 4.5,
    hourlyRate: 60000,
    dailyRate: 480000,
    description: 'Profesional plumbing yang handal untuk instalasi dan maintenance sistem air rumah dan gedung.',
    isOnline: true,
    isVerified: true,
    isCertified: false,
    isFavorite: true
  },
  {
    id: 9,
    name: 'Anton Wijaya',
    avatar: 'https://picsum.photos/seed/anton-wijaya-9/150/150',
    primarySkill: 'Tukang Listrik Senior',
    skills: ['Instalasi Listrik', 'Automasi', 'Panel & Solar'],
    rating: 4.9,
    reviewCount: 80,
    experience: 18,
    location: 'Jakarta Utara',
    distance: 7.3,
    hourlyRate: 110000,
    dailyRate: 800000,
    description: 'Tukang listrik senior dengan pengalaman proyek residensial dan komersial, termasuk instalasi panel dan sistem solar.',
    isOnline: false,
    isVerified: true,
    isCertified: true,
    isFavorite: false
  }
]

// Computed properties
const filteredTukang = computed(() => {
  let result = [...allTukang]
  
  // Apply filters
  if (filters.search) {
    const search = filters.search.toLowerCase()
    result = result.filter(t => 
      t.name.toLowerCase().includes(search) ||
      t.primarySkill.toLowerCase().includes(search) ||
      t.skills.some(s => s.toLowerCase().includes(search))
    )
  }
  
  if (filters.location) {
    result = result.filter(t => 
      t.location.toLowerCase().includes(filters.location.toLowerCase())
    )
  }
  
  if (filters.skills.length > 0) {
    result = result.filter(t =>
      filters.skills.some(skill => 
        t.skills.some(ts => ts.toLowerCase().includes(skill))
      )
    )
  }
  
  if (filters.priceMin) {
    result = result.filter(t => t.hourlyRate >= filters.priceMin!)
  }
  
  if (filters.priceMax) {
    result = result.filter(t => t.hourlyRate <= filters.priceMax!)
  }
  
  if (filters.minRating) {
    result = result.filter(t => t.rating >= filters.minRating!)
  }
  
  if (filters.certified) {
    result = result.filter(t => t.isCertified)
  }
  
  if (filters.verified) {
    result = result.filter(t => t.isVerified)
  }
  
  // Apply sorting
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'price-low':
      result.sort((a, b) => a.hourlyRate - b.hourlyRate)
      break
    case 'price-high':
      result.sort((a, b) => b.hourlyRate - a.hourlyRate)
      break
    case 'experience':
      result.sort((a, b) => b.experience - a.experience)
      break
    case 'distance':
      result.sort((a, b) => a.distance - b.distance)
      break
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredTukang.value.length / itemsPerPage))

const paginatedTukang = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredTukang.value.slice(start, end)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Active filters count for mobile badge
const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.location) count++
  if (filters.skills.length > 0) count++
  if (filters.priceMin || filters.priceMax) count++
  if (filters.minRating) count++
  if (filters.availability.length > 0) count++
  if (filters.certified) count++
  if (filters.verified) count++
  return count
})

// Methods
const clearFilters = () => {
  Object.assign(filters, {
    search: '',
    location: '',
    skills: [],
    priceMin: null,
    priceMax: null,
    minRating: null,
    availability: [],
    certified: false,
    verified: false
  })
  currentPage.value = 1
}

const toggleFavorite = (id: number) => {
  const tukang = allTukang.find(t => t.id === id)
  if (tukang) {
    tukang.isFavorite = !tukang.isFavorite
  }
}

const viewTukangProfile = (id: number) => {
  navigateTo(`/tukang/${id}`)
}

const contactTukang = (id: number) => {
  navigateTo(`/chat/${id}`)
}

const hireTukang = (id: number) => {
  navigateTo(`/client/projects/create`)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// SEO
useHead({
  title: 'Cari Tukang - TukangIn',
  meta: [
    {
      name: 'description',
      content: 'Temukan tukang terbaik untuk proyek Anda. Filter berdasarkan keahlian, lokasi, rating, dan harga.'
    }
  ]
})
</script>
