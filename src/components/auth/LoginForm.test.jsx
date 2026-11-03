// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LoginForm from './LoginForm.jsx'

afterEach(cleanup)

function setup(login = vi.fn().mockResolvedValue({})) {
  const onSuccess = vi.fn()
  render(<LoginForm login={login} onSuccess={onSuccess} />)
  return { login, onSuccess }
}

function fill(email = 'dono@exemplo.com', password = 'segredo') {
  fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: email } })
  fireEvent.change(screen.getByLabelText('Senha'), { target: { value: password } })
}

const submit = () => fireEvent.click(screen.getByRole('button', { name: /Entrar|Entrando/ }))

describe('LoginForm', () => {
  it('mostra uma mensagem por campo e não tenta entrar com campos vazios', async () => {
    const { login } = setup()
    submit()

    await screen.findByText('Informe seu e-mail.')
    expect(screen.getByText('Informe sua senha.')).toBeTruthy()
    expect(login).not.toHaveBeenCalled()
  })

  it('rejeita e-mail inválido', async () => {
    const { login } = setup()
    fill('dono@', 'segredo')
    submit()

    await screen.findByText('E-mail inválido.')
    expect(login).not.toHaveBeenCalled()
  })

  it('entra com os dados certos e avisa o sucesso', async () => {
    const { login, onSuccess } = setup()
    fill()
    submit()

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
    expect(login).toHaveBeenCalledWith('dono@exemplo.com', 'segredo')
  })

  it('mostra erro de senha incorreta, sem dizer qual campo errou', async () => {
    const { onSuccess } = setup(
      vi.fn().mockRejectedValue(Object.assign(new Error('x'), { kind: 'invalid-credentials' })),
    )
    fill()
    submit()

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('E-mail ou senha incorretos.')
    expect(onSuccess).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Entrar' }).disabled).toBe(false)
  })

  it('mostra o aviso de excesso de tentativas', async () => {
    setup(vi.fn().mockRejectedValue(Object.assign(new Error('x'), { kind: 'rate-limit' })))
    fill()
    submit()

    expect((await screen.findByRole('alert')).textContent).toContain('Muitas tentativas')
  })

  it('bloqueia o botão enquanto entra e não envia duas vezes', async () => {
    let finish
    const login = vi.fn(() => new Promise((resolve) => (finish = resolve)))
    setup(login)
    fill()
    submit()

    const button = await screen.findByRole('button', { name: /Entrando/ })
    expect(button.disabled).toBe(true)
    fireEvent.submit(button.closest('form'))
    expect(login).toHaveBeenCalledTimes(1)

    finish({})
    await waitFor(() => expect(login).toHaveBeenCalledTimes(1))
  })
})
