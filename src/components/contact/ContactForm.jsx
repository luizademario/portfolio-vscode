import { useRef } from 'react'
import { contactLimits } from '../../config/contact.js'
import { useContactForm } from '../../hooks/useContactForm.js'
import Button from '../ui/Button.jsx'
import FormField from '../ui/FormField.jsx'
import Spinner from '../ui/Spinner.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'
import styles from './ContactForm.module.css'

// Formulário de contato. A lógica (validação, envio, anti-spam) está em useContactForm.
function ContactForm({ sendMessage, now }) {
  const formRef = useRef(null)
  const { values, errors, status, errorText, handleChange, handleBlur, submit } = useContactForm({
    sendMessage,
    now,
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
      onBlur: () => handleBlur(name),
      error: errors[name],
      disabled: sending,
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <FormField id="name" label="Nome" autoComplete="name" {...field('name')} />
      <FormField id="email" label="E-mail" type="email" autoComplete="email" {...field('email')} />
      <FormField
        id="message"
        label="Mensagem"
        as="textarea"
        hint={`${values.message.trim().length}/${contactLimits.messageMax} caracteres (mínimo ${contactLimits.messageMin})`}
        {...field('message')}
      />

      {/* Campo isca: escondido para pessoas, robôs costumam preencher. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => handleChange('website', event.target.value)}
        />
      </div>

      <Button type="submit" disabled={sending}>
        {sending && <Spinner />}
        {sending ? 'Enviando…' : 'Enviar mensagem'}
      </Button>

      <div className={styles.feedback}>
        {status === 'success' && (
          <StatusMessage title="Mensagem enviada">
            Mensagem enviada com sucesso. Agradeço o contato!
          </StatusMessage>
        )}
        {status === 'error' && (
          <StatusMessage tone="error" title="Não foi possível enviar">
            {errorText}
          </StatusMessage>
        )}
      </div>
    </form>
  )
}

export default ContactForm
