<script setup>
import { computed } from 'vue'
import { Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'
import { formatarTaxa } from '../utils/formatarInflacao.js'

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip)

const props = defineProps({ dados: { type: Array, required: true } })
const serie = computed(() => ({
  datasets: [{
    label: 'Inflação anual',
    data: props.dados.map(({ ano, valor }) => ({ x: ano, y: valor })),
    borderColor: '#12604f',
    backgroundColor: '#12604f',
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 2,
  }],
}))
const opcoes = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  locale: 'pt-PT',
  scales: {
    x: {
      type: 'linear',
      min: props.dados[0]?.ano,
      max: props.dados.at(-1)?.ano,
      ticks: { precision: 0, callback: ano => String(ano) },
      grid: { display: false },
    },
    y: { beginAtZero: true, ticks: { callback: valor => formatarTaxa(valor) } },
  },
  plugins: {
    tooltip: {
      callbacks: {
        title: itens => String(itens[0].parsed.x),
        label: item => formatarTaxa(item.parsed.y),
      },
    },
  },
}))
</script>

<template>
  <div v-if="dados.length">
    <div class="grafico">
      <Line :data="serie" :options="opcoes" aria-label="Gráfico da inflação anual. Valores disponíveis na tabela abaixo." />
    </div>
    <details>
      <summary>Ver valores em tabela</summary>
      <table>
        <caption>Inflação anual no período seleccionado</caption>
        <thead><tr><th scope="col">Ano</th><th scope="col">Taxa anual</th></tr></thead>
        <tbody>
          <tr v-for="dado in dados" :key="dado.ano">
            <th scope="row">{{ dado.ano }}</th><td>{{ formatarTaxa(dado.valor) }}</td>
          </tr>
        </tbody>
      </table>
    </details>
  </div>
</template>

<style scoped>
.grafico { position: relative; height: clamp(14rem, 35vw, 21rem); }
summary { cursor: pointer; padding-block: .75rem; font-weight: 600; }
table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
caption { text-align: left; padding: .5rem 0; }
th, td { padding: .6rem; border-bottom: 1px solid #d6e1da; text-align: left; }
th:last-child, td { text-align: right; }
</style>
