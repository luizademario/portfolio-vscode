import { useRef, useState } from 'react'
import { contactLimits } from '../config/contact.js'
import { sendContactMessage } from '../services/contactService.js'
import { isHoneypotFilled, isTooFast, remainingCooldown } from '../utils/antiSpam.js'
import { validateContact, validateField } from '../utils/validateContact.js'

const emptyValues = { name: '', email: '', message: '', website: '' }

function readLastSent() {
  try {
    return Number(localStorage.getItem(contactLimits.cooldownStorageKey)) || 0
  } catch {
    return 0
  }
}

function writeLastSent(time) {
  try {
    localStorage.setItem(contactLimits.cooldownStorageKey, String(time))
  } catch {
    // sem armazenamento (modo privado): o intervalo só não é lembrado
  }
}

// Lógica do formulário de contato: valores, erros por campo, envio e anti-spam.
// status: 'idle' | 'sending' | 'success' | 'error'. `sendMessage` e `now` podem ser trocados nos testes.
export function useContactForm({ sendMessage = sendContactMessage, now = Date.now } = {}) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorText, setErrorText] = useState('')
  const startedAt = useRef(now())
  const sending = useRef(false) // trava síncrona: dois cliques seguidos não enviam duas vezes

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  function handleBlur(field) {
    if (field === 'website') return
    setErrors((current) => ({ ...current, [field]: validateField(field, values) }))
  }

  // Devolve o nome do primeiro campo inválido (para a tela focar nele) ou null.
  async function submit() {
    if (sending.current) return null

    const found = validateContact(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setStatus('idle')
      return Object.keys(found)[0]
    }

    // Robô: finge sucesso e não envia nada.
    if (
      isHoneypotFilled(values.website) ||
      isTooFast(startedAt.current, now(), contactLimits.minFillMs)
    ) {
      setStatus('success')
      return null
    }

    const wait = remainingCooldown(readLastSent(), now(), contactLimits.cooldownMs)
    if (wait > 0) {
      setErrorText(`Aguarde ${Math.ceil(wait / 1000)} s antes de enviar outra mensagem.`)
      setStatus('error')
      return null
    }

    sending.current = true
    setStatus('sending')
    try {
      await sendMessage(values)
      writeLastSent(now())
      setValues(emptyValues)
      setErrors({})
      setStatus('success')
    } catch (error) {
      setErrorText(
        error?.kind === 'config'
          ? 'O formulário ainda não está configurado neste site.'
          : 'Não consegui enviar agora. Seu texto continua no formulário: tente de novo.',
      )
      setStatus('error')
    } finally {
      sending.current = false
    }
    return null
  }

  return { values, errors, status, errorText, handleChange, handleBlur, submit }
}
