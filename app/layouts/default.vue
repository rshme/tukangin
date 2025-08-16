<template>
  <div class="min-h-screen bg-bg-page">
    <!-- Navigation Bar -->
    <NavBar />
    
    <!-- Main Content with padding for fixed navbar -->
    <main class="pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'

// Add body class to prevent content jumping
onMounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style>
/* Global styles for fixed navbar */
html {
  scroll-padding-top: 4rem; /* Account for fixed navbar when scrolling to anchors */
}
</style>
