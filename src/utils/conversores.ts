const formatoReal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const gerarDatePorString = (dataString: string | null) => {
  if (dataString && dataString.trim().length !== 0) {
    const [dia, mes, ano] = dataString.split('/')
    return `${ano}-${mes}-${dia}`
  }
  return null
}

export const gerarStringPorDate = (dataNascimento: string | null) => {
  if (dataNascimento) {
    const [ano, mes, dia] = dataNascimento.split('-')
    return `${dia}/${mes}/${ano}`
  }
  return ''
}

export const gerarStringReal = (valor: number) => formatoReal.format(valor)

export const gerarDoublePorValorMonetario = (valor: string): number =>
  parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'))

export const gerarStringPorcentagemPorNumeroInteiro = (valor: number): string => `${valor}%`

export const gerarDoublePorValorPorcentagem = (valor: string): number => {
  const valorSemPorcentagem = valor.replace('%', '')
  return parseFloat(valorSemPorcentagem)
}
