// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { contactLimits } from '../../config/contact.js'
import ContactForm from './ContactForm.jsx'

const message = 'Olá! Gostei muito do seu portfólio e queria conversar.'
let time

beforeEach(() => {
  localStorage.clear()
  time = 0
})
afterEach(cleanup)

function setup(sendMessage = vi.fn().mockResolvedValue({ emailSent: true })) {
  render(<ContactForm sendMessage={sendMessage} now={() => time} />)
  return sendMessage
}

function type(label, value) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

function fillValid() {
  type('Nome', 'Ana Souza')
  type('E-mail', 'ana@exemplo.com')
  type('Mensagem', message)
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: /Enviar mensagem|Enviando/ }))
}

describe('ContactForm: validação por campo', () => {
  it('mostra uma mensagem específica em cada campo vazio e não envia', () => {
    const send = setup()
    submit()

    expect(screen.getByText('Informe seu nome.')).toBeTruthy()
    expect(screen.getByText('Informe seu e-mail.')).toBeTruthy()
    expect(screen.getByText('Escreva sua mensagem.')).toBeTruthy()
    expect(send).not.toHaveBeenCalled()
  })

  it('mostra "e-mail inválido" e a mensagem curta, marcando o campo como inválido', () => {
    const send = setup()
    type('Nome', 'Ana')
    type('E-mail', 'ana@')
    type('Mensagem', 'curta')
    submit()

    expect(screen.getByText(/E-mail inválido/)).toBeTruthy()
    expect(screen.getByText(/Mensagem com no mínimo 20 caracteres/)).toBeTruthy()
    expect(screen.getByLabelText('E-mail').getAttribute('aria-invalid')).toBe('true')
    expect(send).not.toHaveBeenCalled()
  })

  it('valida o campo ao sair dele e limpa o erro ao corrigir', () => {
    setup()
    const email = screen.getByLabelText('E-mail')
    fireEvent.change(email, { target: { value: 'errado' } })
    fireEvent.blur(email)
    expect(screen.getByText(/E-mail inválido/)).toBeTruthy()

    fireEvent.change(email, { target: { value: 'ana@exemplo.com' } })
    expect(screen.queryByText(/E-mail inválido/)).toBeNull()
  })

  it('leva o foco para o primeiro campo com erro', async () => {
    setup()
    submit()
    await waitFor(() => expect(document.activeElement).toBe(screen.getByLabelText('Nome')))
  })
})

describe('ContactForm: envio', () => {
  it('envia uma vez, mostra o sucesso e limpa o formulário', async () => {
    const send = setup()
    fillValid()
    time = 5000
    submit()

    await screen.findByText(/Mensagem enviada com sucesso/)
    expect(send).toHaveBeenCalledTimes(1)
    expect(send.mock.calls[0][0]).toMatchObject({ name: 'Ana Souza', email: 'ana@exemplo.com' })
    expect(screen.getByLabelText('Nome').value).toBe('')
  })

  it('bloqueia o botão durante o envio e não duplica a mensagem', async () => {
    let finish
    const send = vi.fn(() => new Promise((resolve) => (finish = resolve)))
    setup(send)
    fillValid()
    time = 5000

    submit()
    const button = await screen.findByRole('button', { name: /Enviando/ })
    expect(button.disabled).toBe(true)
    fireEvent.submit(button.closest('form'))
    fireEvent.click(button)
    expect(send).toHaveBeenCalledTimes(1)

    finish({ emailSent: true })
    await screen.findByText(/Mensagem enviada com sucesso/)
    expect(screen.getByRole('button', { name: 'Enviar mensagem' }).disabled).toBe(false)
  })

  it('mostra o erro, mantém o texto digitado e libera o botão', async () => {
    const send = vi.fn().mockRejectedValue(Object.assign(new Error('x'), { kind: 'save' }))
    setup(send)
    fillValid()
    time = 5000
    submit()

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('Não consegui enviar agora')
    expect(screen.getByLabelText('Mensagem').value).toBe(message)
    expect(screen.getByRole('button', { name: 'Enviar mensagem' }).disabled).toBe(false)
  })

  it('avisa quando o formulário não está configurado', async () => {
    const send = vi.fn().mockRejectedValue(Object.assign(new Error('x'), { kind: 'config' }))
    setup(send)
    fillValid()
    time = 5000
    submit()

    await waitFor(() =>
      expect(screen.getByRole('alert').textContent).toContain('não está configurado'),
    )
  })
})

describe('ContactForm: anti-spam', () => {
  it('não envia quando o campo isca está preenchido (e finge sucesso)', async () => {
    const send = setup()
    fillValid()
    fireEvent.change(document.getElementById('website'), { target: { value: 'http://spam.com' } })
    time = 5000
    submit()

    await screen.findByText(/Mensagem enviada com sucesso/)
    expect(send).not.toHaveBeenCalled()
  })

  it('não envia quando o formulário é preenchido rápido demais', async () => {
    const send = setup()
    fillValid()
    time = contactLimits.minFillMs - 1
    submit()

    await screen.findByText(/Mensagem enviada com sucesso/)
    expect(send).not.toHaveBeenCalled()
  })

  it('exige um intervalo entre dois envios', async () => {
    const send = setup()
    fillValid()
    time = 5000
    submit()
    await screen.findByText(/Mensagem enviada com sucesso/)

    fillValid()
    time = 5000 + 10_000
    submit()

    const alert = await screen.findByRole('alert')
    expect(alert.textContent).toContain('Aguarde')
    expect(send).toHaveBeenCalledTimes(1)
  })
})
