import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedNames } from '../services/featuredService.js'
import { portfolio } from '../config/portfolio.js'
import { selectFeatured } from '../utils/selectFeatured.js'
import { usePortfolioRepos } from './usePortfolioRepos.js'

export const featuredKey = ['featured', 'names']

// Nomes marcados como destaque. Se o banco falhar, a Home não quebra: usa a lista provisória.
export function useFeaturedNames() {
  return useQuery({
    queryKey: featuredKey,
    queryFn: ({ signal }) => fetchFeaturedNames({ signal }),
    retry: false,
  })
}

// Projetos da Home: os destaques do dono ou, sem nenhum, os primeiros da lista (D6).
export function useHomeProjects() {
  const repos = usePortfolioRepos()
  const featured = useFeaturedNames()

  return {
    projects: selectFeatured(repos.data ?? [], featured.data ?? [], portfolio.featuredCount),
    isPending: repos.isPending || featured.isPending,
    error: repos.error,
    refetch: repos.refetch,
  }
}
