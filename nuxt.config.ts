// Nuxt 4 configuration with TailwindCSS, Pinia, and Feather Icons
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // App configuration
  app: {
    head: {
      title: 'TukangIn - Platform Pelatihan Tukang Indonesia',
      meta: [
        { name: 'description', content: 'Platform pelatihan, sertifikasi, dan personal branding untuk tukang informal Indonesia' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Google Fonts for typography
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap' 
        }
      ]
    }
  },

  // CSS configuration
  css: ['../assets/css/main.css'],

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-feather-icons',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],

  // TailwindCSS configuration
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  // Pinia store configuration
  pinia: {
    storesDirs: ['./stores/**']
  },

  // Runtime configuration for API
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'
    }
  },

  // Nitro configuration for API routes
  nitro: {
    experimental: {
      wasm: true
    }
  },

  // Build optimization
  build: {
    transpile: ['@headlessui/vue']
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false
  }
})