<script setup>
import ConsultaInflacao from '../components/ConsultaInflacao.vue'
import IndicadorCard from '../components/IndicadorCard.vue'
</script>

<template>
  <main class="pagina-inflacao">
    <header>
      <h1>EconomiaMZ</h1>
      <p>Consulte a inflação anual de Moçambique e acompanhe a evolução dos preços ao consumidor.</p>
    </header>
    <ConsultaInflacao v-slot="{ ultimoDado, dadoAnterior, variacaoPontosPercentuais }">
      <IndicadorCard :ultimo-dado="ultimoDado" :dado-anterior="dadoAnterior"
        :variacao-pontos-percentuais="variacaoPontosPercentuais" />
      <RouterLink to="/indicadores">Explorar indicadores →</RouterLink>
    </ConsultaInflacao>
  </main>
</template>
