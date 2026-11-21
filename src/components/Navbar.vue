<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuAberto = ref(false)

watch(() => route.fullPath, () => { menuAberto.value = false })
</script>

<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Navegação principal">
      <RouterLink class="marca" to="/" aria-label="EconomiaMZ, página inicial">
        <span class="marca-simbolo" aria-hidden="true">MZ</span>
        <span>Economia<span class="marca-destaque">MZ</span></span>
      </RouterLink>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuAberto"
        aria-controls="nav-links"
        @click="menuAberto = !menuAberto"
      >
        <span class="sr-only">{{ menuAberto ? 'Fechar menu' : 'Abrir menu' }}</span>
        <span aria-hidden="true">{{ menuAberto ? '×' : '☰' }}</span>
      </button>

      <div id="nav-links" class="nav-links" :class="{ 'nav-links-abertos': menuAberto }">
        <RouterLink to="/" exact-active-class="nav-link-ativo">Início</RouterLink>
        <RouterLink to="/indicadores" active-class="nav-link-ativo">Indicadores</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header { background: #10483e; color: #fff; }
.navbar { box-sizing: border-box; width: min(100% - 2rem, 72rem); min-height: 4.5rem; margin-inline: auto; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.marca { display: inline-flex; align-items: center; gap: .65rem; color: inherit; text-decoration: none; font-size: 1.2rem; font-weight: 750; letter-spacing: -.03em; }
.marca-simbolo { display: grid; place-items: center; width: 2rem; height: 2rem; border: 1px solid #a9c9ad; border-radius: .55rem; font-size: .7rem; letter-spacing: .04em; }
.marca-destaque { color: #b8d8a8; }
.nav-links { display: flex; align-items: center; gap: .4rem; }
.nav-links a { border-radius: .45rem; padding: .65rem .9rem; color: #e7f0e9; text-decoration: none; font-size: .95rem; }
.nav-links a:hover, .nav-links a.nav-link-ativo { background: #226457; color: #fff; }
.menu-toggle { display: none; color: inherit; border: 1px solid #6f998c; border-radius: .4rem; background: transparent; min-width: 2.75rem; min-height: 2.75rem; font: inherit; font-size: 1.25rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
@media (max-width: 40rem) {
  .navbar { width: min(100% - 1.25rem, 72rem); flex-wrap: wrap; padding-block: .55rem; }
  .menu-toggle { display: inline-grid; place-items: center; }
  .nav-links { display: none; flex-basis: 100%; flex-direction: column; align-items: stretch; padding-bottom: .35rem; }
  .nav-links.nav-links-abertos { display: flex; }
  .nav-links a { padding: .8rem; }
}
</style>
