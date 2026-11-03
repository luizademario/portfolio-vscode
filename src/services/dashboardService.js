import { getSupabase } from './supabaseClient.js'

// kind: 'denied' (sessão expirada ou sem permissão) | 'config' | 'unknown'
export class DashboardError extends Error {
  constructor(kind, message) {
    super(message)
    this.name = 'DashboardError'
    this.kind = kind
  }
}

function toDashboardError(error) {
  if (error?.kind === 'config') return new DashboardError('config', error.message)
  if (error?.code === '42501' || error?.status === 401 || error?.status === 403) {
    return new DashboardError('denied', 'Sem permissão. Entre de novo.')
  }
  return new DashboardError('unknown', 'Não foi possível falar com o banco de dados.')
}

// Executa uma consulta do Supabase e converte qualquer falha em DashboardError.
async function run(query) {
  let result
  try {
    const supabase = await getSupabase()
    result = await query(supabase)
  } catch (error) {
    throw toDashboardError(error)
  }
  if (result.error) throw toDashboardError(result.error)
  return result.data
}

// Mensagens do formulário de contato, da mais nova para a mais antiga.
// Só o dono logado consegue ler (política do banco).
export async function fetchMessages() {
  const data = await run((supabase) =>
    supabase
      .from('contact_messages')
      .select('id, name, email, message, answered, created_at')
      .order('created_at', { ascending: false }),
  )
  return data ?? []
}

// Marca como respondida (ou desmarca). Só a coluna `answered` pode ser alterada.
export async function setMessageAnswered(id, answered) {
  await run((supabase) => supabase.from('contact_messages').update({ answered }).eq('id', id))
}

export async function addFeatured(repoName) {
  await run((supabase) => supabase.from('featured_projects').insert({ repo_name: repoName }))
}

export async function removeFeatured(repoName) {
  await run((supabase) => supabase.from('featured_projects').delete().eq('repo_name', repoName))
}
