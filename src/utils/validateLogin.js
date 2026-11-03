const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Valida o formulário de login. Devolve { campo: 'mensagem' } só com os problemas.
export function validateLogin(values) {
  const errors = {}
  const email = (values.email ?? '').trim()

  if (!email) errors.email = 'Informe seu e-mail.'
  else if (!emailPattern.test(email)) errors.email = 'E-mail inválido.'

  if (!values.password) errors.password = 'Informe sua senha.'

  return errors
}
