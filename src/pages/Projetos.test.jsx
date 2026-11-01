// @vitest-environment jsdom
import { cleanup, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { jsonResponse, reposDaConta, reposSemTopico } from '../test/githubFixtures.js'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import Home from './Home.jsx'
import ProjetoDetalhe from './ProjetoDetalhe.jsx'
import Projetos from './Projetos.jsx'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function stubApi(response) {
  const fetchMock = vi.fn().mockImplementation(async () => response())
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('página Projetos', () => {
  it('mostra o esqueleto e depois só os dois repositórios com o tópico', async () => {
    stubApi(() => jsonResponse(reposDaConta))
    renderWithProviders(<Projetos />)

    expect(screen.getByText('Carregando projetos…')).toBeTruthy()

    await screen.findByRole('link', { name: 'novo-tv-time' })
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Vinheria_Agnello' })).toBeTruthy()
    expect(screen.queryByText('portfolio-vscode')).toBeNull()
    expect(screen.queryByText('techstore-base')).toBeNull()
    expect(screen.queryByText('exercicio-1')).toBeNull()
  })

  it('mostra a lista vazia quando nenhum repositório tem o tópico', async () => {
    stubApi(() => jsonResponse(reposSemTopico))
    renderWithProviders(<Projetos />)

    await screen.findByText('Lista vazia')
    expect(screen.getByText(/Nenhum repositório público com o tópico/)).toBeTruthy()
    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
  })

  it('mostra o erro de limite de requisições', async () => {
    stubApi(() =>
      jsonResponse(
        { message: 'API rate limit exceeded' },
        { status: 403, headers: { 'x-ratelimit-remaining': '0' } },
      ),
    )
    renderWithProviders(<Projetos />)

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('Limite de requisições atingido')
  })

  it('tenta de novo e se recupera depois do erro', async () => {
    let calls = 0
    stubApi(() => {
      calls += 1
      return calls === 1 ? jsonResponse({}, { status: 404 }) : jsonResponse(reposDaConta)
    })
    renderWithProviders(<Projetos />)

    const retry = await screen.findByRole('button', { name: 'Tentar de novo' })
    retry.click()

    await screen.findByRole('link', { name: 'novo-tv-time' })
    expect(calls).toBe(2)
  })
})

describe('página inicial', () => {
  it('mostra os destaques provisórios vindos da API', async () => {
    stubApi(() => jsonResponse(reposDaConta))
    renderWithProviders(<Home />)

    await screen.findByRole('link', { name: 'novo-tv-time' })
    expect(screen.getByRole('link', { name: 'Vinheria_Agnello' })).toBeTruthy()
  })

  it('mostra mensagem de lista vazia nos destaques', async () => {
    stubApi(() => jsonResponse(reposSemTopico))
    renderWithProviders(<Home />)

    await screen.findByText('Nenhum projeto em destaque por enquanto.')
  })
})

describe('página de detalhes', () => {
  const detail = (client, name = 'novo-tv-time') =>
    renderWithProviders(<ProjetoDetalhe />, {
      route: `/projetos/${name}`,
      path: 'projetos/:nome',
      client,
    })

  it('mostra os dados reais do repositório e abre direto pelo link', async () => {
    stubApi(() => jsonResponse(reposDaConta))
    detail()

    expect(screen.getByText('Carregando projeto…')).toBeTruthy()
    await screen.findByText('Descrição de novo-tv-time')
    expect(screen.getByText('JavaScript')).toBeTruthy()
    expect(screen.getByRole('link', { name: /Ver no GitHub/ }).getAttribute('href')).toBe(
      'https://github.com/luizademario/novo-tv-time',
    )
  })

  it('não repete a requisição ao ir da lista para o detalhe', async () => {
    const fetchMock = stubApi(() => jsonResponse(reposDaConta))

    const first = renderWithProviders(<Projetos />)
    await screen.findByRole('link', { name: 'novo-tv-time' })
    first.unmount()

    detail(first.queryClient)
    await screen.findByText('Descrição de novo-tv-time')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('avisa quando o projeto não está na lista do portfólio', async () => {
    stubApi(() => jsonResponse(reposDaConta))
    detail(undefined, 'portfolio-vscode')

    await screen.findByText('Projeto não encontrado')
    expect(screen.getByRole('link', { name: 'Voltar para projetos' })).toBeTruthy()
  })

  it('mostra o erro da API na página do projeto', async () => {
    stubApi(() => jsonResponse({}, { status: 500 }))
    detail()

    await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy(), { timeout: 4000 })
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeTruthy()
  })
})
