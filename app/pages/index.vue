<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary to-primary-600 text-white">
      <div class="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <!-- Hero Content -->
            <div class="text-center lg:text-left order-2 lg:order-1">
              <!-- Logo/Brand -->
              <div class="mb-6 md:mb-8">
                <h1 class="text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-3 md:mb-4">
                  TukangIn
                </h1>
                <p class="text-lg md:text-xl lg:text-2xl opacity-90">
                  Transformasi Karir Tukang Indonesia
                </p>
              </div>

              <!-- Value Proposition -->
              <div class="mb-6 md:mb-8">
                <h2 class="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                  Dari Tukang Biasa Menjadi Profesional Bersertifikat
                </h2>
                <p class="text-base md:text-lg lg:text-xl mb-4 md:mb-6 opacity-90 leading-relaxed">
                  Tingkatkan keahlian dengan pelatihan berkualitas, dapatkan sertifikat resmi, dan raih penghasilan hingga <span class="font-bold text-accent">3x lipat</span> lebih tinggi
                </p>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start mb-6 md:mb-8">
                <NuxtLink to="/courses" class="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                  <BookOpenIcon size="20" class="mr-2" />
                  Mulai Belajar
                </NuxtLink>
                <NuxtLink to="/auth/register" class="flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-3 md:py-2 w-full sm:w-auto border border-white hover:bg-white hover:text-black rounded-lg transition-all duration-300 text-center">
                  <UserIcon size="20" class="mr-2" />
                  Daftar Sekarang
                </NuxtLink>
              </div>

              <!-- Trust Indicators -->
              <div class="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-sm opacity-80">
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 flex-shrink-0" />
                  <span>Sertifikat Resmi</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 flex-shrink-0" />
                  <span>Belajar Fleksibel</span>
                </div>
              </div>
            </div>

            <!-- Hero Visual -->
            <div class="relative order-1 lg:order-2">
              <!-- Main Hero Image -->
              <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
                <div class="text-center mb-4 md:mb-6">
                  <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                    <TrendingUpIcon size="32" class="md:hidden text-primary" />
                    <TrendingUpIcon size="40" class="hidden md:block lg:hidden text-primary" />
                    <TrendingUpIcon size="48" class="hidden lg:block text-primary" />
                  </div>
                  <h3 class="text-lg md:text-xl font-bold mb-2">Tingkatkan Penghasilan</h3>
                  <p class="text-sm opacity-80">Rata-rata kenaikan gaji setelah sertifikasi</p>
                </div>
                
                <div class="grid grid-cols-2 gap-3 md:gap-4 text-center">
                  <div class="bg-white/10 rounded-lg p-3 md:p-4">
                    <div class="text-lg md:text-xl lg:text-2xl font-bold text-accent">Rp 3.500K</div>
                    <div class="text-xs opacity-80">Sebelum</div>
                  </div>
                  <div class="bg-accent/20 rounded-lg p-3 md:p-4">
                    <div class="text-lg md:text-xl lg:text-2xl font-bold text-accent">Rp 7.500K</div>
                    <div class="text-xs opacity-80">Sesudah</div>
                  </div>
                </div>
              </div>

              <!-- Floating Elements -->
              <div class="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-success text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                +114% Peningkatan
              </div>
              <div class="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-accent text-primary px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                1,200+ Tersertifikasi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Path Section -->
    <section class="py-12 md:py-16 bg-bg-surface">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text-900 mb-3 md:mb-4">
            Jalur Pembelajaran yang Terbukti
          </h2>
          <p class="text-text-500 max-w-2xl mx-auto text-sm md:text-base">
            Mulai dari dasar hingga menjadi ahli dengan kurikulum yang dirancang khusus untuk tukang Indonesia
          </p>
        </div>

        <!-- Learning Steps -->
        <div class="max-w-4xl mx-auto mb-8 md:mb-12">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <!-- Step 1 -->
            <div class="text-center relative">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                1
              </div>
              <h3 class="font-semibold text-sm md:text-lg mb-1 md:mb-2">Daftar Gratis</h3>
              <p class="text-text-500 text-xs md:text-sm">Buat akun dan asesmen keahlian awal</p>
              <!-- Connector -->
              <div class="hidden md:block absolute top-6 md:top-8 left-full w-6/12 h-0.5 bg-primary/30 -translate-x-8"></div>
            </div>

            <!-- Step 2 -->
            <div class="text-center relative">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                2
              </div>
              <h3 class="font-semibold text-sm md:text-lg mb-1 md:mb-2">Pilih Jalur</h3>
              <p class="text-text-500 text-xs md:text-sm">Tentukan spesialisasi sesuai minat dan bakat</p>
              <!-- Connector -->
              <div class="hidden md:block absolute top-6 md:top-8 left-full w-6/12 h-0.5 bg-primary/30 -translate-x-8"></div>
            </div>

            <!-- Step 3 -->
            <div class="text-center relative">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                3
              </div>
              <h3 class="font-semibold text-sm md:text-lg mb-1 md:mb-2">Belajar & Praktik</h3>
              <p class="text-text-500 text-xs md:text-sm">Video, modul, dan praktik langsung</p>
              <!-- Connector -->
              <div class="hidden md:block absolute top-6 md:top-8 left-full w-6/12 h-0.5 bg-primary/30 -translate-x-8"></div>
            </div>

            <!-- Step 4 -->
            <div class="text-center">
              <div class="w-12 h-12 md:w-16 md:h-16 bg-success text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold mx-auto mb-3 md:mb-4">
                ✓
              </div>
              <h3 class="font-semibold text-sm md:text-lg mb-1 md:mb-2">Tersertifikasi</h3>
              <p class="text-text-500 text-xs md:text-sm">Ujian dan sertifikat resmi</p>
            </div>
          </div>
        </div>

        <!-- Featured Courses -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="course in featuredCourses"
            :key="course.id"
            class="card p-4 md:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="relative mb-4">
              <img
                :src="course.thumbnail"
                :alt="course.title"
                class="w-full h-40 md:h-48 object-cover rounded-lg"
              />
              <div class="absolute top-2 md:top-3 left-2 md:left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                {{ course.level }}
              </div>
              <div class="absolute top-2 md:top-3 right-2 md:right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {{ course.duration }}
              </div>
            </div>

            <div class="mb-4">
              <h3 class="font-heading font-semibold text-base md:text-lg text-text-900 mb-2 line-clamp-2">
                {{ course.title }}
              </h3>
              <p class="text-text-500 text-sm mb-3 line-clamp-2">{{ course.description }}</p>
              
              <!-- Course Stats -->
              <div class="flex items-center justify-between text-xs md:text-sm text-text-500 mb-3">
                <div class="flex items-center">
                  <UsersIcon size="14" class="mr-1 flex-shrink-0" />
                  <span class="truncate">{{ course.enrolledCount }} peserta</span>
                </div>
                <div class="flex items-center">
                  <StarIcon size="14" class="mr-1 flex-shrink-0" />
                  <span>{{ course.rating }} ({{ course.reviewCount }})</span>
                </div>
              </div>

              <!-- Skills Gained -->
              <div class="flex flex-wrap gap-1 mb-6">
                <span
                  v-for="skill in course.skills.slice(0, 3)"
                  :key="skill"
                  class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Pricing & CTA -->
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-text-500">Sertifikat berbayar</div>
              </div>
              <NuxtLink :to="`/courses/${course.id}`" class="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3">
                Mulai Belajar
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- View All Courses -->
        <div class="text-center mt-6 md:mt-8">
          <NuxtLink to="/courses" class="btn-ghost inline-flex items-center text-sm md:text-base">
            Lihat Semua Kursus
            <ChevronRightIcon size="20" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Success Stories Section -->
    <!-- Success Stories Section -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text-900 mb-3 md:mb-4">
            Kisah Sukses Alumni
          </h2>
          <p class="text-text-500 max-w-2xl mx-auto text-sm md:text-base">
            Ribuan tukang telah mengubah hidup mereka melalui TukangIn. Bergabunglah dengan mereka!
          </p>
        </div>

        <!-- Success Stories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div
            v-for="story in successStories"
            :key="story.id"
            class="card p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <!-- Before/After Images -->
            <div class="flex justify-center gap-2 md:gap-4 mb-4">
              <div class="text-center">
                <img
                  :src="story.avatar"
                  :alt="`${story.name}`"
                  class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <p class="text-xs md:text-sm text-text-500 mt-1">Sebelum</p>
              </div>
            </div>

            <!-- Story Content -->
            <h3 class="font-semibold text-base md:text-lg text-text-900 mb-2">{{ story.name }}</h3>
            <p class="text-sm md:text-base text-text-600 mb-3 md:mb-4 italic">{{ story.achievement }}</p>
            
            <!-- Income Comparison -->
            <div class="bg-bg-surface rounded-lg p-3 md:p-4 mb-3 md:mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs md:text-sm text-text-500">Pendapatan Sebelum:</span>
                <span class="text-sm md:text-base font-semibold text-text-700">{{ story.before.income }}</span>
              </div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs md:text-sm text-text-500">Pendapatan Sesudah:</span>
                <span class="text-sm md:text-base font-bold text-success">{{ story.after.income }}</span>
              </div>
            </div>

            <!-- Quote -->
            <blockquote class="text-sm md:text-base text-text-600 italic line-clamp-3">
              "{{ story.testimonial }}"
            </blockquote>
          </div>
        </div>

        <!-- Stats Summary -->
        <div class="bg-primary text-white rounded-xl p-6 md:p-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div class="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">15,000+</div>
              <div class="text-primary-50 text-sm md:text-base">Alumni Sukses</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">150%</div>
              <div class="text-primary-50 text-sm md:text-base">Rata-rata Kenaikan Gaji</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">3 Bulan</div>
              <div class="text-primary-50 text-sm md:text-base">Rata-rata Dapat Kerja</div>
            </div>
            <div>
              <div class="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">98%</div>
              <div class="text-primary-50 text-sm md:text-base">Tingkat Kepuasan</div>
            </div>
          </div>
        </div>

        <!-- CTA to See More Stories -->
        <div class="text-center mt-6 md:mt-8">
          <NuxtLink to="#" class="btn-ghost inline-flex items-center text-sm md:text-base">
            Baca Lebih Banyak Kisah Sukses
            <ChevronRightIcon size="20" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>    <!-- Income Calculator Section -->
    <section class="py-12 md:py-16 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-6 md:mb-8">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-text-900 mb-3 md:mb-4">
              Hitung Potensi Penghasilan Anda
            </h2>
            <p class="text-text-500 text-sm md:text-base">
              Lihat berapa banyak yang bisa Anda hasilkan setelah mengikuti pelatihan dan sertifikasi
            </p>
          </div>

          <div class="card p-4 md:p-6 lg:p-8">
            <div class="grid md:grid-cols-2 gap-6 md:gap-8">
              <!-- Calculator Input -->
              <div>
                <h3 class="font-semibold text-base md:text-lg mb-4 md:mb-6">Informasi Anda</h3>
                
                <div class="space-y-3 md:space-y-4">
                  <div>
                    <label for="skill" class="block text-xs md:text-sm font-medium text-text-900 mb-1 md:mb-2">
                      Keahlian Utama
                    </label>
                    <select id="skill" v-model="calculator.skill" class="form-input w-full text-sm md:text-base">
                      <option value="">Pilih keahlian</option>
                      <option value="bangunan">Tukang Bangunan</option>
                      <option value="listrik">Tukang Listrik</option>
                      <option value="plumbing">Tukang Plumbing</option>
                      <option value="cat">Tukang Cat</option>
                      <option value="kayu">Tukang Kayu</option>
                      <option value="atap">Tukang Atap</option>
                    </select>
                  </div>

                  <div>
                    <label for="experience" class="block text-xs md:text-sm font-medium text-text-900 mb-1 md:mb-2">
                      Pengalaman (tahun)
                    </label>
                    <input
                      id="experience"
                      v-model="calculator.experience"
                      type="number"
                      min="0"
                      max="30"
                      class="form-input w-full text-sm md:text-base"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label for="currentIncome" class="block text-xs md:text-sm font-medium text-text-900 mb-1 md:mb-2">
                      Penghasilan saat ini per hari
                    </label>
                    <input
                      id="currentIncome"
                      v-model="calculator.currentIncome"
                      type="number"
                      min="0"
                      step="50000"
                      class="form-input w-full text-sm md:text-base"
                      placeholder="250000"
                    />
                  </div>

                  <div>
                    <label for="location" class="block text-xs md:text-sm font-medium text-text-900 mb-1 md:mb-2">
                      Lokasi
                    </label>
                    <select id="location" v-model="calculator.location" class="form-input w-full text-sm md:text-base">
                      <option value="">Pilih lokasi</option>
                      <option value="jakarta">Jakarta</option>
                      <option value="bandung">Bandung</option>
                      <option value="surabaya">Surabaya</option>
                      <option value="yogyakarta">Yogyakarta</option>
                      <option value="medan">Medan</option>
                      <option value="semarang">Semarang</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Results -->
              <div class="bg-bg-page rounded-lg p-4 md:p-6">
                <h3 class="font-semibold text-base md:text-lg mb-4 md:mb-6">Proyeksi Penghasilan</h3>
                
                <div class="space-y-4 md:space-y-6">
                  <!-- Current vs Potential -->
                  <div class="grid grid-cols-2 gap-3 md:gap-4">
                    <div class="text-center p-3 md:p-4 bg-white rounded-lg">
                      <div class="text-xs md:text-sm text-text-500 mb-1">Saat Ini</div>
                      <div class="text-lg md:text-xl font-bold text-text-900">
                        {{ formatCurrency(calculatedResults.current) }}
                      </div>
                      <div class="text-xs text-text-500">per hari</div>
                    </div>
                    <div class="text-center p-3 md:p-4 bg-success/10 rounded-lg">
                      <div class="text-xs md:text-sm text-success mb-1">Setelah Sertifikasi</div>
                      <div class="text-lg md:text-xl font-bold text-success">
                        {{ formatCurrency(calculatedResults.potential) }}
                      </div>
                      <div class="text-xs text-success">per hari</div>
                    </div>
                  </div>

                  <!-- Monthly & Yearly -->
                  <div class="space-y-2 md:space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-text-600 text-sm md:text-base">Per bulan:</span>
                      <span class="font-semibold text-success text-sm md:text-base">
                        {{ formatCurrency(calculatedResults.monthly) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-text-600 text-sm md:text-base">Per tahun:</span>
                      <span class="font-semibold text-success text-sm md:text-base">
                        {{ formatCurrency(calculatedResults.yearly) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center pt-2 md:pt-3 border-t border-border">
                      <span class="text-text-600 text-sm md:text-base">Peningkatan:</span>
                      <span class="font-bold text-success text-base md:text-lg">
                        +{{ calculatedResults.improvement }}%
                      </span>
                    </div>
                  </div>

                  <!-- CTA -->
                  <div class="pt-3 md:pt-4">
                    <NuxtLink to="/courses" class="btn-primary w-full text-sm md:text-base">
                      Mulai Tingkatkan Penghasilan
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 md:py-16 bg-primary text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-3 md:mb-4">
            Siap Menjadi Tukang Profesional?
          </h2>
          <p class="text-base md:text-xl mb-6 md:mb-8 opacity-90">
            Bergabunglah dengan <span class="font-bold">1,200+ tukang</span> yang sudah meningkatkan karir dan penghasilan mereka
          </p>
          
          <div class="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 text-center">
            <div class="bg-white/10 rounded-lg p-3 md:p-4">
              <div class="text-lg md:text-2xl font-bold text-accent mb-1">100%</div>
              <div class="text-xs md:text-sm opacity-80">Gratis untuk memulai</div>
            </div>
            <div class="bg-white/10 rounded-lg p-3 md:p-4">
              <div class="text-lg md:text-2xl font-bold text-accent mb-1">24/7</div>
              <div class="text-xs md:text-sm opacity-80">Akses pembelajaran</div>
            </div>
            <div class="bg-white/10 rounded-lg p-3 md:p-4">
              <div class="text-lg md:text-2xl font-bold text-accent mb-1">3x</div>
              <div class="text-xs md:text-sm opacity-80">Peningkatan penghasilan</div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <NuxtLink to="/courses" class="btn-secondary text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
              Mulai Belajar Sekarang
            </NuxtLink>
          </div>
          
          <p class="text-xs md:text-sm opacity-70 mt-3 md:mt-4">
            Tidak ada biaya tersembunyi • Sertifikat resmi • Dukungan penuh
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-8 md:py-12 bg-primary/5">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          <div>
            <div class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">1,200+</div>
            <div class="text-text-600 text-xs md:text-sm lg:text-base">Tukang Tersertifikasi</div>
          </div>
          <div>
            <div class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">50+</div>
            <div class="text-text-600 text-xs md:text-sm lg:text-base">Kursus Tersedia</div>
          </div>
          <div>
            <div class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">4.9/5</div>
            <div class="text-text-600 text-xs md:text-sm lg:text-base">Rating Kursus</div>
          </div>
          <div>
            <div class="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 md:mb-2">85%</div>
            <div class="text-text-600 text-xs md:text-sm lg:text-base">Dapat Kerja Setelah Sertifikasi</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-text-900 text-white py-6 md:py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-3 md:mb-4">
          <h3 class="text-lg md:text-xl font-heading font-bold">TukangIn</h3>
          <p class="text-xs md:text-sm opacity-80">Platform Tukang Indonesia</p>
        </div>
        <p class="text-xs md:text-sm opacity-60">
          © 2025 TukangIn. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare function navigateTo(url: string): any

// Component state
const searchQuery = ref('')
const selectedSkill = ref('')

// Income calculator
const calculator = reactive({
  skill: '',
  experience: 0,
  currentIncome: 250000,
  location: ''
})

// Featured courses data
const featuredCourses = [
  {
    id: 1,
    title: 'Dasar-Dasar Tukang Bangunan',
    description: 'Pelajari fundamental konstruksi, membaca gambar, dan teknik pondasi yang benar.',
    thumbnail: 'https://picsum.photos/seed/construction-featured-1/1280/720',
    level: 'Pemula',
    duration: '4 minggu',
    enrolledCount: 2847,
    rating: 4.8,
    reviewCount: 342,
    skills: ['Pondasi', 'Konstruksi', 'Gambar Teknik']
  },
  {
    id: 2,
    title: 'Instalasi Listrik Rumah Tinggal',
    description: 'Kuasai instalasi listrik standar PLN untuk rumah tinggal dengan aman dan benar.',
    thumbnail: 'https://picsum.photos/seed/electrical-featured-2/1280/720',
    level: 'Menengah',
    duration: '6 minggu',
    enrolledCount: 1923,
    rating: 4.9,
    reviewCount: 278,
    skills: ['Instalasi', 'Kelistrikan', 'K3']
  },
  {
    id: 3,
    title: 'Sistem Plumbing Modern',
    description: 'Teknik plumbing terkini termasuk sistem air panas dan sanitasi modern.',
    thumbnail: 'https://picsum.photos/seed/electrical-featured-1/1280/720',
    level: 'Menengah',
    duration: '5 minggu',
    enrolledCount: 1456,
    rating: 4.7,
    reviewCount: 189,
    skills: ['Plumbing', 'Sanitasi', 'Air Panas']
  }
]

// Success stories data
const successStories = [
  {
    id: 1,
    name: 'Agus Supriyanto',
    avatar: 'https://picsum.photos/seed/agus-supri-1/400/400',
    specialization: 'Tukang Listrik Bersertifikat',
    before: {
      income: 'Rp 300K/hari',
      status: 'Tukang Biasa'
    },
    after: {
      income: 'Rp 750K/hari',
      status: 'Tersertifikasi'
    },
    improvement: 150,
    testimonial: 'Setelah ikut pelatihan dan dapat sertifikat, klien lebih percaya dan bayarannya naik drastis. Sekarang saya punya tim sendiri!',
    certified: true,
    verified: true
  },
  {
    id: 2,
    name: 'Budi Setiawan',
    avatar: 'https://picsum.photos/seed/budi-setiawan-2/400/400',
    specialization: 'Tukang Bangunan Profesional',
    before: {
      income: 'Rp 350K/hari',
      status: 'Kuli Bangunan'
    },
    after: {
      income: 'Rp 850K/hari',
      status: 'Mandor Bersertifikat'
    },
    improvement: 142,
    testimonial: 'TukangIn mengubah hidup saya. Dari kuli biasa jadi mandor dengan gaji 2x lipat. Keluarga bangga!',
    certified: true,
    verified: true
  },
  {
    id: 3,
    name: 'Slamet Raharjo',
    avatar: 'https://picsum.photos/seed/slamet-raharjo-3/400/400',
    specialization: 'Spesialis Plumbing',
    before: {
      income: 'Rp 280K/hari',
      status: 'Tukang Ledeng'
    },
    after: {
      income: 'Rp 650K/hari',
      status: 'Ahli Plumbing'
    },
    improvement: 132,
    testimonial: 'Dengan sertifikat dari TukangIn, saya bisa handle proyek apartment dan mall. Income stabil dan naik terus!',
    certified: true,
    verified: true
  }
]

// Computed properties
const calculatedResults = computed(() => {
  let baseIncome = calculator.currentIncome || 250000
  let multiplier = 1.5 // Base improvement

  // Skill-based multiplier
  const skillMultipliers: Record<string, number> = {
    'listrik': 2.2,
    'plumbing': 2.0,
    'bangunan': 1.8,
    'atap': 1.9,
    'kayu': 1.7,
    'cat': 1.5
  }

  if (calculator.skill && skillMultipliers[calculator.skill]) {
    multiplier = skillMultipliers[calculator.skill]
  }

  // Experience bonus
  if (calculator.experience > 5) {
    multiplier += 0.3
  } else if (calculator.experience > 2) {
    multiplier += 0.2
  }

  // Location bonus
  const locationMultipliers: Record<string, number> = {
    'jakarta': 1.3,
    'bandung': 1.1,
    'surabaya': 1.2,
    'yogyakarta': 1.0,
    'medan': 1.1,
    'semarang': 1.0
  }

  if (calculator.location && locationMultipliers[calculator.location]) {
    multiplier *= locationMultipliers[calculator.location]
  }

  const potential = Math.round(baseIncome * multiplier)
  const monthly = potential * 22 // 22 working days
  const yearly = monthly * 12
  const improvement = Math.round(((potential - baseIncome) / baseIncome) * 100)

  return {
    current: baseIncome,
    potential,
    monthly,
    yearly,
    improvement
  }
})

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// SEO and meta configuration
useHead({
  title: 'TukangIn - Transformasi Karir Tukang Indonesia',
  meta: [
    {
      name: 'description',
      content: 'Platform pelatihan dan sertifikasi untuk tukang Indonesia. Tingkatkan keahlian, dapatkan sertifikat resmi, dan raih penghasilan hingga 3x lipat lebih tinggi.'
    },
    {
      property: 'og:title',
      content: 'TukangIn - Transformasi Karir Tukang Indonesia'
    },
    {
      property: 'og:description',
      content: 'Bergabunglah dengan 1,200+ tukang yang sudah meningkatkan karir dan penghasilan mereka melalui pelatihan berkualitas dan sertifikasi resmi.'
    }
  ]
})
</script>