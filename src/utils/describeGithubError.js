function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

// Converte o erro da API em título + texto para o visitante.
export function describeGithubError(error) {
  switch (error?.kind) {
    case 'rate-limit':
      return {
        title: 'Limite de requisições atingido',
        text: error.resetAt
          ? `A API do GitHub limita as consultas. Tente novamente depois das ${formatTime(error.resetAt)}.`
          : 'A API do GitHub limita as consultas. Tente novamente em alguns minutos.',
      }
    case 'network':
      return {
        title: 'Sem conexão com o GitHub',
        text: 'Não consegui acessar o GitHub. Verifique sua internet e tente de novo.',
      }
    case 'invalid':
      return {
        title: 'Resposta inesperada do GitHub',
        text: 'Os dados vieram em um formato que o site não reconhece. Tente de novo mais tarde.',
      }
    default:
      return {
        title: 'Não foi possível carregar os projetos',
        text: 'O GitHub não respondeu como esperado. Tente de novo em instantes.',
      }
  }
}
