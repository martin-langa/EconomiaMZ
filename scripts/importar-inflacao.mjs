import { readFile, writeFile, rename } from "node:fs/promises"
import { pathToFileURL } from "node:url"

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

async function importar() {
  const ficheiro = new URL('../public/dados/inflacao.json', import.meta.url)
  const copia = JSON.parse(await readFile(ficheiro, 'utf8'))
  const resposta = await fetch(url, { signal: AbortSignal.timeout(12000) })
  if (!resposta.ok) throw new Error(`API devolveu HTTP ${resposta.status}.`)
  copia.observacoes = normalizarSerie(await resposta.json())
  copia.metadados.url_api = url.href
  copia.metadados.data_recolha_api = new Date().toISOString().slice(0, 10)
  const temporario = new URL(`inflacao.${process.pid}.tmp`, ficheiro)
  await writeFile(temporario, JSON.stringify(copia, null, 2) + '\n')
  await rename(temporario, ficheiro)
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await importar()
}
