// Verificações simples contra envio automático. Funções puras (o tempo entra por parâmetro).

// O campo isca fica escondido para pessoas; robôs costumam preenchê-lo.
export function isHoneypotFilled(value) {
  return String(value ?? '').trim() !== ''
}

// Preencheu rápido demais para ser uma pessoa digitando.
export function isTooFast(startedAt, now, minMs) {
  return now - startedAt < minMs
}

// Milissegundos que faltam para poder enviar de novo (0 = já pode).
export function remainingCooldown(lastSentAt, now, cooldownMs) {
  if (!lastSentAt) return 0
  return Math.max(0, lastSentAt + cooldownMs - now)
}
