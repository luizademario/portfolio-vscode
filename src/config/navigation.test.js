import { describe, expect, it } from 'vitest'
import { getTabInfo, normalizePath } from './navigation.js'

describe('normalizePath', () => {
  it('remove a barra final, exceto na raiz', () => {
    expect(normalizePath('/sobre/')).toBe('/sobre')
    expect(normalizePath('/')).toBe('/')
  })
})

describe('getTabInfo', () => {
  it('devolve o arquivo e o tipo da página conhecida', () => {
    expect(getTabInfo('/sobre')).toMatchObject({ file: 'sobre.md', ext: 'md' })
    expect(getTabInfo('/sobre/')).toMatchObject({ file: 'sobre.md' })
  })

  it('devolve null para rota sem aba', () => {
    expect(getTabInfo('/nao-existe')).toBeNull()
  })

  it('cria a aba de um projeto com o nome do repositório', () => {
    expect(getTabInfo('/projetos/novo-tv-time')).toMatchObject({
      path: '/projetos/novo-tv-time',
      file: 'novo-tv-time',
      ext: 'js',
    })
  })

  it('decodifica o nome do projeto e tolera texto malformado', () => {
    expect(getTabInfo('/projetos/Novo%20TV')).toMatchObject({ file: 'Novo TV' })
    expect(getTabInfo('/projetos/%E0%A4%A')).toMatchObject({ file: '%E0%A4%A' })
  })

  it('não cria aba para caminhos mais fundos que /projetos/<nome>', () => {
    expect(getTabInfo('/projetos/a/b')).toBeNull()
  })
})
