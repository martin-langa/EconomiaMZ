<script setup>
import { formatarPontos, formatarTaxa } from '../utils/formatarInflacao.js'

defineProps({
  ultimoDado: { type: Object, required: true },
  dadoAnterior: { type: Object, default: null },
  variacaoPontosPercentuais: { type: Number, default: null },
})
</script>

<template>
  <article class="indicador-card">
    <h2>Última taxa anual disponível</h2>
    <p class="taxa">{{ formatarTaxa(ultimoDado.valor) }}</p>
    <p>Inflação em Moçambique em <strong>{{ ultimoDado.ano }}</strong></p>
    <p v-if="dadoAnterior && variacaoPontosPercentuais !== null" class="variacao">
      <strong>{{ formatarPontos(variacaoPontosPercentuais) }}</strong>
      face a {{ dadoAnterior.ano }}
    </p>
  </article>
</template>

<style scoped>
.indicador-card {
  box-sizing: border-box;
  padding: clamp(1.3rem, 5vw, 2.4rem);
  border-radius: 1rem;
  background: #10483e;
  color: #fff;
}
.indicador-card h2 { margin: 0; font: inherit; font-weight: 600; color: #e3f1e8; }
.indicador-card p { margin: 0; }
.indicador-card .taxa {
  margin: .35rem 0;
  font-size: clamp(2.8rem, 9vw, 5rem);
  line-height: 1.1;
  font-weight: 650;
  letter-spacing: -.05em;
  font-variant-numeric: tabular-nums;
}
.indicador-card .variacao { margin-top: 1.25rem; color: #ddede1; }
</style>
