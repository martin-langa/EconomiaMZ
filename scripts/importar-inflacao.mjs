const inicio = 2021
const fim = 2025
const indicador = 'FP.CPI.TOTL.ZG'
const url = new URL(`https://api.worldbank.org/v2/country/MOZ/indicator/${indicador}`)
url.search = new URLSearchParams({ format: 'json', date: `${inicio}:${fim}`, source: '2' })

export function normalizarSerie(resposta) {
  const [pagina, linhas] = resposta
  if (Number(pagina?.pages) !== 1 || !Array.isArray(linhas)) throw new Error('Resposta incompleta.')
  const anual = new Map()
  for (const registo of linhas) {
    const ano = Number(registo.date)
    if (registo.countryiso3code !== 'MOZ' || registo.indicator?.id !== indicador ||
        !Number.isInteger(ano) || ano < inicio || ano > fim || anual.has(ano) ||
        !Number.isFinite(registo.value)) {
      throw new Error(`Observação inválida para ${registo.date}.`)
    }
    anual.set(ano, { ano, valor: Number(registo.value.toFixed(5)) })
  }
  if (anual.size !== fim - inicio + 1) throw new Error('Faltam anos no período do projecto.')
  return [...anual.values()].sort((a, b) => a.ano - b.ano)
}
