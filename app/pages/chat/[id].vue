<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Header -->
    <div class="bg-bg-surface border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="goBack" class="lg:hidden text-text-500 hover:text-text-900">
              <ChevronLeftIcon size="24" />
            </button>
            
            <div class="flex items-center space-x-3">
              <div class="relative">
                <img
                  :src="currentChat?.avatar"
                  :alt="currentChat?.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div
                  v-if="currentChat?.isOnline"
                  class="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-white rounded-full"
                ></div>
              </div>
              <div>
                <h1 class="font-semibold text-text-900">{{ currentChat?.name }}</h1>
                <p class="text-sm text-text-500">
                  {{ currentChat?.isOnline ? 'Online' : `Terakhir online ${currentChat?.lastSeen}` }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              @click="callTukang"
              class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <PhoneIcon size="20" />
            </button>
            <button
              @click="videoCall"
              class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <VideoIcon size="20" />
            </button>
            <button
              @click="showInfo = !showInfo"
              class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <InfoIcon size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex h-[calc(100vh-73px)]">
      <!-- Chat List Sidebar (Desktop) -->
      <div class="hidden lg:block w-80 bg-bg-surface border-r border-border">
        <div class="p-4 border-b border-border">
          <div class="relative">
            <SearchIcon size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pesan..."
              class="form-input pl-10 w-full"
            />
          </div>
        </div>
        
        <div class="overflow-y-auto h-full">
          <div
            v-for="chat in filteredChats"
            :key="chat.id"
            class="flex items-center space-x-3 p-4 hover:bg-bg-hover cursor-pointer transition-colors"
            :class="{ 'bg-primary/5 border-r-2 border-primary': chat.id === currentChatId }"
            @click="selectChat(chat.id)"
          >
            <div class="relative flex-shrink-0">
              <img
                :src="chat.avatar"
                :alt="chat.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div
                v-if="chat.isOnline"
                class="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-white rounded-full"
              ></div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-medium text-text-900 truncate">{{ chat.name }}</h3>
                <span class="text-xs text-text-500">{{ chat.lastMessageTime }}</span>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm text-text-500 truncate">{{ chat.lastMessage }}</p>
                <div class="flex items-center space-x-1">
                  <span
                    v-if="chat.unreadCount > 0"
                    class="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {{ chat.unreadCount }}
                  </span>
                  <CheckIcon
                    v-if="chat.lastMessageSent"
                    size="14"
                    :class="chat.lastMessageRead ? 'text-primary' : 'text-text-400'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages Area -->
      <div class="flex-1 flex flex-col">
        <!-- Messages Container -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
          <!-- Date Separator -->
          <div class="text-center">
            <span class="px-3 py-1 bg-bg-page text-text-500 text-sm rounded-full">
              Hari ini
            </span>
          </div>

          <!-- Messages -->
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.isSent ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[70%] group"
              :class="message.isSent ? 'order-2' : 'order-1'"
            >
              <!-- Message Bubble -->
              <div
                class="relative px-4 py-3 rounded-lg"
                :class="message.isSent 
                  ? 'bg-primary text-white ml-4' 
                  : 'bg-bg-surface border border-border mr-4'"
              >
                <!-- Message Content -->
                <div v-if="message.type === 'text'">
                  <p class="whitespace-pre-wrap">{{ message.content }}</p>
                </div>
                
                <!-- Image Message -->
                <div v-else-if="message.type === 'image'" class="space-y-2">
                  <img
                    :src="message.imageUrl"
                    :alt="message.content"
                    class="rounded-lg max-w-full cursor-pointer"
                    @click="openImageModal(message.imageUrl)"
                  />
                  <p v-if="message.content" class="text-sm">{{ message.content }}</p>
                </div>
                
                <!-- File Message -->
                <div v-else-if="message.type === 'file'" class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileIcon size="20" :class="message.isSent ? 'text-white' : 'text-primary'" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-sm">{{ message.fileName }}</p>
                    <p class="text-xs opacity-75">{{ message.fileSize }}</p>
                  </div>
                  <button class="p-1">
                    <DownloadIcon size="16" :class="message.isSent ? 'text-white' : 'text-text-500'" />
                  </button>
                </div>
                
                <!-- Quick Action Message -->
                <div v-else-if="message.type === 'action'" class="space-y-3">
                  <p>{{ message.content }}</p>
                  <div class="flex space-x-2">
                    <button
                      v-for="action in message.actions"
                      :key="action.label"
                      class="px-3 py-1 text-xs rounded-full border"
                      :class="message.isSent 
                        ? 'border-white/20 text-white hover:bg-white/10' 
                        : 'border-primary text-primary hover:bg-primary/10'"
                      @click="handleQuickAction(action)"
                    >
                      {{ action.label }}
                    </button>
                  </div>
                </div>

                <!-- Message Time & Status -->
                <div class="flex items-center justify-end space-x-1 mt-2">
                  <span 
                    class="text-xs opacity-75"
                    :class="message.isSent ? 'text-white' : 'text-text-500'"
                  >
                    {{ message.time }}
                  </span>
                  <div v-if="message.isSent" class="flex">
                    <CheckIcon
                      size="14"
                      :class="message.isRead ? 'text-white' : 'text-white/60'"
                    />
                    <CheckIcon
                      v-if="message.isDelivered"
                      size="14"
                      class="-ml-1"
                      :class="message.isRead ? 'text-white' : 'text-white/60'"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-bg-surface border border-border rounded-lg px-4 py-3 mr-4">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-text-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-text-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-text-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-t border-border bg-bg-surface p-4">
          <!-- File Preview -->
          <div v-if="selectedFiles.length > 0" class="mb-4">
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="relative inline-block"
              >
                <img
                  v-if="file.type.startsWith('image/')"
                  :src="file.preview"
                  :alt="file.name"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div
                  v-else
                  class="w-16 h-16 bg-bg-page border border-border rounded-lg flex items-center justify-center"
                >
                  <FileIcon size="24" class="text-text-500" />
                </div>
                <button
                  @click="removeFile(index)"
                  class="absolute -top-2 -right-2 w-5 h-5 bg-danger text-white rounded-full flex items-center justify-center"
                >
                  <XIcon size="12" />
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Actions Bar -->
          <div v-if="showQuickActions" class="mb-4 flex flex-wrap gap-2">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20 transition-colors"
              @click="sendQuickAction(action)"
            >
              {{ action.label }}
            </button>
          </div>

          <!-- Input Area -->
          <div class="flex items-end space-x-3">
            <!-- Attachment Button -->
            <button
              @click="showAttachmentOptions = !showAttachmentOptions"
              class="p-2 text-text-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors relative"
            >
              <PaperclipIcon size="20" />
              
              <!-- Attachment Options -->
              <div
                v-if="showAttachmentOptions"
                class="absolute bottom-full left-0 mb-2 bg-bg-surface border border-border rounded-lg shadow-lg py-2 w-48 z-10"
              >
                <label class="flex items-center space-x-3 px-4 py-2 hover:bg-bg-hover cursor-pointer">
                  <ImageIcon size="16" class="text-primary" />
                  <span class="text-sm">Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    @change="handleFileSelect"
                    class="hidden"
                  />
                </label>
                <label class="flex items-center space-x-3 px-4 py-2 hover:bg-bg-hover cursor-pointer">
                  <FileIcon size="16" class="text-primary" />
                  <span class="text-sm">File</span>
                  <input
                    type="file"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                </label>
                <button
                  @click="openCamera"
                  class="flex items-center space-x-3 px-4 py-2 hover:bg-bg-hover w-full text-left"
                >
                  <CameraIcon size="16" class="text-primary" />
                  <span class="text-sm">Kamera</span>
                </button>
              </div>
            </button>

            <!-- Message Input -->
            <div class="flex-1 relative">
              <textarea
                v-model="messageText"
                @keydown="handleKeyDown"
                @input="handleTyping"
                placeholder="Ketik pesan..."
                class="form-input resize-none max-h-32 pr-12"
                rows="1"
                ref="messageInput"
              ></textarea>
              
              <!-- Emoji Button -->
              <button
                @click="showEmojiPicker = !showEmojiPicker"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-500 hover:text-primary"
              >
                <SmileIcon size="20" />
              </button>
            </div>

            <!-- Send Button -->
            <button
              @click="sendMessage"
              :disabled="!canSend"
              class="p-3 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon size="20" />
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Info Sidebar -->
      <div
        v-if="showInfo"
        class="w-80 bg-bg-surface border-l border-border overflow-y-auto"
      >
        <div class="p-6">
          <!-- Profile Header -->
          <div class="text-center mb-6">
            <img
              :src="currentChat?.avatar"
              :alt="currentChat?.name"
              class="w-20 h-20 rounded-full object-cover mx-auto mb-3"
            />
            <h3 class="font-semibold text-text-900">{{ currentChat?.name }}</h3>
            <p class="text-text-500">{{ currentChat?.role }}</p>
            <div class="flex items-center justify-center space-x-1 mt-2">
              <StarIcon size="16" class="text-warning fill-current" />
              <span class="text-sm font-medium">{{ currentChat?.rating }}</span>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-3 mb-6">
            <button
              @click="viewProfile"
              class="w-full btn-ghost text-left"
            >
              <UserIcon size="20" class="mr-3" />
              Lihat Profil
            </button>
            <button
              @click="callTukang"
              class="w-full btn-ghost text-left"
            >
              <PhoneIcon size="20" class="mr-3" />
              Telepon
            </button>
            <button
              @click="createProject"
              class="w-full btn-ghost text-left"
            >
              <BriefcaseIcon size="20" class="mr-3" />
              Buat Proyek
            </button>
          </div>

          <!-- Shared Media -->
          <div class="mb-6">
            <h4 class="font-medium text-text-900 mb-3">Media Bersama</h4>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="media in sharedMedia"
                :key="media.id"
                class="aspect-square bg-bg-page rounded-lg overflow-hidden cursor-pointer"
                @click="openImageModal(media.url)"
              >
                <img
                  :src="media.url"
                  :alt="media.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Chat Settings -->
          <div class="space-y-3">
            <button class="w-full btn-ghost text-left text-warning">
              <BellOffIcon size="20" class="mr-3" />
              Bisukan Notifikasi
            </button>
            <button class="w-full btn-ghost text-left text-danger">
              <FlagIcon size="20" class="mr-3" />
              Laporkan
            </button>
            <button class="w-full btn-ghost text-left text-danger">
              <BlockIcon size="20" class="mr-3" />
              Blokir Pengguna
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      @click="closeImageModal"
    >
      <div class="relative max-w-4xl max-h-full">
        <img
          :src="selectedImage"
          alt="Image"
          class="max-w-full max-h-full object-contain"
        />
        <button
          @click="closeImageModal"
          class="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
        >
          <XIcon size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

// Nuxt auto-imported helpers
declare const useHead: any
declare const useRoute: any
declare function navigateTo(url: string): any

// Get chat ID from route
const route = useRoute()
const currentChatId = ref(parseInt(route.params.id as string) || 1)

// Component state
const searchQuery = ref('')
const messageText = ref('')
const selectedFiles = ref<File[]>([])
const isTyping = ref(false)
const showQuickActions = ref(true)
const showAttachmentOptions = ref(false)
const showEmojiPicker = ref(false)
const showInfo = ref(false)
const selectedImage = ref<string | null>(null)
const messagesContainer = ref<HTMLElement>()
const messageInput = ref<HTMLTextAreaElement>()

// Mock data
const chats = ref([
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    role: 'Tukang Bangunan',
    rating: 4.8,
    isOnline: true,
    lastSeen: '2 menit lalu',
    lastMessage: 'Baik pak, saya bisa mulai besok pagi',
    lastMessageTime: '14:30',
    lastMessageSent: false,
    lastMessageRead: true,
    unreadCount: 0
  },
  {
    id: 2,
    name: 'Ahmad Wijaya',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    role: 'Tukang Listrik',
    rating: 4.9,
    isOnline: false,
    lastSeen: '1 jam lalu',
    lastMessage: 'Terima kasih pak',
    lastMessageTime: '13:15',
    lastMessageSent: true,
    lastMessageRead: true,
    unreadCount: 2
  }
])

