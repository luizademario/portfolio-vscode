import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addFeatured, removeFeatured } from '../services/dashboardService.js'
import { featuredKey } from './useFeatured.js'

// Marca ou desmarca um projeto como destaque. `variables` mostra qual está salvando.
export function useToggleFeatured() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, featured }) => (featured ? addFeatured(name) : removeFeatured(name)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: featuredKey }),
  })
}
