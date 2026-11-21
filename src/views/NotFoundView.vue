<template>
  <main class="pagina-404" aria-labelledby="titulo-404">
    <p class="codigo">Erro 404</p>
    <h1 id="titulo-404">Esta página não existe</h1>
    <p>O endereço pode estar incorreto ou a página pode ter sido movida.</p>
    <RouterLink class="voltar-inicio" to="/">Voltar à página inicial</RouterLink>
  </main>
</template>

<style scoped>
.pagina-404 { box-sizing: border-box; width: min(100% - 2rem, 56rem); min-height: 55vh; margin-inline: auto; display: grid; align-content: center; justify-items: start; gap: .75rem; }
.pagina-404 h1 { margin: 0; font-size: clamp(2rem, 6vw, 3.5rem); }
.codigo { color: #376e59; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
.voltar-inicio { display: inline-flex; align-items: center; min-height: 2.75rem; margin-top: .75rem; padding-inline: 1rem; border-radius: .45rem; background: #10483e; color: white; font-weight: 650; text-decoration: none; }
.voltar-inicio:hover { background: #226457; }
</style>
