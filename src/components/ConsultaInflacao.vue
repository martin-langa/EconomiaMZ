<script setup>
import { useInflacao } from '../composables/useInflacao.js'
import '../assets/consulta-inflacao.css'

const {
  dados, metadados, fonte, carregando, erro, ultimoDado, dadoAnterior,
  variacaoPontosPercentuais, carregarInflacao,
} = useInflacao()
</script>

<template>
  <div class="consulta-inflacao">
    <p v-if="carregando" role="status">A carregar os dados de inflação…</p>
    <div v-else-if="erro" role="alert">
      <p>Não foi possível carregar os dados de inflação. {{ erro }}</p>
      <button type="button" @click="carregarInflacao()">Tentar novamente</button>
    </div>
    <p v-else-if="!dados.length" role="status">Sem dados de inflação disponíveis.</p>
    <template v-else>
      <slot :dados="dados" :fonte="fonte" :metadados="metadados" :ultimoDado="ultimoDado" :dadoAnterior="dadoAnterior"
        :variacaoPontosPercentuais="variacaoPontosPercentuais" />
      <footer>
        Banco Mundial, <i>World Development Indicators</i> (FMI).
        <template v-if="metadados.url_api">
          <a :href="metadados.url_api">Recolha pela API</a> em
          <time :datetime="metadados.data_recolha_api">{{ metadados.data_recolha_api }}</time>.
        </template>
        Série de referência no
        <a :href="fonte">FRED (FPCPITOTLZGMOZ)</a>.
        Consulta FRED em <time datetime="2026-11-20">20/11/2026</time>.
      </footer>
    </template>
  </div>
</template>
