<script setup>
import AnaliseInflacao from '../components/AnaliseInflacao.vue'
import ConsultaInflacao from '../components/ConsultaInflacao.vue'
</script>

<template>
  <main class="pagina-inflacao">
    <header>
      <RouterLink to="/">Início</RouterLink>
      <h1>Indicadores</h1>
      <p>Consulte a série anual de Moçambique e compare a inflação entre dois anos.</p>
    </header>
    <ConsultaInflacao v-slot="{ dados, fonte }">
      <AnaliseInflacao :dados="dados" :fonte="fonte">
        <template #resumo="seleccao"><slot name="resumo" v-bind="seleccao" /></template>
      </AnaliseInflacao>
      <RouterLink to="/indicadores/inflacao">Ver detalhe do indicador →</RouterLink>
    </ConsultaInflacao>
  </main>
</template>
