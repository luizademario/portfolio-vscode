import { contactLimits } from '../config/contact.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Valida os campos e devolve um objeto { campo: 'mensagem' } só com os que têm problema.
// Objeto vazio = tudo certo. Função pura, sem React.
export function validateContact(values, limits = contactLimits) {
  const errors = {}
  const name = (values.name ?? '').trim()
  const email = (values.email ?? '').trim()
  const message = (values.message ?? '').trim()

  if (!name) errors.name = 'Informe seu nome.'
  else if (name.length < limits.nameMin)
    errors.name = `Nome com no mínimo ${limits.nameMin} caracteres.`
  else if (name.length > limits.nameMax)
    errors.name = `Nome com no máximo ${limits.nameMax} caracteres.`

  if (!email) errors.email = 'Informe seu e-mail.'
  else if (!emailPattern.test(email))
    errors.email = 'E-mail inválido. Use o formato nome@exemplo.com.'
  else if (email.length > limits.emailMax)
    errors.email = `E-mail com no máximo ${limits.emailMax} caracteres.`

  if (!message) errors.message = 'Escreva sua mensagem.'
  else if (message.length < limits.messageMin)
    errors.message = `Mensagem com no mínimo ${limits.messageMin} caracteres (faltam ${limits.messageMin - message.length}).`
  else if (message.length > limits.messageMax)
    errors.message = `Mensagem com no máximo ${limits.messageMax} caracteres.`

  return errors
}

// Valida um campo só (usado ao sair do campo).
export function validateField(field, values, limits = contactLimits) {
  return validateContact(values, limits)[field] ?? ''
}
