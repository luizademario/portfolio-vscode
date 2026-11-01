// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import RepoList from './RepoList.jsx'

afterEach(cleanup)

const repos = [
  {
    id: 1,
    name: 'novo-tv-time',
    description: 'App de séries',
    language: 'JavaScript',
    pushedAt: '2026-10-20T12:00:00Z',
  },
  {
    id: 2,
    name: 'Vinheria_Agnello',
    description: '',
    language: '',
    pushedAt: '2026-08-05T12:00:00Z',
  },
]

function renderList(props) {
  return render(
    <MemoryRouter>
      <RepoList {...props} />
    </MemoryRouter>,
  )
}

describe('RepoList', () => {
  it('mostra esqueletos e avisa o carregamento enquanto busca', () => {
    renderList({ isLoading: true, skeletonCount: 3 })
    expect(screen.getByRole('status').getAttribute('aria-busy')).toBe('true')
    expect(screen.getByText('Carregando projetos…')).toBeTruthy()
    expect(screen.queryByRole('article')).toBeNull()
  })

  it('mostra os cards com link para a página de cada projeto', () => {
    renderList({ repos })
    expect(screen.getAllByRole('article')).toHaveLength(2)
    const link = screen.getByRole('link', { name: 'novo-tv-time' })
    expect(link.getAttribute('href')).toBe('/projetos/novo-tv-time')
    expect(screen.getByText('Sem descrição no GitHub.')).toBeTruthy()
  })

  it('respeita o limite de cards', () => {
    renderList({ repos, limit: 1 })
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })

  it('mostra a mensagem de lista vazia', () => {
    renderList({ repos: [], emptyText: 'Nenhum repositório com o tópico “portfolio”.' })
    expect(screen.getByText('Lista vazia')).toBeTruthy()
    expect(screen.getByText('Nenhum repositório com o tópico “portfolio”.')).toBeTruthy()
    expect(screen.queryByRole('article')).toBeNull()
  })

  it('mostra o erro de limite de requisições e permite tentar de novo', () => {
    const onRetry = vi.fn()
    renderList({ error: { kind: 'rate-limit' }, onRetry })
    expect(screen.getByRole('alert').textContent).toContain('Limite de requisições atingido')
    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
