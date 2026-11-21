<script setup>
import AnaliseInflacao from '../components/AnaliseInflacao.vue'
import ConsultaInflacao from '../components/ConsultaInflacao.vue'
import FormularioEmail from '../components/FormularioEmail.vue'
</script>

<template>
  <main class="pagina-inflacao">
    <header>
      <RouterLink to="/">Início</RouterLink>
      <h1>Indicadores</h1>
      <p>Consulte a série anual de Moçambique e compare a inflação entre dois anos.</p>
    </header>
    <ConsultaInflacao v-slot="{ dados, fonte, metadados }">
      <AnaliseInflacao :dados="dados" :fonte="fonte">
        <template #resumo="seleccao"><FormularioEmail v-bind="seleccao" :metadados="metadados" /></template>
      </AnaliseInflacao>
      <RouterLink to="/indicadores/inflacao">Ver detalhe do indicador →</RouterLink>
    </ConsultaInflacao>
  </main>
</template>
