import { portfolio } from '../config/portfolio.js'

const apiUrl = 'https://api.github.com'

// Erro com um "tipo" para a interface escolher a mensagem certa.
// kind: 'rate-limit' | 'not-found' | 'network' | 'http' | 'invalid'
export class GithubError extends Error {
  constructor(kind, message, extra = {}) {
    super(message)
    this.name = 'GithubError'
    this.kind = kind
    this.status = extra.status
    this.resetAt = extra.resetAt
  }
}

function readResetAt(response) {
  const seconds = Number(response.headers.get('x-ratelimit-reset'))
  return Number.isFinite(seconds) && seconds > 0 ? new Date(seconds * 1000) : undefined
}

async function toError(response) {
  const remaining = response.headers.get('x-ratelimit-remaining')
  let message = ''
  try {
    message = String((await response.json())?.message ?? '')
  } catch {
    // corpo sem JSON: segue só com o status
  }

  const limited =
    response.status === 429 ||
    (response.status === 403 && (remaining === '0' || /rate limit/i.test(message)))
  if (limited) {
    return new GithubError('rate-limit', 'Limite de requisições da API do GitHub atingido.', {
      status: response.status,
      resetAt: readResetAt(response),
    })
  }
  if (response.status === 404) {
    return new GithubError('not-found', 'Usuário não encontrado no GitHub.', {
      status: 404,
    })
  }
  return new GithubError('http', `A API do GitHub respondeu com o status ${response.status}.`, {
    status: response.status,
  })
}

// Só os campos que o site usa. `pushed_at` (último push) reflete melhor a atividade do que
// `updated_at`, que muda até com uma estrela.
export function toProject(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description ?? '',
    language: repo.language ?? '',
    topics: repo.topics ?? [],
    stars: repo.stargazers_count ?? 0,
    homepage: repo.homepage ?? '',
    htmlUrl: repo.html_url,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at ?? repo.updated_at,
  }
}

// Regras do site (decisão D6): público, não é fork, tem o tópico e não está na lista de exclusão.
// Sem nenhum nome de projeto fixo no código.
export function filterPortfolioRepos(repos, config = portfolio) {
  const excluded = config.excludedRepos.map((name) => name.toLowerCase())
  const topic = config.projectTopic.toLowerCase()

  return repos
    .filter(
      (repo) =>
        !repo.private &&
        !repo.fork &&
        !excluded.includes(repo.name.toLowerCase()) &&
        (repo.topics ?? []).some((item) => item.toLowerCase() === topic),
    )
    .map(toProject)
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))
}

// Uma única requisição traz os repositórios do usuário (até 100). O filtro é feito aqui.
export async function fetchPortfolioRepos({ signal, config = portfolio } = {}) {
  const url = `${apiUrl}/users/${config.githubUser}/repos?per_page=100&type=owner&sort=pushed`

  let response
  try {
    response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })
  } catch (error) {
    if (error?.name === 'AbortError') throw error
    throw new GithubError('network', 'Não foi possível acessar a API do GitHub.')
  }

  if (!response.ok) throw await toError(response)

  const data = await response.json().catch(() => null)
  if (!Array.isArray(data)) {
    throw new GithubError('invalid', 'A resposta da API do GitHub veio em um formato inesperado.')
  }

  // Sem este aviso, a falta do campo `topics` pareceria "nenhum projeto" e esconderia o problema.
  if (data.length > 0 && !data.some((repo) => Array.isArray(repo.topics))) {
    throw new GithubError('invalid', 'A resposta da API do GitHub não trouxe o campo topics.')
  }

  return filterPortfolioRepos(data, config)
}
