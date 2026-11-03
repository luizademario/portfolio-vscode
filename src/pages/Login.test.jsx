// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getSession, onAuthChange } from '../services/authService.js'
import Login from './Login.jsx'

vi.mock('../services/authService.js', () => ({
  getSession: vi.fn(),
  onAuthChange: vi.fn(() => () => {}),
  signOut: vi.fn(),
  signIn: vi.fn(),
}))

beforeEach(() => {
  vi.mocked(onAuthChange).mockReturnValue(() => {})
})
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

function renderLogin(login) {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/dashboard" element={<p>Dashboard do dono</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('página de login', () => {
  it('mostra o formulário para quem não está logado e leva ao dashboard depois de entrar', async () => {
    vi.mocked(getSession).mockResolvedValue(null)
    const login = vi.fn().mockResolvedValue({})
    renderLogin(login)

    await screen.findByRole('heading', { name: 'Login' })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'dono@exemplo.com' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'segredo' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await screen.findByText('Dashboard do dono')
    expect(login).toHaveBeenCalledWith('dono@exemplo.com', 'segredo')
  })

  it('quem já está logado vai direto para o dashboard', async () => {
    vi.mocked(getSession).mockResolvedValue({ user: { id: 'dono' } })
    renderLogin(vi.fn())

    await waitFor(() => expect(screen.getByText('Dashboard do dono')).toBeTruthy())
  })
})
