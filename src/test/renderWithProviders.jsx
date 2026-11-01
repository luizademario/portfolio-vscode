import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createQueryClient } from '../services/queryClient.js'

// Renderiza uma página com rota e cache, como no site. Passe o mesmo `client` em duas
// renderizações para simular a navegação entre páginas (cache compartilhado).
export function renderWithProviders(element, { route = '/', path = '*', client } = {}) {
  const queryClient = client ?? createQueryClient()
  const view = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
  return { ...view, queryClient }
}
