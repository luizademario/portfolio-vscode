// @vitest-environment jsdom
import { QueryClientProvider } from '@tanstack/react-query'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getSession, onAuthChange, signOut } from '../services/authService.js'
import {
  addFeatured,
  DashboardError,
  fetchMessages,
  removeFeatured,
  setMessageAnswered,
} from '../services/dashboardService.js'
import { fetchFeaturedNames } from '../services/featuredService.js'
import { createQueryClient } from '../services/queryClient.js'
import { jsonResponse, reposDaConta } from '../test/githubFixtures.js'
import Dashboard from './Dashboard.jsx'

vi.mock('../services/authService.js', () => ({
  getSession: vi.fn(),
  onAuthChange: vi.fn(() => () => {}),
  signOut: vi.fn(),
}))
vi.mock('../services/dashboardService.js', async () => {
  class DashboardError extends Error {
    constructor(kind, message) {
      super(message)
      this.kind = kind
    }
  }
  return {
    DashboardError,
    fetchMessages: vi.fn(),
    setMessageAnswered: vi.fn(),
    addFeatured: vi.fn(),
    removeFeatured: vi.fn(),
  }
})
vi.mock('../services/featuredService.js', () => ({ fetchFeaturedNames: vi.fn() }))

const messages = [
  {
    id: 1,
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    message: 'Gostei muito do seu portfólio!',
    answered: false,
    created_at: '2026-10-20T12:00:00Z',
  },
  {
    id: 2,
    name: 'Bruno Lima',
    email: 'bruno@exemplo.com',
    message: 'Podemos conversar sobre uma vaga?',
    answered: true,
    created_at: '2026-10-10T12:00:00Z',
  },
]

beforeEach(() => {
  vi.mocked(getSession).mockResolvedValue({ user: { id: 'dono' } })
  vi.mocked(onAuthChange).mockReturnValue(() => {})
  vi.mocked(fetchMessages).mockResolvedValue(messages)
  vi.mocked(fetchFeaturedNames).mockResolvedValue(['Vinheria_Agnello'])
  vi.mocked(setMessageAnswered).mockResolvedValue()
  vi.mocked(addFeatured).mockResolvedValue()
  vi.mocked(removeFeatured).mockResolvedValue()
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation(async () => jsonResponse(reposDaConta)),
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

function renderDashboard() {
  return render(
    <QueryClientProvider client={createQueryClient()}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<p>Tela de login</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('Dashboard: acesso', () => {
  it('sem login vai para o login e nem tenta ler as mensagens', async () => {
    vi.mocked(getSession).mockResolvedValue(null)
    renderDashboard()

    await screen.findByText('Tela de login')
    expect(fetchMessages).not.toHaveBeenCalled()
    expect(screen.queryByText('Ana Souza')).toBeNull()
  })
})

describe('Dashboard: mensagens', () => {
  it('mostra o esqueleto e depois as mensagens, contando as sem resposta', async () => {
    renderDashboard()

    await screen.findByText('Carregando mensagens…')
    await screen.findByText('Ana Souza')
    expect(screen.getByText('Bruno Lima')).toBeTruthy()
    expect(screen.getByText('Mensagens (1 sem resposta)')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'ana@exemplo.com' })).toBeTruthy()
  })

  it('marca como respondida e a lista é atualizada', async () => {
    renderDashboard()
    await screen.findByText('Ana Souza')

    vi.mocked(fetchMessages).mockResolvedValue([{ ...messages[0], answered: true }, messages[1]])
    fireEvent.click(screen.getByRole('button', { name: 'Marcar como respondida' }))

    await waitFor(() => expect(setMessageAnswered).toHaveBeenCalledWith(1, true))
    await screen.findByText('Mensagens (0 sem resposta)')
  })

  it('permite desmarcar uma mensagem respondida', async () => {
    renderDashboard()
    await screen.findByText('Bruno Lima')

    fireEvent.click(screen.getByRole('button', { name: 'Marcar como não respondida' }))

    await waitFor(() => expect(setMessageAnswered).toHaveBeenCalledWith(2, false))
  })

  it('mostra a lista vazia', async () => {
    vi.mocked(fetchMessages).mockResolvedValue([])
    renderDashboard()

    await screen.findByText('Ainda não chegou nenhuma mensagem.')
  })

  it('mostra o erro ao carregar e permite tentar de novo', async () => {
    vi.mocked(fetchMessages).mockRejectedValueOnce(new DashboardError('config', 'x'))
    renderDashboard()

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('Não configurado')

    fireEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    await screen.findByText('Ana Souza')
  })

  it('avisa quando o banco nega a permissão (RLS)', async () => {
    vi.mocked(fetchMessages).mockRejectedValue(new DashboardError('denied', 'x'))
    renderDashboard()

    expect((await screen.findByRole('alert')).textContent).toContain('Sem permissão')
  })

  it('mostra erro quando salvar falha', async () => {
    vi.mocked(setMessageAnswered).mockRejectedValue(new DashboardError('denied', 'x'))
    renderDashboard()
    await screen.findByText('Ana Souza')

    fireEvent.click(screen.getByRole('button', { name: 'Marcar como respondida' }))

    expect((await screen.findByRole('alert')).textContent).toContain('Sem permissão')
  })
})

describe('Dashboard: destaques da Home', () => {
  it('mostra os projetos com os destaques já marcados', async () => {
    renderDashboard()

    const novo = await screen.findByRole('checkbox', { name: 'novo-tv-time' })
    expect(novo.checked).toBe(false)
    expect(screen.getByRole('checkbox', { name: 'Vinheria_Agnello' }).checked).toBe(true)
    expect(screen.queryByRole('checkbox', { name: 'portfolio-vscode' })).toBeNull()
  })

  it('marca um destaque', async () => {
    renderDashboard()
    fireEvent.click(await screen.findByRole('checkbox', { name: 'novo-tv-time' }))

    await waitFor(() => expect(addFeatured).toHaveBeenCalledWith('novo-tv-time'))
  })

  it('desmarca um destaque', async () => {
    renderDashboard()
    fireEvent.click(await screen.findByRole('checkbox', { name: 'Vinheria_Agnello' }))

    await waitFor(() => expect(removeFeatured).toHaveBeenCalledWith('Vinheria_Agnello'))
  })
})

describe('Dashboard: sair', () => {
  it('encerra a sessão ao clicar em Sair', async () => {
    renderDashboard()
    await screen.findByText('Ana Souza')

    fireEvent.click(screen.getByRole('button', { name: 'Sair' }))

    await waitFor(() => expect(signOut).toHaveBeenCalledTimes(1))
  })
})
