<script setup>
import { computed, ref, watch } from 'vue'
import FiltroPeriodo from './FiltroPeriodo.vue'
import GraficoInflacao from './GraficoInflacao.vue'
import { formatarPontos, formatarTaxa } from '../utils/formatarInflacao.js'

const props = defineProps({
  dados: { type: Array, required: true },
  fonte: { type: String, required: true },
})
const anos = computed(() => props.dados.map(dado => dado.ano))
const inicio = ref()
const fim = ref()
watch(anos, disponiveis => {
  if (!disponiveis.includes(inicio.value)) inicio.value = disponiveis[0]
  if (!disponiveis.includes(fim.value)) fim.value = disponiveis.at(-1)
}, { immediate: true })

const periodo = computed(() => props.dados.filter(({ ano }) => ano >= inicio.value && ano <= fim.value))
const anoBase = ref()
const anoComparado = ref()
watch(periodo, registos => {
  if (!registos.some(dado => dado.ano === anoBase.value)) anoBase.value = registos[0]?.ano
  if (!registos.some(dado => dado.ano === anoComparado.value) || anoComparado.value === anoBase.value) {
    anoComparado.value = registos.findLast(dado => dado.ano !== anoBase.value)?.ano
  }
}, { immediate: true })

function seleccionarBase(ano) {
  if (ano === anoComparado.value) anoComparado.value = anoBase.value
  anoBase.value = ano
}
function seleccionarComparado(ano) {
  if (ano === anoBase.value) anoBase.value = anoComparado.value
  anoComparado.value = ano
}
const base = computed(() => periodo.value.find(dado => dado.ano === anoBase.value))
const comparado = computed(() => periodo.value.find(dado => dado.ano === anoComparado.value))
const diferenca = computed(() => comparado.value && base.value
  ? comparado.value.valor - base.value.valor
  : null)
</script>

<template>
  <section v-if="periodo.length" class="analise">
    <h2>Evolução da inflação</h2>
    <FiltroPeriodo v-model:inicio="inicio" v-model:fim="fim" :anos="anos" />
    <GraficoInflacao :dados="periodo" />
    <section class="comparacao">
      <h2>Comparar dois anos</h2>
      <template v-if="base && comparado">
        <div class="escolhas">
          <label>
            Ano de referência
            <select :value="anoBase" @change="seleccionarBase(Number($event.target.value))">
              <option v-for="dado in periodo" :key="dado.ano" :value="dado.ano">{{ dado.ano }}</option>
            </select>
            <strong>{{ formatarTaxa(base.valor) }}</strong>
          </label>
          <label>
            Ano de comparação
            <select :value="anoComparado" @change="seleccionarComparado(Number($event.target.value))">
              <option v-for="dado in periodo" :key="dado.ano" :value="dado.ano">{{ dado.ano }}</option>
            </select>
            <strong>{{ formatarTaxa(comparado.valor) }}</strong>
          </label>
        </div>
        <p aria-live="polite">
          Diferença em pontos percentuais de {{ anoBase }} para {{ anoComparado }}:
          <strong>{{ formatarPontos(diferenca) }}</strong>
        </p>
      </template>
      <p v-else>Alargue o período para comparar dois anos com dados.</p>
    </section>
    <slot name="resumo" :dados="periodo" :base="base" :comparado="comparado"
      :variacao-pontos-percentuais="diferenca" :fonte="fonte" />
  </section>
</template>

<style scoped>
.analise { display: grid; gap: 1.3rem; min-width: 0; }
.comparacao { border-top: 1px solid #c8d8ce; padding-top: 1.5rem; }
.escolhas { display: flex; flex-wrap: wrap; gap: 1rem 2rem; margin: 1rem 0; }
.escolhas label { display: grid; gap: .4rem; }
select { min-height: 2.75rem; padding: .4rem .8rem; font: inherit; color: #18382f; background: #fff; border: 1px solid #8da59c; border-radius: .4rem; }
.escolhas strong { font-size: 1.5rem; font-variant-numeric: tabular-nums; }
</style>
