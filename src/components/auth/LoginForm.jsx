import { useRef } from 'react'
import { useLoginForm } from '../../hooks/useLoginForm.js'
import Button from '../ui/Button.jsx'
import FormField from '../ui/FormField.jsx'
import Spinner from '../ui/Spinner.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'

// Formulário de login do dono. A lógica está em useLoginForm.
function LoginForm({ onSuccess, login }) {
  const formRef = useRef(null)
  const { values, errors, status, errorText, handleChange, submit } = useLoginForm({
    onSuccess,
    login,
  })
  const sending = status === 'sending'

  async function handleSubmit(event) {
    event.preventDefault()
    const firstInvalid = await submit()
    if (firstInvalid) formRef.current?.elements[firstInvalid]?.focus()
  }

  function field(name) {
    return {
      value: values[name],
      onChange: (event) => handleChange(name, event.target.value),
      error: errors[name],
      disabled: sending,
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <FormField
        id="email"
        label="E-mail"
        type="email"
        autoComplete="username"
        {...field('email')}
      />
      <FormField
        id="password"
        label="Senha"
        type="password"
        autoComplete="current-password"
        {...field('password')}
      />
      <Button type="submit" disabled={sending}>
        {sending && <Spinner />}
        {sending ? 'Entrando…' : 'Entrar'}
      </Button>
      {status === 'error' && (
        <div style={{ marginTop: 16 }}>
          <StatusMessage tone="error" title="Não foi possível entrar">
            {errorText}
          </StatusMessage>
        </div>
      )}
    </form>
  )
}

export default LoginForm
