import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchFeaturedNames } from './featuredService.js'

afterEach(() => vi.unstubAllGlobals())

const env = { supabaseUrl: 'https://abc.supabase.co', supabaseAnonKey: 'sb_publishable_x' }

describe('fetchFeaturedNames', () => {
  it('lê os nomes dos destaques pela API pública', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ repo_name: 'novo-tv-time' }, { repo_name: '' }, {}]), {
        status: 200,
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchFeaturedNames({ env })).resolves.toEqual(['novo-tv-time'])
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://abc.supabase.co/rest/v1/featured_projects?select=repo_name')
    expect(init.headers.apikey).toBe('sb_publishable_x')
  })

  it('falha quando o banco responde com erro', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))
    await expect(fetchFeaturedNames({ env })).rejects.toMatchObject({ kind: 'http' })
  })

  it('falha sem chamar a rede quando faltam as variáveis', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(fetchFeaturedNames({ env: {} })).rejects.toMatchObject({ kind: 'config' })
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
