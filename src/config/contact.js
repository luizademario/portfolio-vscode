// Regras do formulário de contato num só lugar (validação, anti-spam e banco usam os mesmos números).
export const contactLimits = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 200,
  messageMin: 20,
  messageMax: 2000,
  // Anti-spam
  minFillMs: 2000, // formulário preenchido em menos que isso é tratado como robô
  cooldownMs: 60 * 1000, // intervalo mínimo entre dois envios no mesmo navegador
  cooldownStorageKey: 'portfolio:contato:ultimo-envio',
}
