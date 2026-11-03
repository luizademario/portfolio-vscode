import { useRef, useState } from 'react'
import { signIn } from '../services/authService.js'
import { describeLoginError } from '../utils/describeLoginError.js'
import { validateLogin } from '../utils/validateLogin.js'

// Lógica do formulário de login. status: 'idle' | 'sending' | 'error'.
// `onSuccess` é chamado depois de entrar; `login` pode ser trocado nos testes.
export function useLoginForm({ onSuccess, login = signIn }) {
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorText, setErrorText] = useState('')
  const sending = useRef(false)

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }))
    if (status === 'error') setStatus('idle')
  }

  // Devolve o primeiro campo inválido (para focar) ou null.
  async function submit() {
    if (sending.current) return null

    const found = validateLogin(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return Object.keys(found)[0]
    }

    sending.current = true
    setStatus('sending')
    try {
      await login(values.email, values.password)
      onSuccess?.()
    } catch (error) {
      setErrorText(describeLoginError(error))
      setStatus('error')
    } finally {
      sending.current = false
    }
    return null
  }

  return { values, errors, status, errorText, handleChange, submit }
}
