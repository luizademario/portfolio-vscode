import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addFeatured,
  fetchMessages,
  removeFeatured,
  setMessageAnswered,
} from './dashboardService.js'
import { getSupabase } from './supabaseClient.js'

vi.mock('./supabaseClient.js', () => ({ getSupabase: vi.fn() }))

// Cliente falso: cada chamada encadeada é registrada e o resultado final vem de `result`.
function fakeClient(result) {
  const calls = []
  const chain = new Proxy(
    {},
    {
      get(_target, name) {
        if (name === 'then') return (resolve) => resolve(result)
        return (...args) => {
          calls.push([name, ...args])
          return chain
        }
      },
    },
  )
  vi.mocked(getSupabase).mockResolvedValue({
    from: (table) => (calls.push(['from', table]), chain),
  })
  return calls
}

beforeEach(() => {
  vi.mocked(getSupabase).mockReset()
})

describe('fetchMessages', () => {
  it('lê as mensagens da mais nova para a mais antiga', async () => {
    const calls = fakeClient({ data: [{ id: 1 }], error: null })

    await expect(fetchMessages()).resolves.toEqual([{ id: 1 }])
    expect(calls[0]).toEqual(['from', 'contact_messages'])
    expect(calls).toContainEqual(['order', 'created_at', { ascending: false }])
  })

  it('devolve lista vazia quando não há dados', async () => {
    fakeClient({ data: null, error: null })
    await expect(fetchMessages()).resolves.toEqual([])
  })

  it('classifica falta de permissão (RLS) como denied', async () => {
    fakeClient({ data: null, error: { code: '42501' } })
    const error = await fetchMessages().catch((err) => err)
    expect(error.kind).toBe('denied')
  })

  it('classifica outros erros do banco como unknown', async () => {
    fakeClient({ data: null, error: { message: 'x' } })
    const error = await fetchMessages().catch((err) => err)
    expect(error.kind).toBe('unknown')
  })

  it('classifica falta de configuração como config', async () => {
    vi.mocked(getSupabase).mockRejectedValue(Object.assign(new Error('x'), { kind: 'config' }))
    const error = await fetchMessages().catch((err) => err)
    expect(error.kind).toBe('config')
  })
})

describe('escritas', () => {
  it('marcar como respondida altera só a coluna answered da mensagem pedida', async () => {
    const calls = fakeClient({ data: null, error: null })

    await setMessageAnswered(7, true)

    expect(calls).toContainEqual(['update', { answered: true }])
    expect(calls).toContainEqual(['eq', 'id', 7])
  })

  it('marca e desmarca destaque pelo nome do repositório', async () => {
    const calls = fakeClient({ data: null, error: null })

    await addFeatured('novo-tv-time')
    await removeFeatured('Vinheria_Agnello')

    expect(calls).toContainEqual(['from', 'featured_projects'])
    expect(calls).toContainEqual(['insert', { repo_name: 'novo-tv-time' }])
    expect(calls).toContainEqual(['delete'])
    expect(calls).toContainEqual(['eq', 'repo_name', 'Vinheria_Agnello'])
  })

  it('devolve erro quando o banco recusa a escrita', async () => {
    fakeClient({ data: null, error: { code: '42501' } })
    const error = await setMessageAnswered(1, true).catch((err) => err)
    expect(error.kind).toBe('denied')
  })
})
