import { env as appEnv } from '../config/env.js'

const emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send'

// kind: 'config' (faltam variáveis do .env) | 'save' (não conseguiu salvar no banco)
export class ContactError extends Error {
  constructor(kind, message) {
    super(message)
    this.name = 'ContactError'
    this.kind = kind
  }
}

function clean(values) {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  }
}

// Passo 1: salva no Supabase pela API REST (sem o pacote supabase-js, que deixaria o site mais pesado).
// A política do banco só permite INSERIR com a chave pública.
export async function saveMessage(values, { env = appEnv, signal } = {}) {
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new ContactError('config', 'Faltam as variáveis do Supabase no .env.')
  }

  const headers = {
    'Content-Type': 'application/json',
    apikey: env.supabaseAnonKey,
    Prefer: 'return=minimal',
  }
  // Chaves antigas (JWT) também vão em Authorization; as novas ("sb_publishable_...") não.
  if (env.supabaseAnonKey.startsWith('eyJ')) headers.Authorization = `Bearer ${env.supabaseAnonKey}`

  let response
  try {
    response = await fetch(`${env.supabaseUrl}/rest/v1/contact_messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify(clean(values)),
      signal,
    })
  } catch {
    throw new ContactError('save', 'Não foi possível falar com o banco de dados.')
  }

  if (!response.ok) {
    throw new ContactError('save', `O banco recusou a mensagem (status ${response.status}).`)
  }
}

// Passo 2: avisa o dono por e-mail (EmailJS). Devolve true/false; não lança erro.
export async function sendEmailNotification(values, { env = appEnv, signal } = {}) {
  if (!env.emailjsServiceId || !env.emailjsTemplateId || !env.emailjsPublicKey) return false

  const { name, email, message } = clean(values)
  try {
    const response = await fetch(emailjsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: env.emailjsServiceId,
        template_id: env.emailjsTemplateId,
        user_id: env.emailjsPublicKey,
        template_params: { from_name: name, reply_to: email, message },
      }),
      signal,
    })
    return response.ok
  } catch {
    return false
  }
}

// Salva primeiro (o banco é a fonte da verdade, D3). Se salvar falhar, não manda e-mail e
// o erro sobe. Se o e-mail falhar, a mensagem já está salva: devolve { emailSent: false }.
export async function sendContactMessage(values, options = {}) {
  await saveMessage(values, options)
  const emailSent = await sendEmailNotification(values, options)
  return { emailSent }
}
