<template>
  <div>
    <!-- Search Header -->
    <div class="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <!-- Search Bar -->
        <div class="flex flex-col gap-4 mb-4 md:mb-6">
          <!-- Main Search Input -->
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <div class="relative">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari proyek, keahlian, atau lokasi..."
                  class="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text-900 placeholder-gray-500"
                  @keyup.enter="performSearch"
                />
                <button
                  @click="performSearch"
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                  Cari
                </button>
              </div>
            </div>
          </div>
          
          <!-- Controls Row -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-3">
              <button
                @click="showFilters = !showFilters"
                class="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"/>
                </svg>
                Filter
                <span v-if="activeFiltersCount > 0" class="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {{ activeFiltersCount }}
                </span>
              </button>
              
              <!-- Quick Filters (Desktop) -->
              <div class="hidden lg:flex items-center gap-2">
                <span class="text-sm text-gray-500">Filter cepat:</span>
                <button
                  @click="toggleQuickFilter('verified')"
                  :class="[
                    'px-3 py-1 text-sm rounded-full border transition-colors',
                    filters.verifiedOnly 
                      ? 'bg-primary text-white border-primary' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  ]"
                >
                  Klien Verified
                </button>
                <button
                  @click="toggleQuickFilter('urgent')"
                  :class="[
                    'px-3 py-1 text-sm rounded-full border transition-colors',
                    filters.urgency.includes('high') 
                      ? 'bg-red-100 text-red-700 border-red-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                  ]"
                >
                  Mendesak
                </button>
                <button
                  @click="toggleQuickFilter('images')"
                  :class="[
                    'px-3 py-1 text-sm rounded-full border transition-colors',
                    filters.withImages 
                      ? 'bg-green-100 text-green-700 border-green-300' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                  ]"
                >
                  Ada Foto
                </button>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <label for="sort-select" class="text-sm text-gray-600 whitespace-nowrap hidden sm:block">Urutkan:</label>
              <select 
                id="sort-select"
                v-model="sortBy" 
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm bg-white min-w-[160px]"
              >
                <option value="newest">Terbaru</option>
                <option value="budget_high">Budget Tertinggi</option>
                <option value="budget_low">Budget Terendah</option>
                <option value="deadline">Deadline Terdekat</option>
                <option value="location">Lokasi Terdekat</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="filter in activeFilters"
            :key="filter.key"
            class="flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
          >
            {{ filter.label }}
            <button
              @click="removeFilter(filter.key)"
              class="ml-2 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </span>
          <button
            @click="clearAllFilters"
            class="text-red-600 text-sm hover:text-red-700 font-medium"
          >
            Hapus Semua
          </button>
        </div>

        <!-- Results Summary -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
          <span>
            Menampilkan <span class="font-semibold text-gray-900">{{ filteredJobs.length }}</span> dari <span class="font-semibold text-gray-900">{{ totalJobs }}</span> proyek
            <span v-if="searchQuery" class="font-medium">untuk "<span class="text-primary">{{ searchQuery }}</span>"</span>
          </span>
          <span class="text-xs sm:text-sm">Diperbarui {{ lastUpdated }}</span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <!-- Filters Sidebar -->
        <div
          class="w-full lg:w-80 order-2 lg:order-1"
          :class="{ 'hidden lg:block': !showFilters }"
        >
          <!-- Mobile Filter Overlay -->
          <div
            v-if="showFilters"
            class="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            @click="showFilters = false"
          ></div>
          
          <!-- Filter Panel -->
          <div
            class="lg:sticky lg:top-24"
            :class="showFilters 
              ? 'fixed inset-x-0 bottom-0 top-20 z-50 lg:relative lg:inset-auto lg:z-auto' 
              : 'hidden lg:block'"
          >
            <div class="bg-white rounded-t-lg lg:rounded-lg border border-gray-200 h-full lg:h-auto overflow-y-auto">
              <div class="p-4 lg:p-6">
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-lg font-semibold text-gray-900">Filter Pencarian</h3>
                  <button
                    @click="showFilters = false"
                    class="lg:hidden text-gray-500 hover:text-gray-700 p-1"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div class="space-y-6">
                  <!-- Location Filter -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      Lokasi
                    </h4>
                    <div class="space-y-3 max-h-48 overflow-y-auto">
                      <label
                        v-for="city in cities"
                        :key="city.value"
                        class="flex items-center justify-between cursor-pointer group"
                      >
                        <div class="flex items-center">
                          <input
                            v-model="filters.location"
                            :value="city.value"
                            type="checkbox"
                            class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                          />
                          <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ city.label }}</span>
                        </div>
                        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ city.count }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Skills Filter -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                      Keahlian
                    </h4>
                    <div class="space-y-3 max-h-48 overflow-y-auto">
                      <label
                        v-for="skill in skills"
                        :key="skill.value"
                        class="flex items-center justify-between cursor-pointer group"
                      >
                        <div class="flex items-center">
                          <input
                            v-model="filters.skills"
                            :value="skill.value"
                            type="checkbox"
                            class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                          />
                          <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ skill.label }}</span>
                        </div>
                        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ skill.count }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Budget Range -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                      Budget
                    </h4>
                    <div class="space-y-4">
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label for="budgetMin" class="block text-xs text-gray-500 mb-1">Minimum</label>
                          <input
                            id="budgetMin"
                            v-model="filters.budgetMin"
                            type="number"
                            min="0"
                            step="100000"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label for="budgetMax" class="block text-xs text-gray-500 mb-1">Maksimum</label>
                          <input
                            id="budgetMax"
                            v-model="filters.budgetMax"
                            type="number"
                            min="0"
                            step="100000"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                            placeholder="∞"
                          />
                        </div>
                      </div>
                      
                      <div class="space-y-3">
                        <div class="text-xs text-gray-500 font-medium">Atau pilih range:</div>
                        <div class="space-y-2">
                          <label
                            v-for="range in budgetRanges"
                            :key="range.value"
                            class="flex items-center justify-between cursor-pointer group"
                          >
                            <div class="flex items-center">
                              <input
                                v-model="filters.budgetRange"
                                :value="range.value"
                                type="radio"
                                name="budgetRange"
                                class="h-4 w-4 text-primary border-gray-300 focus:ring-primary mr-3"
                              />
                              <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ range.label }}</span>
                            </div>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ range.count }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Project Type -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                      Jenis Proyek
                    </h4>
                    <div class="space-y-3">
                      <label
                        v-for="type in projectTypes"
                        :key="type.value"
                        class="flex items-center justify-between cursor-pointer group"
                      >
                        <div class="flex items-center">
                          <input
                            v-model="filters.projectType"
                            :value="type.value"
                            type="checkbox"
                            class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                          />
                          <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ type.label }}</span>
                        </div>
                        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ type.count }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Urgency -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Tingkat Urgensi
                    </h4>
                    <div class="space-y-3">
                      <label
                        v-for="urgency in urgencyLevels"
                        :key="urgency.value"
                        class="flex items-center justify-between cursor-pointer group"
                      >
                        <div class="flex items-center">
                          <input
                            v-model="filters.urgency"
                            :value="urgency.value"
                            type="checkbox"
                            class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                          />
                          <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ urgency.label }}</span>
                        </div>
                        <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{{ urgency.count }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Additional Filters -->
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3 flex items-center">
                      <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                      </svg>
                      Lainnya
                    </h4>
                    <div class="space-y-3">
                      <label class="flex items-center cursor-pointer group">
                        <input
                          v-model="filters.withImages"
                          type="checkbox"
                          class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                        />
                        <span class="text-sm text-gray-700 group-hover:text-gray-900">Ada Foto</span>
                      </label>
                      <label class="flex items-center cursor-pointer group">
                        <input
                          v-model="filters.verifiedOnly"
                          type="checkbox"
                          class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                        />
                        <span class="text-sm text-gray-700 group-hover:text-gray-900">Client Terverifikasi</span>
                      </label>
                      <label class="flex items-center cursor-pointer group">
                        <input
                          v-model="filters.openApplications"
                          type="checkbox"
                          class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-3"
                        />
                        <span class="text-sm text-gray-700 group-hover:text-gray-900">Masih Buka Lamaran</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Apply Filter Button -->
                <div class="pt-6 border-t border-gray-200 mt-6">
                  <button
                    @click="applyFilters"
                    class="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Terapkan Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Results List -->
        <div class="flex-1 order-1 lg:order-2">
          <!-- Loading State -->
          <div v-if="isLoading" class="space-y-6">
            <div
              v-for="i in 5"
              :key="i"
              class="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div class="flex flex-col md:flex-row md:space-x-6">
                <div class="w-full md:w-32 h-48 md:h-32 bg-gray-200 rounded-lg mb-4 md:mb-0 flex-shrink-0"></div>
                <div class="flex-1 space-y-3">
                  <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div class="flex space-x-2">
                    <div class="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div class="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div class="h-6 bg-gray-200 rounded-full w-14"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Results -->
          <div v-else-if="filteredJobs.length > 0" class="space-y-4 md:space-y-6">
            <div
              v-for="job in paginatedJobs"
              :key="job.id"
              class="bg-white rounded-lg border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              @click="navigateToJob(job.id)"
            >
              <div class="p-4 md:p-6">
                <div class="flex flex-col md:flex-row gap-4 md:gap-6">
                  <!-- Project Image -->
                  <div class="w-full md:w-32 md:h-32 h-48 flex-shrink-0 order-2 md:order-1">
                    <img
                      v-if="job.images && job.images.length > 0"
                      :src="job.images[0]"
                      :alt="job.title"
                      class="w-full h-full object-cover rounded-lg"
                    />
                    <div
                      v-else
                      class="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Project Info -->
                  <div class="flex-1 min-w-0 order-1 md:order-2">
                    <!-- Header -->
                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div class="flex-1 min-w-0">
                        <h3 class="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {{ job.title }}
                        </h3>
                        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {{ job.location }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {{ formatDate(job.startDate) }}
                          </div>
                          <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {{ job.timeAgo }}
                          </div>
                        </div>
                      </div>
                      
                      <!-- Urgency Badge -->
                      <span
                        class="px-3 py-1.5 text-xs font-medium rounded-full flex-shrink-0 w-fit"
                        :class="getUrgencyClass(job.urgency)"
                      >
                        {{ getUrgencyLabel(job.urgency) }}
                      </span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-700 mb-4 line-clamp-2 md:line-clamp-3">
                      {{ job.description }}
                    </p>

                    <!-- Skills Required -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span
                        v-for="skill in job.skills.slice(0, 4)"
                        :key="skill"
                        class="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {{ getSkillLabel(skill) }}
                      </span>
                      <span
                        v-if="job.skills.length > 4"
                        class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        +{{ job.skills.length - 4 }} lainnya
                      </span>
                    </div>

                    <!-- Bottom Info -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                        <!-- Budget -->
                        <div class="flex items-center">
                          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                          </svg>
                          <span class="text-lg font-bold text-gray-900">
                            {{ formatBudget(job) }}
                          </span>
                        </div>
                        
                        <!-- Applications Count -->
                        <div class="flex items-center text-sm text-gray-600">
                          <svg class="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                          </svg>
                          {{ job.applicationsCount }} lamaran
                        </div>
                      </div>

                      <!-- Client Info -->
                      <div class="flex items-center space-x-3">
                        <img
                          :src="job.client.avatar"
                          :alt="job.client.name"
                          class="w-10 h-10 rounded-full border-2 border-gray-200"
                        />
                        <div class="text-sm">
                          <div class="flex items-center">
                            <span class="font-medium text-gray-900">{{ job.client.name }}</span>
                            <svg
                              v-if="job.client.verified"
                              class="w-4 h-4 ml-1.5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                          <div class="flex items-center text-gray-600">
                            <svg class="w-3 h-3 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                            {{ job.client.rating }} ({{ job.client.reviewsCount }})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12 lg:py-16">
            <div class="max-w-md mx-auto">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">
                Tidak ada proyek ditemukan
              </h3>
              <p class="text-gray-600 mb-6">
                Coba ubah kata kunci pencarian atau filter yang dipilih untuk menemukan proyek yang sesuai.
              </p>
              <div class="space-y-3">
                <button
                  @click="clearAllFilters"
                  class="bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Hapus Semua Filter
                </button>
                <div class="text-sm text-gray-500">
                  atau <button @click="searchQuery = ''; performSearch()" class="text-primary hover:underline">coba pencarian baru</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8 lg:mt-12">
            <nav class="flex items-center space-x-1" aria-label="Pagination">
              <button
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
                class="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              
              <div class="hidden sm:flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  class="min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all"
                  :class="page === currentPage 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100'"
                  :aria-label="`Page ${page}`"
                  :aria-current="page === currentPage ? 'page' : undefined"
                >
                  {{ page }}
                </button>
              </div>

              <!-- Mobile pagination info -->
              <div class="sm:hidden flex items-center px-4 py-2 text-sm text-gray-600">
                {{ currentPage }} / {{ totalPages }}
              </div>
              
              <button
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
                class="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// Types
interface Job {
  id: string
  title: string
  description: string
  location: string
  city: string
  startDate: string
  urgency: 'low' | 'medium' | 'high'
  budget?: number
  budgetMin?: number
  budgetMax?: number
  budgetType: 'fixed' | 'range'
  skills: string[]
  images?: string[]
  applicationsCount: number
  timeAgo: string
  client: {
    id: string
    name: string
    avatar: string
    verified: boolean
    rating: number
    reviewsCount: number
  }
}

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare const useRouter: any
declare function navigateTo(url: string): any

const route = useRoute()
const router = useRouter()

// Component state
const searchQuery = ref(route.query.q || '')
const showFilters = ref(false)
const isLoading = ref(false)
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 10

// Filters
const filters = reactive({
  location: [] as string[],
  skills: [] as string[],
  budgetMin: null as number | null,
  budgetMax: null as number | null,
  budgetRange: '',
  projectType: [] as string[],
  urgency: [] as string[],
  withImages: false,
  verifiedOnly: false,
  openApplications: false
})

// Filter options
const cities = [
  { value: 'jakarta', label: 'Jakarta', count: 125 },
  { value: 'bandung', label: 'Bandung', count: 89 },
  { value: 'surabaya', label: 'Surabaya', count: 76 },
  { value: 'medan', label: 'Medan', count: 45 },
  { value: 'yogyakarta', label: 'Yogyakarta', count: 34 },
  { value: 'semarang', label: 'Semarang', count: 28 }
]

const skills = [
  { value: 'bangunan', label: 'Tukang Bangunan', count: 89 },
  { value: 'listrik', label: 'Tukang Listrik', count: 67 },
  { value: 'plumbing', label: 'Tukang Plumbing', count: 54 },
  { value: 'cat', label: 'Tukang Cat', count: 78 },
  { value: 'kayu', label: 'Tukang Kayu', count: 45 },
  { value: 'keramik', label: 'Tukang Keramik', count: 38 }
]

const budgetRanges = [
  { value: '0-5000000', label: 'Di bawah 5 Juta', count: 45 },
  { value: '5000000-15000000', label: '5 - 15 Juta', count: 89 },
  { value: '15000000-50000000', label: '15 - 50 Juta', count: 67 },
  { value: '50000000+', label: 'Di atas 50 Juta', count: 23 }
]

const projectTypes = [
  { value: 'renovasi', label: 'Renovasi', count: 112 },
  { value: 'pembangunan', label: 'Pembangunan Baru', count: 78 },
  { value: 'perbaikan', label: 'Perbaikan', count: 89 },
  { value: 'instalasi', label: 'Instalasi', count: 45 }
]

const urgencyLevels = [
  { value: 'low', label: 'Normal', count: 145 },
  { value: 'medium', label: 'Mendesak', count: 78 },
  { value: 'high', label: 'Sangat Mendesak', count: 23 }
]

const allJobs = ref<Job[]>([
  {
    id: '1',
    title: 'Renovasi Kamar Mandi Utama',
    description: 'Renovasi total kamar mandi utama termasuk pergantian keramik, fixtures, dan sistem plumbing. Ukuran 3x4 meter dengan desain modern minimalis.',
    location: 'Kebayoran Baru, Jakarta Selatan',
    city: 'jakarta',
    startDate: '2024-02-15',
    urgency: 'medium',
    budgetType: 'range',
    budgetMin: 15000000,
    budgetMax: 25000000,
    skills: ['plumbing', 'keramik', 'listrik'],
    images: ['https://picsum.photos/seed/renovasi-kamar-mandi-1/1200/800'],
    applicationsCount: 12,
    timeAgo: '2 jam lalu',
    client: {
      id: 'c1',
      name: 'Budi Santoso',
      avatar: 'https://picsum.photos/seed/budi-santoso-avatar/400/400',
      verified: true,
      rating: 4.8,
      reviewsCount: 23
    }
  },
  {
    id: '2',
    title: 'Pembangunan Rumah 2 Lantai',
    description: 'Pembangunan rumah baru 2 lantai dengan luas bangunan 120m2. Sudah ada izin IMB dan desain arsitek. Lokasi strategis di perumahan.',
    location: 'Cimahi, Bandung',
    city: 'bandung',
    startDate: '2024-03-01',
    urgency: 'low',
    budgetType: 'fixed',
    budget: 450000000,
    skills: ['bangunan', 'listrik', 'plumbing'],
    images: [
      'https://picsum.photos/seed/pembangunan-rumah-2-1/1200/800',
      'https://picsum.photos/seed/pembangunan-rumah-2-2/1200/800'
    ],
    applicationsCount: 28,
    timeAgo: '5 jam lalu',
    client: {
      id: 'c2',
      name: 'PT. Karya Mandiri',
      avatar: 'https://picsum.photos/seed/pt-karya-mandiri-avatar/400/400',
      verified: true,
      rating: 4.9,
      reviewsCount: 156
    }
  },
  {
    id: '3',
    title: 'Perbaikan Atap Bocor',
    description: 'Perbaikan atap genteng yang bocor di beberapa titik. Perlu penggantian genteng dan perbaikan rangka kayu yang lapuk.',
    location: 'Sukolilo, Surabaya',
    city: 'surabaya',
    startDate: '2024-01-25',
    urgency: 'high',
    budgetType: 'range',
    budgetMin: 3000000,
    budgetMax: 8000000,
    skills: ['atap', 'kayu'],
    images: ['https://picsum.photos/seed/perbaikan-atap-3/1200/800'],
    applicationsCount: 8,
    timeAgo: '1 hari lalu',
    client: {
      id: 'c3',
      name: 'Siti Aminah',
      avatar: 'https://picsum.photos/seed/siti-aminah-avatar/400/400',
      verified: false,
      rating: 4.5,
      reviewsCount: 7
    }
  }
])

const totalJobs = computed(() => allJobs.value.length)
const lastUpdated = ref('5 menit lalu')

// Computed properties
const filteredJobs = computed(() => {
  let jobs = [...allJobs.value]

  // Search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.skills.some(skill => getSkillLabel(skill).toLowerCase().includes(query))
    )
  }

  // Location filter
  if (filters.location.length > 0) {
    jobs = jobs.filter(job => filters.location.includes(job.city))
  }

  // Skills filter
  if (filters.skills.length > 0) {
    jobs = jobs.filter(job =>
      job.skills.some(skill => filters.skills.includes(skill))
    )
  }

  // Budget filter
  if (filters.budgetMin || filters.budgetMax) {
    jobs = jobs.filter(job => {
      const jobMin = job.budgetType === 'fixed' ? job.budget! : job.budgetMin!
      const jobMax = job.budgetType === 'fixed' ? job.budget! : job.budgetMax!
      
      if (filters.budgetMin && jobMax < filters.budgetMin) return false
      if (filters.budgetMax && jobMin > filters.budgetMax) return false
      
      return true
    })
  }

  // Urgency filter
  if (filters.urgency.length > 0) {
    jobs = jobs.filter(job => filters.urgency.includes(job.urgency))
  }

  // Additional filters
  if (filters.withImages) {
    jobs = jobs.filter(job => job.images && job.images.length > 0)
  }

  if (filters.verifiedOnly) {
    jobs = jobs.filter(job => job.client.verified)
  }

  // Sort
  switch (sortBy.value) {
    case 'budget_high':
      jobs.sort((a, b) => {
        const budgetA = a.budgetType === 'fixed' ? a.budget! : a.budgetMax!
        const budgetB = b.budgetType === 'fixed' ? b.budget! : b.budgetMax!
        return budgetB - budgetA
      })
      break
    case 'budget_low':
      jobs.sort((a, b) => {
        const budgetA = a.budgetType === 'fixed' ? a.budget! : a.budgetMin!
        const budgetB = b.budgetType === 'fixed' ? b.budget! : b.budgetMin!
        return budgetA - budgetB
      })
      break
    case 'deadline':
      jobs.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      break
    default:
      // newest - already in correct order
      break
  }

  return jobs
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / itemsPerPage))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredJobs.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  // Show max 5 pages
  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  
  if (end - start < 4) {
    start = Math.max(1, end - 4)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const activeFilters = computed(() => {
  const active = []
  
  if (filters.location.length > 0) {
    filters.location.forEach(loc => {
      const city = cities.find(c => c.value === loc)
      if (city) active.push({ key: `location-${loc}`, label: city.label })
    })
  }
  
  if (filters.skills.length > 0) {
    filters.skills.forEach(skill => {
      const skillData = skills.find(s => s.value === skill)
      if (skillData) active.push({ key: `skill-${skill}`, label: skillData.label })
    })
  }
  
  if (filters.budgetMin || filters.budgetMax) {
    const min = filters.budgetMin ? formatCurrency(filters.budgetMin) : '0'
    const max = filters.budgetMax ? formatCurrency(filters.budgetMax) : '∞'
    active.push({ key: 'budget', label: `Budget: ${min} - ${max}` })
  }
  
  if (filters.urgency.length > 0) {
    filters.urgency.forEach(urgency => {
      const urgencyData = urgencyLevels.find(u => u.value === urgency)
      if (urgencyData) active.push({ key: `urgency-${urgency}`, label: urgencyData.label })
    })
  }
  
  return active
})

const activeFiltersCount = computed(() => activeFilters.value.length)

// Methods
const performSearch = () => {
  currentPage.value = 1
  // Update URL
  router.push({
    query: { ...route.query, q: searchQuery.value || undefined }
  })
}

const applyFilters = () => {
  currentPage.value = 1
  showFilters.value = false
}

const removeFilter = (key: string) => {
  if (key.startsWith('location-')) {
    const loc = key.replace('location-', '')
    filters.location = filters.location.filter(l => l !== loc)
  } else if (key.startsWith('skill-')) {
    const skill = key.replace('skill-', '')
    filters.skills = filters.skills.filter(s => s !== skill)
  } else if (key === 'budget') {
    filters.budgetMin = null
    filters.budgetMax = null
    filters.budgetRange = ''
  } else if (key.startsWith('urgency-')) {
    const urgency = key.replace('urgency-', '')
    filters.urgency = filters.urgency.filter(u => u !== urgency)
  }
}

const clearAllFilters = () => {
  Object.assign(filters, {
    location: [],
    skills: [],
    budgetMin: null,
    budgetMax: null,
    budgetRange: '',
    projectType: [],
    urgency: [],
    withImages: false,
    verifiedOnly: false,
    openApplications: false
  })
  searchQuery.value = ''
  currentPage.value = 1
}

const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToJob = (jobId: string) => {
  navigateTo(`/jobs/${jobId}`)
}

const toggleQuickFilter = (type: string) => {
  switch (type) {
    case 'verified':
      filters.verifiedOnly = !filters.verifiedOnly
      break
    case 'urgent':
      if (filters.urgency.includes('high')) {
        filters.urgency = filters.urgency.filter(u => u !== 'high')
      } else {
        filters.urgency.push('high')
      }
      break
    case 'images':
      filters.withImages = !filters.withImages
      break
  }
  applyFilters()
}

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatBudget = (job: Job) => {
  if (job.budgetType === 'fixed') {
    return formatCurrency(job.budget!)
  } else {
    return `${formatCurrency(job.budgetMin!)} - ${formatCurrency(job.budgetMax!)}`
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getSkillLabel = (skillValue: string) => {
  const skill = skills.find(s => s.value === skillValue)
  return skill ? skill.label : skillValue
}

const getUrgencyLabel = (urgency: string) => {
  const level = urgencyLevels.find(u => u.value === urgency)
  return level ? level.label : urgency
}

const getUrgencyClass = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'bg-red-100 text-red-700 border border-red-200'
    case 'medium':
      return 'bg-orange-100 text-orange-700 border border-orange-200'
    default:
      return 'bg-green-100 text-green-700 border border-green-200'
  }
}

// Load data
onMounted(() => {
  // In real app, load from API based on route params
  if (route.query.location) {
    filters.location = Array.isArray(route.query.location) 
      ? route.query.location 
      : [route.query.location]
  }
  
  if (route.query.skills) {
    filters.skills = Array.isArray(route.query.skills) 
      ? route.query.skills 
      : [route.query.skills]
  }
})

// SEO
useHead({
  title: computed(() => {
    let title = 'Cari Proyek'
    if (searchQuery.value) title += ` "${searchQuery.value}"`
    return `${title} - TukangIn`
  }),
  meta: [
    {
      name: 'description',
      content: 'Temukan proyek konstruksi dan renovasi terbaru di TukangIn. Cari berdasarkan lokasi, keahlian, dan budget.'
    }
  ]
})
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

/* Smooth transitions for interactive elements */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for filter sections */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Mobile filter overlay animation */
@media (max-width: 1023px) {
  .fixed.inset-x-0.bottom-0.top-20 {
    animation: slideUp 0.3s ease-out;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
