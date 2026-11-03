// Título e texto para os erros do dashboard.
export function describeDashboardError(error) {
  if (error?.kind === 'denied') {
    return {
      title: 'Sem permissão',
      text: 'Sua sessão expirou ou esta conta não é a do dono do site. Saia e entre de novo.',
    }
  }
  if (error?.kind === 'config') {
    return { title: 'Não configurado', text: 'Faltam as variáveis do Supabase neste site.' }
  }
  return {
    title: 'Não foi possível carregar',
    text: 'O banco de dados não respondeu como esperado. Tente de novo em instantes.',
  }
}
