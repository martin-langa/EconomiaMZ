<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <RouterView />
    <footer class="app-footer">
      <p>EconomiaMZ · Monitor da Inflação em Moçambique</p>
    </footer>
  </div>
</template>
