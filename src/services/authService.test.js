import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getSession, onAuthChange, signIn, signOut } from './authService.js'
import { getSupabase } from './supabaseClient.js'

vi.mock('./supabaseClient.js', () => ({ getSupabase: vi.fn() }))

let auth
beforeEach(() => {
  auth = {
    signInWithPassword: vi.fn(),
    getSession: vi.fn(),
    signOut: vi.fn().mockResolvedValue({}),
    onAuthStateChange: vi.fn(),
  }
  vi.mocked(getSupabase).mockResolvedValue({ auth })
})

describe('signIn', () => {
  it('entra com e-mail sem espaços e devolve a sessão', async () => {
    auth.signInWithPassword.mockResolvedValue({ data: { session: { id: 's1' } }, error: null })

    await expect(signIn(' dono@exemplo.com ', 'segredo')).resolves.toEqual({ id: 's1' })
    expect(auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'dono@exemplo.com',
      password: 'segredo',
    })
  })

  it.each([
    [{ code: 'invalid_credentials', status: 400 }, 'invalid-credentials'],
    [{ status: 400 }, 'invalid-credentials'],
    [{ status: 429 }, 'rate-limit'],
    [{ name: 'AuthRetryableFetchError', status: 0 }, 'network'],
    [{ status: 500 }, 'unknown'],
  ])('classifica o erro %j como %s', async (error, kind) => {
    auth.signInWithPassword.mockResolvedValue({ data: {}, error })
    const result = await signIn('a@b.co', 'x').catch((err) => err)
    expect(result.kind).toBe(kind)
  })

  it('avisa quando faltam as variáveis do Supabase', async () => {
    vi.mocked(getSupabase).mockRejectedValue(Object.assign(new Error('x'), { kind: 'config' }))
    const result = await signIn('a@b.co', 'x').catch((err) => err)
    expect(result.kind).toBe('config')
  })

  it('trata falha ao carregar o cliente como erro de rede', async () => {
    vi.mocked(getSupabase).mockRejectedValue(new Error('chunk falhou'))
    const result = await signIn('a@b.co', 'x').catch((err) => err)
    expect(result.kind).toBe('network')
  })
})

describe('getSession', () => {
  it('devolve a sessão guardada', async () => {
    auth.getSession.mockResolvedValue({ data: { session: { id: 's1' } }, error: null })
    await expect(getSession()).resolves.toEqual({ id: 's1' })
  })

  it('devolve null sem sessão, com erro ou sem configuração', async () => {
    auth.getSession.mockResolvedValue({ data: { session: null }, error: null })
    await expect(getSession()).resolves.toBeNull()

    auth.getSession.mockResolvedValue({ data: { session: null }, error: { message: 'x' } })
    await expect(getSession()).resolves.toBeNull()

    vi.mocked(getSupabase).mockRejectedValue(new Error('x'))
    await expect(getSession()).resolves.toBeNull()
  })
})

describe('onAuthChange', () => {
  it('repassa mudanças e permite cancelar', async () => {
    const unsubscribe = vi.fn()
    let listener
    auth.onAuthStateChange.mockImplementation((callback) => {
      listener = callback
      return { data: { subscription: { unsubscribe } } }
    })
    const callback = vi.fn()

    const stop = onAuthChange(callback)
    await vi.waitFor(() => expect(auth.onAuthStateChange).toHaveBeenCalled())
    listener('SIGNED_OUT', null)
    expect(callback).toHaveBeenCalledWith(null)

    stop()
    expect(unsubscribe).toHaveBeenCalled()
  })

  it('não assina se for cancelado antes do cliente ficar pronto', async () => {
    const stop = onAuthChange(vi.fn())
    stop()
    await Promise.resolve()
    await Promise.resolve()
    expect(auth.onAuthStateChange).not.toHaveBeenCalled()
  })
})

describe('signOut', () => {
  it('encerra a sessão', async () => {
    await signOut()
    expect(auth.signOut).toHaveBeenCalled()
  })
})
