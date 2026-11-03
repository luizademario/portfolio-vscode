import { env as appEnv } from '../config/env.js'
import { supabaseHeaders } from './supabaseRest.js'

// Nomes dos repositórios que o dono marcou como destaque. Leitura pública (a Home precisa dela),
// pela API REST com a chave pública, sem carregar o supabase-js.
export async function fetchFeaturedNames({ signal, env = appEnv } = {}) {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw Object.assign(new Error('Faltam as variáveis do Supabase.'), { kind: 'config' })
  }

  const response = await fetch(`${env.supabaseUrl}/rest/v1/featured_projects?select=repo_name`, {
    headers: supabaseHeaders(env.supabaseAnonKey),
    signal,
  })
  if (!response.ok) {
    throw Object.assign(new Error(`Destaques indisponíveis (status ${response.status}).`), {
      kind: 'http',
    })
  }

  const rows = await response.json()
  return Array.isArray(rows) ? rows.map((row) => row.repo_name).filter(Boolean) : []
}
