<script setup>
import { useRoute } from 'vue-router'
import AnaliseInflacao from '../components/AnaliseInflacao.vue'
import ConsultaInflacao from '../components/ConsultaInflacao.vue'

const route = useRoute()
</script>

<template>
  <main class="pagina-inflacao">
    <header>
      <RouterLink to="/indicadores">← Indicadores</RouterLink>
      <h1>{{ route.params.codigo === 'inflacao' ? 'Inflação anual' : 'Indicador indisponível' }}</h1>
      <p v-if="route.params.codigo === 'inflacao'">
        A taxa mede a variação percentual média dos preços ao consumidor em Moçambique
        em relação ao ano anterior.
      </p>
      <p v-else>O código solicitado não corresponde a um indicador disponível.</p>
    </header>
    <ConsultaInflacao v-if="route.params.codigo === 'inflacao'" v-slot="{ dados, fonte }">
      <dl class="metadados">
        <div><dt>Código do indicador</dt><dd>FP.CPI.TOTL.ZG</dd></div>
        <div><dt>Período da cópia</dt><dd>{{ dados[0].ano }} – {{ dados.at(-1).ano }}</dd></div>
        <div><dt>Atribuição indicada no ficheiro</dt><dd>FRED · Public Domain / Citation Requested</dd></div>
      </dl>
      <AnaliseInflacao :dados="dados" :fonte="fonte">
        <template #resumo="seleccao"><slot name="resumo" v-bind="seleccao" /></template>
      </AnaliseInflacao>
    </ConsultaInflacao>
  </main>
</template>

<style scoped>
.metadados { display: flex; gap: 1rem 2rem; flex-wrap: wrap; margin: 0; padding: 1rem; background: #eaf1e9; }
dt { font-size: .85rem; }
dd { margin: .2rem 0 0; font-weight: 600; }
</style>
