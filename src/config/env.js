// Variáveis de ambiente do Vite (arquivo .env, veja .env.example). São públicas no navegador.
export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  emailjsServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  emailjsTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  emailjsPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
}
