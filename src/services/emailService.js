import { send } from '@emailjs/browser'
import { formatarPontos, formatarTaxa } from '../utils/formatarInflacao.js'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

export const modoSimulado = !serviceId && !templateId && !publicKey

export function criarResumo({ dados, base, comparado, variacaoPontosPercentuais, fonte }) {
  const linhas = [
    'Inflação anual de Moçambique',
    'Taxas anuais do período seleccionado',
    ...dados.map(({ ano, valor }) => `${ano}: ${formatarTaxa(valor)}`),
  ]

  if (base && comparado && Number.isFinite(variacaoPontosPercentuais)) {
    linhas.push('', `Diferença de ${base.ano} (${formatarTaxa(base.valor)}) para ${comparado.ano} (${formatarTaxa(comparado.valor)}): ${formatarPontos(variacaoPontosPercentuais)}`)
  }

  linhas.push('', 'Dados históricos. Fonte: Banco Mundial via FRED.', fonte, 'Data de consulta: 20/11/2026.')
  return linhas.join('\n')
}

export async function enviarResumo(destinatario, resumo) {
  if (modoSimulado) return
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Configuração EmailJS incompleta.')
  }

  await send(serviceId, templateId, { to_email: destinatario, resumo }, { publicKey })
}