const messages = ref([
  {
    id: 1,
    type: 'text',
    content: 'Selamat siang pak, ada yang bisa saya bantu?',
    time: '14:15',
    isSent: false,
    isDelivered: true,
    isRead: true
  },
  {
    id: 2,
    type: 'text',
    content: 'Iya, saya butuh renovasi kamar mandi. Kira-kira berapa estimasi waktu dan biayanya?',
    time: '14:16',
    isSent: true,
    isDelivered: true,
    isRead: true
  },
  {
    id: 3,
    type: 'action',
    content: 'Untuk memberikan estimasi yang akurat, saya perlu lihat kondisi kamar mandi dulu pak.',
    time: '14:18',
    isSent: false,
    isDelivered: true,
    isRead: true,
    actions: [
      { label: 'Kirim Foto', action: 'send_photo' },
      { label: 'Video Call', action: 'video_call' },
      { label: 'Kunjungi Lokasi', action: 'site_visit' }
    ]
  },
  {
    id: 4,
    type: 'image',
    content: 'Ini kondisi kamar mandi saat ini',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop',
    time: '14:25',
    isSent: true,
    isDelivered: true,
    isRead: true
  },
  {
    id: 5,
    type: 'text',
    content: 'Baik pak, saya bisa mulai besok pagi. Estimasi 3-4 hari kerja dengan budget sekitar 8-10 juta',
    time: '14:30',
    isSent: false,
    isDelivered: true,
    isRead: false
  }
])

