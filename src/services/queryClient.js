import { QueryClient } from '@tanstack/react-query'

// Configuração do cache. Os repositórios mudam pouco: ficam "frescos" por 10 minutos
// (navegar entre páginas não gera requisição) e a aba voltar ao foco não refaz a busca.
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) =>
          failureCount < 1 && error?.kind !== 'rate-limit' && error?.kind !== 'not-found',
      },
    },
  })
}
