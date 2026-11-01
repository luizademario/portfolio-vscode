import { afterEach, describe, expect, it, vi } from 'vitest'
import { jsonResponse, reposDaConta, reposSemTopico } from '../test/githubFixtures.js'
import { fetchPortfolioRepos, filterPortfolioRepos, GithubError } from './githubService.js'

afterEach(() => vi.unstubAllGlobals())

const config = {
  githubUser: 'luizademario',
  projectTopic: 'portfolio',
  excludedRepos: ['portfolio-vscode', 'luizademario'],
}

describe('filterPortfolioRepos', () => {
  it('mostra só os dois repositórios com o tópico, sem fork', () => {
    expect(reposDaConta).toHaveLength(17)
    const names = filterPortfolioRepos(reposDaConta, config).map((repo) => repo.name)
    expect(names.sort()).toEqual(['Vinheria_Agnello', 'novo-tv-time'])
  })

  it('ordena pelo push mais recente primeiro', () => {
    const names = filterPortfolioRepos(reposDaConta, config).map((repo) => repo.name)
    expect(names).toEqual(['novo-tv-time', 'Vinheria_Agnello'])
  })

  it('exclui o repositório do portfólio e o de perfil mesmo com o tópico', () => {
    const repos = reposDaConta.map((repo) =>
      ['portfolio-vscode', 'luizademario'].includes(repo.name)
        ? { ...repo, topics: ['portfolio'] }
        : repo,
    )
    const names = filterPortfolioRepos(repos, config).map((repo) => repo.name)
    expect(names).not.toContain('portfolio-vscode')
    expect(names).not.toContain('luizademario')
  })

  it('exclui forks e privados mesmo com o tópico', () => {
    const repos = [
      { ...reposDaConta[0], name: 'um-fork', fork: true },
      { ...reposDaConta[0], name: 'um-privado', private: true },
    ]
    expect(filterPortfolioRepos(repos, config)).toEqual([])
  })

  it('devolve lista vazia quando nenhum repositório tem o tópico', () => {
    expect(filterPortfolioRepos(reposSemTopico, config)).toEqual([])
  })

  it('entrega só os campos usados pelo site', () => {
    const [first] = filterPortfolioRepos(reposDaConta, config)
    expect(first).toMatchObject({
      name: 'novo-tv-time',
      language: 'JavaScript',
      htmlUrl: 'https://github.com/luizademario/novo-tv-time',
      pushedAt: '2026-10-20T12:00:00Z',
    })
  })
})

describe('fetchPortfolioRepos', () => {
  it('faz uma requisição à API e devolve os projetos filtrados', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(reposDaConta))
    vi.stubGlobal('fetch', fetchMock)

    const projects = await fetchPortfolioRepos({ config })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(String(fetchMock.mock.calls[0][0])).toContain('/users/luizademario/repos')
    expect(projects.map((repo) => repo.name)).toEqual(['novo-tv-time', 'Vinheria_Agnello'])
  })

  it('classifica 403 com limite zerado como rate-limit e informa quando volta', async () => {
    const reset = Math.floor(Date.now() / 1000) + 600
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(
          { message: 'API rate limit exceeded' },
          {
            status: 403,
            headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(reset) },
          },
        ),
      ),
    )

    const error = await fetchPortfolioRepos({ config }).catch((err) => err)

    expect(error).toBeInstanceOf(GithubError)
    expect(error.kind).toBe('rate-limit')
    expect(error.resetAt.getTime()).toBe(reset * 1000)
  })

  it('classifica 404 como not-found', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, { status: 404 })))
    const error = await fetchPortfolioRepos({ config }).catch((err) => err)
    expect(error.kind).toBe('not-found')
  })

  it('classifica outros status como http', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, { status: 500 })))
    const error = await fetchPortfolioRepos({ config }).catch((err) => err)
    expect(error.kind).toBe('http')
    expect(error.status).toBe(500)
  })

  it('classifica falha de rede como network', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    const error = await fetchPortfolioRepos({ config }).catch((err) => err)
    expect(error.kind).toBe('network')
  })

  it('não esconde um cancelamento da requisição', async () => {
    const abort = new DOMException('cancelado', 'AbortError')
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abort))
    await expect(fetchPortfolioRepos({ config })).rejects.toBe(abort)
  })

  it('avisa quando a resposta não é uma lista', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({ ok: true })))
    const error = await fetchPortfolioRepos({ config }).catch((err) => err)
    expect(error.kind).toBe('invalid')
  })

  it('avisa quando a resposta não traz o campo topics, em vez de mostrar lista vazia', async () => {
    const semCampo = reposDaConta.map(({ topics, ...rest }) => rest) // eslint-disable-line no-unused-vars
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(semCampo)))
    const error = await fetchPortfolioRepos({ config }).catch((err) => err)
    expect(error.kind).toBe('invalid')
    expect(error.message).toContain('topics')
  })

  it('aceita uma conta sem nenhum repositório', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse([])))
    await expect(fetchPortfolioRepos({ config })).resolves.toEqual([])
  })
})
