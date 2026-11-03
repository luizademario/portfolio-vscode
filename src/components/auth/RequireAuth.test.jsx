// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getSession, onAuthChange } from '../../services/authService.js'
import RequireAuth from './RequireAuth.jsx'

vi.mock('../../services/authService.js', () => ({
  getSession: vi.fn(),
  onAuthChange: vi.fn(),
  signOut: vi.fn(),
}))

let authListener
beforeEach(() => {
  authListener = undefined
  vi.mocked(onAuthChange).mockImplementation((callback) => {
    authListener = callback
    return () => {}
  })
})
afterEach(cleanup)

function renderProtected() {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <p>Conteúdo secreto do dono</p>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<p>Tela de login</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RequireAuth: bloqueio do dashboard sem login', () => {
  it('redireciona para /login quem não está logado e não mostra o conteúdo', async () => {
    vi.mocked(getSession).mockResolvedValue(null)
    renderProtected()

    await screen.findByText('Tela de login')
    expect(screen.queryByText('Conteúdo secreto do dono')).toBeNull()
  })

  it('não mostra o conteúdo enquanto ainda verifica o login', () => {
    vi.mocked(getSession).mockReturnValue(new Promise(() => {}))
    renderProtected()

    expect(screen.getByText('Verificando acesso…')).toBeTruthy()
    expect(screen.queryByText('Conteúdo secreto do dono')).toBeNull()
    expect(screen.queryByText('Tela de login')).toBeNull()
  })

  it('mostra o conteúdo para quem está logado', async () => {
    vi.mocked(getSession).mockResolvedValue({ user: { id: 'u1' } })
    renderProtected()

    await screen.findByText('Conteúdo secreto do dono')
    expect(screen.queryByText('Tela de login')).toBeNull()
  })

  it('volta para o login quando a sessão termina', async () => {
    vi.mocked(getSession).mockResolvedValue({ user: { id: 'u1' } })
    renderProtected()
    await screen.findByText('Conteúdo secreto do dono')

    act(() => authListener(null))

    await waitFor(() => expect(screen.getByText('Tela de login')).toBeTruthy())
    expect(screen.queryByText('Conteúdo secreto do dono')).toBeNull()
  })
})