const quickActions = [
  { label: 'Terima Tawaran', action: 'accept_offer' },
  { label: 'Nego Harga', action: 'negotiate' },
  { label: 'Tanya Detail', action: 'ask_details' },
  { label: 'Jadwalkan Meeting', action: 'schedule_meeting' }
]

const sharedMedia = ref([
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&h=150&fit=crop',
    name: 'kamar_mandi_1.jpg'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=150&h=150&fit=crop',
    name: 'hasil_kerja_1.jpg'
  }
])

// Computed properties
const currentChat = computed(() => {
  return chats.value.find(chat => chat.id === currentChatId.value)
})

const filteredChats = computed(() => {
  if (!searchQuery.value) return chats.value
  
  return chats.value.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const canSend = computed(() => {
  return messageText.value.trim().length > 0 || selectedFiles.value.length > 0
})

// Methods
const goBack = () => {
  navigateTo('/chat')
}

const selectChat = (chatId: number) => {
  currentChatId.value = chatId
  navigateTo(`/chat/${chatId}`)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const handleTyping = () => {
  // Simulate typing indicator
  // In real app, send typing status to other user
}

const sendMessage = () => {
  if (!canSend.value) return

  const newMessage = {
    id: messages.value.length + 1,
    type: selectedFiles.value.length > 0 ? 'image' : 'text',
    content: messageText.value.trim(),
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    isSent: true,
    isDelivered: false,
    isRead: false
  }

  if (selectedFiles.value.length > 0) {
    // Handle file upload
    newMessage.imageUrl = URL.createObjectURL(selectedFiles.value[0])
  }

  messages.value.push(newMessage)
  messageText.value = ''
  selectedFiles.value = []
  showAttachmentOptions.value = false

  // Simulate delivery status
  setTimeout(() => {
    newMessage.isDelivered = true
  }, 1000)

  scrollToBottom()
}

const sendQuickAction = (action: any) => {
  messageText.value = action.label
  sendMessage()
}

const handleQuickAction = (action: any) => {
  switch (action.action) {
    case 'send_photo':
      // Trigger file input
      break
    case 'video_call':
      videoCall()
      break
    case 'site_visit':
      // Navigate to scheduling
      break
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  files.forEach(file => {
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file)
    })
    selectedFiles.value.push(fileWithPreview)
  })
  
  showAttachmentOptions.value = false
}

const removeFile = (index: number) => {
  URL.revokeObjectURL(selectedFiles.value[index].preview)
  selectedFiles.value.splice(index, 1)
}

const openCamera = () => {
  // In real app, open camera or navigate to camera page
  showAttachmentOptions.value = false
}

const callTukang = () => {
  window.open('tel:+62812345678', '_self')
}

const videoCall = () => {
  // In real app, start video call
  alert('Memulai video call...')
}

const viewProfile = () => {
  if (currentChat.value) {
    navigateTo(`/tukang/${currentChat.value.id}`)
  }
}

const createProject = () => {
  if (currentChat.value) {
    navigateTo(`/client/projects/create?tukang=${currentChat.value.id}`)
  }
}

const openImageModal = (imageUrl: string) => {
  selectedImage.value = imageUrl
}

const closeImageModal = () => {
  selectedImage.value = null
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Lifecycle
onMounted(() => {
  scrollToBottom()
  
  // Auto-resize textarea
  if (messageInput.value) {
    messageInput.value.addEventListener('input', () => {
      messageInput.value!.style.height = 'auto'
      messageInput.value!.style.height = messageInput.value!.scrollHeight + 'px'
    })
  }
})

// SEO
useHead({
  title: `Chat dengan ${currentChat.value?.name || 'Tukang'} - TukangIn`,
  meta: [
    {
      name: 'description',
      content: 'Chat langsung dengan tukang profesional di TukangIn'
    }
  ]
})
</script>
