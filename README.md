# TukangIn - Platform Pelatihan Tukang Indonesia

Platform pelatihan, sertifikasi, dan personal branding untuk tukang informal Indonesia. Dibangun dengan Nuxt 4, TailwindCSS, dan teknologi modern untuk performa optimal.

## 🚀 Fitur Utama

### Untuk Tukang
- ✅ Buat profil profesional dengan portofolio
- ✅ Ikuti pelatihan online dengan sertifikasi resmi
- ✅ Ujian online dengan sistem timer dan auto-save
- ✅ Upload dan kelola sertifikat dengan QR verification
- ✅ Cari dan lamar pekerjaan sesuai keahlian
- ✅ Dashboard personal dengan rekomendasi

### Untuk Kontraktor/Mandor
- ✅ Cari tukang berdasarkan sertifikasi dan keahlian
- ✅ Post lowongan pekerjaan
- ✅ Filter berdasarkan lokasi, rating, dan harga
- ✅ Chat system untuk komunikasi
- ✅ Shortlist kandidat terbaik

### Untuk Pemilik Rumah
- ✅ Cari tukang terverifikasi di area lokal
- ✅ Booking langsung dengan kontrak sederhana
- ✅ Sistem review dan rating
- ✅ Riwayat proyek dan pembayaran

## 🛠 Tech Stack

- **Framework**: Nuxt 4 (Vue 3 + Nitro)
- **Styling**: TailwindCSS dengan design tokens
- **Icons**: Nuxt Feather Icons
- **State Management**: Pinia
- **Utilities**: VueUse
- **Build Tool**: Vite
- **Language**: TypeScript

## 🎨 Design System

### Colors
- **Primary**: #0B63CE (Brand blue)
- **Secondary**: #FF6A00 (Accent orange)
- **Success**: #28A745
- **Danger**: #E53E3E
- **Background**: #F6F8FA
- **Text**: #1F2937

### Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500, 600)
- **Base Size**: 16px

### Spacing & Layout
- **Scale**: 4, 8, 12, 16, 24, 32px
- **Border Radius**: 8px
- **Button Height**: 44px (accessibility compliant)

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

### Quick Start

```bash
# Clone repository
git clone https://github.com/your-org/tukang-in.git
cd tukang-in

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server dengan hot reload
npm run build        # Build untuk production
npm run preview      # Preview build hasil

# Code Quality
npm run format       # Format code dengan Prettier
npm run lint         # Check ESLint errors
npm run test         # Run unit tests dengan Vitest

# Deployment
npm run generate     # Generate static site
```

## 📁 Project Structure

```
tukang-in/
├── app/
│   ├── pages/           # File-based routing
│   │   ├── index.vue    # Landing page
│   │   ├── auth/        # Authentication pages
│   │   ├── tukang/      # Tukang dashboard & features
│   │   ├── kontraktor/  # Kontraktor features
│   │   └── pelatihan/   # Training catalog
│   ├── components/      # Reusable components
│   │   ├── ui/          # Base UI components
│   │   └── layout/      # Layout components
│   ├── composables/     # Vue composables
│   ├── stores/          # Pinia stores
│   └── layouts/         # App layouts
├── server/
│   └── api/             # Nitro API routes (mock endpoints)
├── assets/
│   └── css/             # Global styles
├── public/              # Static assets
└── docs/                # Documentation
```

## 🔌 API Endpoints (Mock)

### Authentication
```bash
POST /api/auth/register     # User registration
POST /api/auth/login        # Login with phone/password
POST /api/auth/otp-send     # Send OTP for phone verification
POST /api/auth/otp-verify   # Verify OTP code
POST /api/auth/logout       # Logout user
GET  /api/auth/me          # Get current user
```

### Tukang Management
```bash
GET  /api/tukang           # List tukang with filters
POST /api/tukang           # Create tukang profile
GET  /api/tukang/:id       # Get specific tukang
PUT  /api/tukang/:id       # Update tukang profile
```

### Training & Certification
```bash
GET  /api/pelatihan        # List available courses
POST /api/pelatihan        # Register for course
GET  /api/ujian/:id        # Get exam details
POST /api/ujian/:id/start  # Start exam session
POST /api/ujian/:id/submit # Submit exam answers
GET  /api/sertifikat/:id   # Verify certificate
```

### Jobs & Projects
```bash
GET  /api/jobs             # List job openings
POST /api/jobs             # Create job posting
GET  /api/jobs/:id         # Get job details
POST /api/jobs/:id/apply   # Apply for job
```

## 🧪 Testing API Endpoints

### Example cURL Commands

```bash
# Get list of tukang with filters
curl "http://localhost:3000/api/tukang?location=jakarta&rating=4&skill=bangunan"

# Register new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "08123456789",
    "password": "password123",
    "role": "tukang",
    "terms": true
  }'

# Login user
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "08123456789",
    "password": "password123",
    "role": "tukang"
  }'
```

## 🎯 Performance Features

### Mobile-First Optimization
- Responsive design mulai dari 320px
- Touch targets minimum 44px
- Optimized images dengan lazy loading
- "Lite mode" untuk koneksi lambat

### Accessibility (A11y)
- ARIA labels untuk semua interactive elements
- Keyboard navigation support
- Color contrast ratio ≥ 4.5:1
- Screen reader friendly

### SEO & Meta Tags
- Dynamic meta tags per halaman
- Open Graph tags untuk social sharing
- Structured data untuk rich snippets
- Sitemap auto-generation

## 📱 User Flow Examples

### Tukang Registration & Certification
1. Landing page → Register sebagai Tukang
2. Phone verification dengan OTP
3. Complete profile dengan foto & keahlian
4. Browse katalog pelatihan
5. Ikuti ujian online dengan timer
6. Download sertifikat dengan QR code
7. Receive job recommendations

### Kontraktor Finding Tukang
1. Register sebagai Kontraktor
2. Search & filter tukang berdasarkan kriteria
3. View detailed profiles & portfolios
4. Contact via chat atau phone
5. Create job posting
6. Review applications & shortlist
7. Hire & manage projects

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Custom domain
vercel --prod
```

### Manual Deployment
```bash
# Build for production
npm run build

# Upload .output/ folder to server
# Configure server untuk serve static files
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- Gunakan TypeScript untuk type safety
- Follow Vue 3 Composition API patterns
- Component props harus ter-type dengan interface
- Tambahkan JSDoc untuk functions
- Test coverage minimum 80%

## 📝 Environment Variables

```bash
# .env file
NUXT_PUBLIC_API_BASE=http://localhost:3000/api
NUXT_PUBLIC_APP_URL=http://localhost:3000

# Production
NUXT_PUBLIC_API_BASE=https://api.tukangin.com
NUXT_PUBLIC_APP_URL=https://tukangin.com
```

## 🔍 Troubleshooting

### Common Issues

**Build errors dengan TailwindCSS**
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

**Icons tidak muncul**
```bash
# Pastikan nuxt-feather-icons installed
npm install nuxt-feather-icons
```

**API endpoints 404**
```bash
# Restart dev server untuk reload server routes
npm run dev
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

- 📧 Email: support@tukangin.com
- 💬 WhatsApp: +62-812-3456-7890
- 🌐 Website: https://tukangin.com
- 📚 Docs: https://docs.tukangin.com

---

**TukangIn** - Membangun masa depan tukang Indonesia 🇮🇩
