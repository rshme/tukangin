/**
 * Mock API endpoint for fetching tukang profiles
 * Supports filtering by certification, skill, location, rating, priceRange
 * Simulates database query with realistic delays
 */

// Mock data fixtures
const mockTukangData = [
  {
    id: '1',
    name: 'Ahmad Wijaya',
    profession: 'Tukang Bangunan',
    location: 'Jakarta Timur',
    experience: 8,
    rating: 4.8,
    reviewCount: 127,
    priceRange: { min: 150000, max: 300000 },
    topSkills: ['Cor Beton', 'Pasang Keramik', 'Cat Tembok'],
    certificationCount: 3,
    avatar: '/api/placeholder/avatar/1.jpg',
    isVerified: true,
    isBookmarked: false,
    phone: '08123456701',
    email: 'ahmad.wijaya@email.com',
    description: 'Berpengalaman dalam pembangunan rumah tinggal dan renovasi. Telah menyelesaikan lebih dari 200 proyek.',
    completedProjects: 234,
    recentProject: {
      title: 'Renovasi Rumah Type 45',
      image: '/api/placeholder/project/1.jpg',
      completedAt: '2025-01-10'
    },
    certifications: [
      { name: 'Sertifikat K3 Konstruksi', issuer: 'Kemnaker RI', year: 2024 },
      { name: 'Ahli Bangunan Gedung', issuer: 'LPJK', year: 2023 },
      { name: 'Tukang Terampil Bersertifikat', issuer: 'BNP2TKI', year: 2022 }
    ]
  },
  {
    id: '2',
    name: 'Budi Santoso',
    profession: 'Tukang Listrik',
    location: 'Bandung',
    experience: 12,
    rating: 4.9,
    reviewCount: 89,
    priceRange: { min: 200000, max: 500000 },
    topSkills: ['Instalasi Listrik', 'Panel Listrik', 'Troubleshooting'],
    certificationCount: 4,
    avatar: '/api/placeholder/avatar/2.jpg',
    isVerified: true,
    isBookmarked: true,
    phone: '08123456702',
    email: 'budi.santoso@email.com',
    description: 'Spesialis instalasi listrik rumah dan gedung. Berpengalaman dengan sistem smart home.',
    completedProjects: 156,
    recentProject: {
      title: 'Instalasi Smart Home Villa',
      image: '/api/placeholder/project/2.jpg',
      completedAt: '2025-01-08'
    }
  },
  {
    id: '3',
    name: 'Siti Nurjanah',
    profession: 'Tukang Plumbing',
    location: 'Surabaya',
    experience: 6,
    rating: 4.7,
    reviewCount: 45,
    priceRange: { min: 100000, max: 250000 },
    topSkills: ['Pipa Air', 'Water Heater', 'Saluran Pembuangan'],
    certificationCount: 2,
    avatar: '/api/placeholder/avatar/3.jpg',
    isVerified: true,
    isBookmarked: false,
    phone: '08123456703',
    email: 'siti.nurjanah@email.com',
    description: 'Tukang plumbing wanita pertama di Surabaya yang bersertifikat. Ahli dalam sistem perpipaan modern.',
    completedProjects: 78,
    recentProject: {
      title: 'Instalasi Water Heater Apartemen',
      image: '/api/placeholder/project/3.jpg',
      completedAt: '2025-01-05'
    }
  },
  {
    id: '4',
    name: 'Joko Prasetyo',
    profession: 'Tukang Cat',
    location: 'Yogyakarta',
    experience: 5,
    rating: 4.6,
    reviewCount: 67,
    priceRange: { min: 80000, max: 180000 },
    topSkills: ['Cat Eksterior', 'Cat Interior', 'Tekstur Dinding'],
    certificationCount: 1,
    avatar: '/api/placeholder/avatar/4.jpg',
    isVerified: false,
    isBookmarked: false,
    phone: '08123456704',
    email: 'joko.prasetyo@email.com',
    description: 'Spesialis pengecatan rumah dengan teknik modern. Menggunakan cat berkualitas tinggi.',
    completedProjects: 92,
    recentProject: {
      title: 'Pengecatan Rumah Minimalis',
      image: '/api/placeholder/project/4.jpg',
      completedAt: '2025-01-03'
    }
  },
  {
    id: '5',
    name: 'Agus Setiawan',
    profession: 'Tukang Kayu',
    location: 'Medan',
    experience: 15,
    rating: 4.9,
    reviewCount: 203,
    priceRange: { min: 250000, max: 600000 },
    topSkills: ['Furniture Custom', 'Kusen Kayu', 'Atap Kayu'],
    certificationCount: 5,
    avatar: '/api/placeholder/avatar/5.jpg',
    isVerified: true,
    isBookmarked: true,
    phone: '08123456705',
    email: 'agus.setiawan@email.com',
    description: 'Master tukang kayu dengan pengalaman 15 tahun. Spesialis furniture custom dan konstruksi kayu.',
    completedProjects: 345,
    recentProject: {
      title: 'Kitchen Set Minimalis',
      image: '/api/placeholder/project/5.jpg',
      completedAt: '2025-01-12'
    }
  }
]

