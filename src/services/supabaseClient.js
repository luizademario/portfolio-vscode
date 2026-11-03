import { env as appEnv } from '../config/env.js'

export class ConfigError extends Error {
  constructor() {
    super('Faltam as variáveis do Supabase no .env.')
    this.name = 'ConfigError'
    this.kind = 'config'
  }
}

let clientPromise

// Cria o cliente do Supabase só quando alguém precisa dele (login ou dashboard). O pacote
// `supabase-js` é pesado: com `import()` ele vira um arquivo à parte e o visitante comum nunca o baixa.
export function getSupabase(env = appEnv) {
  if (!env.supabaseUrl || !env.supabaseAnonKey) return Promise.reject(new ConfigError())
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(env.supabaseUrl, env.supabaseAnonKey),
  )
  return clientPromise
}
