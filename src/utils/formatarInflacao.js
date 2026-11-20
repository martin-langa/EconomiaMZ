const percentagem = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const diferenca = new Intl.NumberFormat('pt-PT', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
})

export function formatarTaxa(valor) {
  return `${percentagem.format(valor)} %`
}

export function formatarPontos(valor) {
  return `${diferenca.format(valor)} p.p.`
}
