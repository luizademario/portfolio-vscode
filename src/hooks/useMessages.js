import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchMessages, setMessageAnswered } from '../services/dashboardService.js'

const messagesKey = ['dashboard', 'messages']

export function useMessages() {
  return useQuery({
    queryKey: messagesKey,
    queryFn: fetchMessages,
    retry: (count, error) => count < 1 && error?.kind === 'unknown',
  })
}

// Marca/desmarca como respondida e atualiza a lista. `variables` mostra qual mensagem está salvando.
export function useSetAnswered() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, answered }) => setMessageAnswered(id, answered),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: messagesKey }),
  })
}
