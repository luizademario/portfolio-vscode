import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Breadcrumb from './Breadcrumb.jsx'

function renderAt(path) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumb />
    </MemoryRouter>,
  )
}

describe('Breadcrumb', () => {
  it('mostra o arquivo da página atual', () => {
    expect(renderAt('/sobre')).toContain('sobre.md')
  })

  it('mostra o nome do repositório na rota de projeto', () => {
    expect(renderAt('/projetos/meu-app')).toContain('meu-app')
  })

  it('não mostra nada em rota inexistente', () => {
    expect(renderAt('/nao-existe')).toBe('')
  })
})
