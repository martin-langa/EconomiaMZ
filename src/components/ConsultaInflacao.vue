<script setup>
import { useInflacao } from '../composables/useInflacao.js'
import '../assets/consulta-inflacao.css'

const {
  dados, fonte, carregando, erro, ultimoDado, dadoAnterior,
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
      <slot :dados="dados" :fonte="fonte" :ultimoDado="ultimoDado" :dadoAnterior="dadoAnterior"
        :variacaoPontosPercentuais="variacaoPontosPercentuais" />
      <footer>
        Banco Mundial, <i>World Development Indicators</i>, via
        <a :href="fonte">FRED (FPCPITOTLZGMOZ)</a>.
        Cópia histórica consultada em <time datetime="2026-11-20">20/11/2026</time>.
      </footer>
    </template>
  </div>
</template>
