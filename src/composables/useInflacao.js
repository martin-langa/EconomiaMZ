import { computed, onMounted, ref } from 'vue'

const FONTE_PADRAO = 'https://fred.stlouisfed.org/series/FPCPITOTLZGMOZ'

export function useInflacao() {
  const dados = ref([])
  const fonte = ref(FONTE_PADRAO)
  const carregando = ref(true)
  const erro = ref('')

  const ultimoDado = computed(() => dados.value.at(-1) ?? null)
  const dadoAnterior = computed(() => dados.value.at(-2) ?? null)
  const variacaoPontosPercentuais = computed(() => (
    ultimoDado.value && dadoAnterior.value
      ? ultimoDado.value.valor - dadoAnterior.value.valor
      : null
  ))

  async function carregarInflacao() {
    carregando.value = true
    erro.value = ''

    try {
      const url = `${import.meta.env.BASE_URL}dados/inflacao.json`
      const resposta = await fetch(url)

      if (!resposta.ok) {
        throw new Error(`O servidor respondeu com o estado ${resposta.status}.`)
      }

      const conjunto = await resposta.json()
      if (!Array.isArray(conjunto.observacoes)) {
        throw new Error('O ficheiro de dados não contém uma lista de observações válida.')
      }

      const anos = new Set()
      const observacoes = conjunto.observacoes.map((observacao, indice) => {
        const ano = Number(observacao?.ano)
        const valor = Number(observacao?.valor)

        if (!Number.isInteger(ano) || !Number.isFinite(valor)) {
          throw new Error(`A observação ${indice + 1} contém um ano ou valor inválido.`)
        }
        if (anos.has(ano)) {
          throw new Error(`O ficheiro contém mais do que uma observação para ${ano}.`)
        }

        anos.add(ano)
        return { ano, valor }
      })

      dados.value = observacoes.sort((a, b) => a.ano - b.ano)
      fonte.value = conjunto.metadados?.url_fonte || FONTE_PADRAO
    } catch (erroCarregamento) {
      dados.value = []
      erro.value = erroCarregamento instanceof Error
        ? erroCarregamento.message
        : 'Ocorreu um erro ao carregar os dados.'
    } finally {
      carregando.value = false
    }
  }

  onMounted(carregarInflacao)

  return {
    dados,
    fonte,
    carregando,
    erro,
    ultimoDado,
    dadoAnterior,
    variacaoPontosPercentuais,
    carregarInflacao,
  }
}
