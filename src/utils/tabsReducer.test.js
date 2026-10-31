import { describe, expect, it } from 'vitest'
import { getNextPathAfterClose, tabsReducer } from './tabsReducer.js'

describe('tabsReducer', () => {
  it('abre uma aba nova no final da lista', () => {
    expect(tabsReducer(['/'], { type: 'open', path: '/sobre' })).toEqual(['/', '/sobre'])
  })

  it('não duplica uma aba que já está aberta', () => {
    const tabs = ['/', '/sobre']
    expect(tabsReducer(tabs, { type: 'open', path: '/sobre' })).toBe(tabs)
  })

  it('fecha só a aba pedida', () => {
    expect(tabsReducer(['/', '/sobre', '/contato'], { type: 'close', path: '/sobre' })).toEqual([
      '/',
      '/contato',
    ])
  })

  it('ignora o fechamento de uma aba que não existe', () => {
    expect(tabsReducer(['/'], { type: 'close', path: '/x' })).toEqual(['/'])
  })
})

describe('getNextPathAfterClose', () => {
  const tabs = ['/', '/sobre', '/projetos']

  it('escolhe a aba da direita quando existe', () => {
    expect(getNextPathAfterClose(tabs, '/sobre')).toBe('/projetos')
    expect(getNextPathAfterClose(tabs, '/')).toBe('/sobre')
  })

  it('escolhe a aba da esquerda quando fecha a última', () => {
    expect(getNextPathAfterClose(tabs, '/projetos')).toBe('/sobre')
  })

  it('volta para a página inicial quando não sobra nenhuma aba', () => {
    expect(getNextPathAfterClose(['/sobre'], '/sobre')).toBe('/')
  })
})
