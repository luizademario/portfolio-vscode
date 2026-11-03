// Cabeçalhos para chamar a API REST do Supabase só com a chave pública.
// Chaves antigas (JWT, começam com "eyJ") também vão em Authorization; as novas, não.
export function supabaseHeaders(anonKey) {
  const headers = { 'Content-Type': 'application/json', apikey: anonKey }
  if (anonKey.startsWith('eyJ')) headers.Authorization = `Bearer ${anonKey}`
  return headers
}
