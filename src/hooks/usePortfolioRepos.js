import { useQuery } from '@tanstack/react-query'
import { portfolio } from '../config/portfolio.js'
import { fetchPortfolioRepos } from '../services/githubService.js'

const queryKey = ['github', 'repos', portfolio.githubUser]

function useReposQuery(options = {}) {
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchPortfolioRepos({ signal }),
    ...options,
  })
}

// Lista de projetos. Todas as páginas usam a mesma chave, então há uma requisição só.
export function usePortfolioRepos() {
  return useReposQuery()
}

// Um projeto pelo nome. Lê do mesmo cache da lista: não faz requisição extra e só devolve
// repositórios que passam nas regras do site. `data` é undefined enquanto carrega e
// `null` quando carregou e o projeto não existe na lista.
export function usePortfolioRepo(name) {
  return useReposQuery({
    select: (repos) => repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()) ?? null,
  })
}
