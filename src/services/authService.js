import { getSupabase } from './supabaseClient.js'

// kind: 'invalid-credentials' | 'rate-limit' | 'network' | 'config' | 'unknown'
export class AuthError extends Error {
  constructor(kind, message) {
    super(message)
    this.name = 'AuthError'
    this.kind = kind
  }
}

function toAuthError(error) {
  if (error?.kind === 'config') return new AuthError('config', error.message)
  if (error?.status === 429) return new AuthError('rate-limit', 'Muitas tentativas de login.')
  if (error?.code === 'invalid_credentials' || error?.status === 400) {
    return new AuthError('invalid-credentials', 'E-mail ou senha incorretos.')
  }
  if (error?.name === 'AuthRetryableFetchError' || error?.status === 0) {
    return new AuthError('network', 'Não foi possível falar com o servidor de login.')
  }
  return new AuthError('unknown', 'Não foi possível entrar.')
}

// Sessão guardada no navegador (ou null). Qualquer falha vira "sem sessão".
export async function getSession() {
  try {
    const supabase = await getSupabase()
    const { data, error } = await supabase.auth.getSession()
    return error ? null : data.session
  } catch {
    return null
  }
}

// Avisa quando a pessoa entra ou sai. Devolve a função que cancela o aviso.
export function onAuthChange(callback) {
  let cancelled = false
  let unsubscribe = () => {}

  getSupabase()
    .then((supabase) => {
      if (cancelled) return
      const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session))
      unsubscribe = () => data.subscription.unsubscribe()
    })
    .catch(() => {})

  return () => {
    cancelled = true
    unsubscribe()
  }
}

export async function signIn(email, password) {
  let result
  try {
    const supabase = await getSupabase()
    result = await supabase.auth.signInWithPassword({ email: email.trim(), password })
  } catch (error) {
    throw toAuthError(error?.kind === 'config' ? error : { name: 'AuthRetryableFetchError' })
  }
  if (result.error) throw toAuthError(result.error)
  return result.data.session
}

export async function signOut() {
  const supabase = await getSupabase()
  await supabase.auth.signOut()
}
