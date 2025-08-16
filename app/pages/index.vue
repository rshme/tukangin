<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary to-primary-600 text-white">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Logo/Brand -->
          <div class="mb-8">
            <h1 class="text-4xl md:text-6xl font-heading font-bold mb-4">
              TukangIn
            </h1>
            <p class="text-xl md:text-2xl opacity-90">
              Platform Pelatihan & Sertifikasi Tukang Indonesia
            </p>
          </div>

          <!-- Value Proposition -->
          <div class="mb-12">
            <p class="text-lg md:text-xl mb-6 opacity-90">
              Tingkatkan keahlian, dapatkan sertifikat, dan wujudkan karir impian sebagai tukang profesional
            </p>
            
            <!-- Key Benefits -->
            <div class="grid md:grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <UserIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Profil Profesional</h3>
                <p class="text-sm opacity-80">Buat portofolio dan showcase keahlian Anda</p>
              </div>
              <div class="text-center">
                <AwardIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Sertifikasi Resmi</h3>
                <p class="text-sm opacity-80">Dapatkan sertifikat yang diakui industri</p>
              </div>
              <div class="text-center">
                <BriefcaseIcon size="32" class="mx-auto mb-3 text-accent" />
                <h3 class="font-heading font-semibold mb-2">Peluang Kerja</h3>
                <p class="text-sm opacity-80">Temukan proyek dan klien potensial</p>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/auth/register?role=tukang" class="btn-secondary w-full md:w-auto">
              <UserIcon size="20" class="mr-2" />
              Daftar sebagai Tukang
            </NuxtLink>
            <NuxtLink to="/auth/register?role=kontraktor" class="btn-ghost w-full md:w-auto">
              <BriefcaseIcon size="20" class="mr-2" />
              Daftar sebagai Kontraktor
            </NuxtLink>
            <NuxtLink to="/auth/register?role=pemilik" class="btn-ghost w-full md:w-auto">
              <HomeIcon size="20" class="mr-2" />
              Daftar sebagai Pemilik Rumah
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-bg-surface">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-text-900 mb-4">
            Kenapa Pilih TukangIn?
          </h2>
          <p class="text-text-500 max-w-2xl mx-auto">
            Platform lengkap untuk mengembangkan karir sebagai tukang profesional
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <BookOpenIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Pelatihan Berkualitas</h3>
            <p class="text-text-500">
              Materi pembelajaran dari ahli berpengalaman dengan sertifikat resmi
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <SmartphoneIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Belajar Fleksibel</h3>
            <p class="text-text-500">
              Akses materi kapan saja, di mana saja melalui smartphone atau laptop
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <UsersIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Komunitas Aktif</h3>
            <p class="text-text-500">
              Bergabung dengan ribuan tukang profesional se-Indonesia
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <TrendingUpIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Tingkatkan Penghasilan</h3>
            <p class="text-text-500">
              Dapatkan akses ke proyek-proyek dengan bayaran yang lebih tinggi
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <ShieldIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Sertifikat Terpercaya</h3>
            <p class="text-text-500">
              Sertifikat yang diakui oleh industri konstruksi Indonesia
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="card p-6 text-center hover:shadow-lg transition-shadow">
            <MapPinIcon size="48" class="mx-auto mb-4 text-primary" />
            <h3 class="font-heading font-semibold text-xl mb-3">Jangkauan Nasional</h3>
            <p class="text-text-500">
              Temukan peluang kerja di seluruh Indonesia
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">
          Siap Memulai Perjalanan Anda?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Bergabunglah dengan ribuan tukang yang sudah memulai transformasi karir mereka
        </p>
        <NuxtLink to="/auth/register" class="btn-secondary">
          Mulai Sekarang - Gratis
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-text-900 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-4">
          <h3 class="text-xl font-heading font-bold">TukangIn</h3>
          <p class="text-sm opacity-80">Platform Tukang Indonesia</p>
        </div>
        <p class="text-sm opacity-60">
          © 2025 TukangIn. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// SEO and meta configuration
useHead({
  title: 'TukangIn - Platform Pelatihan Tukang Indonesia',
  meta: [
    {
      name: 'description',
      content: 'Platform pelatihan, sertifikasi, dan personal branding untuk tukang informal Indonesia. Tingkatkan keahlian dan dapatkan peluang kerja lebih baik.'
    },
    {
      property: 'og:title',
      content: 'TukangIn - Platform Pelatihan Tukang Indonesia'
    },
    {
      property: 'og:description',
      content: 'Bergabunglah dengan ribuan tukang profesional. Dapatkan pelatihan, sertifikasi, dan peluang kerja terbaik.'
    }
  ]
})
</script>