export default defineEventHandler(async (event) => {
  // Simulate API delay for realistic behavior
  await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))

  const query = getQuery(event)
  
  // Extract filter parameters
  const {
    certification,
    skill,
    location,
    rating,
    priceRange,
    search,
    page = '1',
    limit = '10',
    sortBy = 'rating',
    sortOrder = 'desc'
  } = query as Record<string, string>

  let filteredData = [...mockTukangData]

  // Apply filters
  if (certification) {
    // Filter by certification requirement
    const certCount = parseInt(certification)
    filteredData = filteredData.filter(tukang => tukang.certificationCount >= certCount)
  }

  if (skill) {
    // Filter by specific skill
    filteredData = filteredData.filter(tukang => 
      tukang.topSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    )
  }

  if (location) {
    // Filter by location
    filteredData = filteredData.filter(tukang => 
      tukang.location.toLowerCase().includes(location.toLowerCase())
    )
  }

  if (rating) {
    // Filter by minimum rating
    const minRating = parseFloat(rating)
    filteredData = filteredData.filter(tukang => tukang.rating >= minRating)
  }

  if (priceRange) {
    // Filter by price range: "min-max" format
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)
    filteredData = filteredData.filter(tukang => 
      tukang.priceRange.min >= minPrice && tukang.priceRange.max <= maxPrice
    )
  }

  if (search) {
    // Search in name, profession, skills
    const searchTerm = search.toLowerCase()
    filteredData = filteredData.filter(tukang => 
      tukang.name.toLowerCase().includes(searchTerm) ||
      tukang.profession.toLowerCase().includes(searchTerm) ||
      tukang.topSkills.some(skill => skill.toLowerCase().includes(searchTerm))
    )
  }

  // Apply sorting
  filteredData.sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'rating':
        aValue = a.rating
        bValue = b.rating
        break
      case 'experience':
        aValue = a.experience
        bValue = b.experience
        break
      case 'price':
        aValue = a.priceRange.min
        bValue = b.priceRange.min
        break
      case 'name':
        aValue = a.name
        bValue = b.name
        break
      default:
        aValue = a.rating
        bValue = b.rating
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Apply pagination
  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)
  const startIndex = (pageNum - 1) * limitNum
  const endIndex = startIndex + limitNum
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Calculate pagination metadata
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / limitNum)
  const hasNextPage = pageNum < totalPages
  const hasPrevPage = pageNum > 1

  return {
    success: true,
    data: paginatedData,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalItems,
      itemsPerPage: limitNum,
      hasNextPage,
      hasPrevPage
    },
    filters: {
      certification,
      skill,
      location,
      rating,
      priceRange,
      search
    },
    meta: {
      timestamp: new Date().toISOString(),
      processingTime: Math.random() * 50 + 10 // Mock processing time
    }
  }
})
