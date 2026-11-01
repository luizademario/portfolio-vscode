const formatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

// '2026-10-20T12:00:00Z' -> '20 de out. de 2026'. Texto vazio se a data for inválida.
export function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : formatter.format(date)
}
