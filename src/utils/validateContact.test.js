import { describe, expect, it } from 'vitest'
import { validateContact, validateField } from './validateContact.js'

const valid = {
  name: 'Ana Souza',
  email: 'ana@exemplo.com',
  message: 'Olá! Gostei muito do seu portfólio e queria conversar.',
}

describe('validateContact', () => {
  it('aceita dados válidos', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('exige os três campos, cada um com a sua mensagem', () => {
    expect(validateContact({ name: '', email: '', message: '' })).toEqual({
      name: 'Informe seu nome.',
      email: 'Informe seu e-mail.',
      message: 'Escreva sua mensagem.',
    })
  })

  it('trata espaços em branco como vazio', () => {
    expect(validateContact({ ...valid, name: '   ' }).name).toBe('Informe seu nome.')
  })

  it('rejeita nome curto demais e longo demais', () => {
    expect(validateContact({ ...valid, name: 'A' }).name).toBe('Nome com no mínimo 2 caracteres.')
    expect(validateContact({ ...valid, name: 'a'.repeat(101) }).name).toBe(
      'Nome com no máximo 100 caracteres.',
    )
  })

  it.each(['ana', 'ana@', 'ana@exemplo', '@exemplo.com', 'ana @exemplo.com', 'ana@exemplo.c'])(
    'rejeita o e-mail inválido "%s"',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toContain('E-mail inválido')
    },
  )

  it('rejeita e-mail longo demais', () => {
    const email = `${'a'.repeat(200)}@exemplo.com`
    expect(validateContact({ ...valid, email }).email).toBe('E-mail com no máximo 200 caracteres.')
  })

  it('pede no mínimo 20 caracteres e diz quantos faltam', () => {
    expect(validateContact({ ...valid, message: 'Oi, tudo bem?' }).message).toBe(
      'Mensagem com no mínimo 20 caracteres (faltam 7).',
    )
  })

  it('aceita exatamente 20 caracteres e rejeita mais de 2000', () => {
    expect(validateContact({ ...valid, message: 'x'.repeat(20) }).message).toBeUndefined()
    expect(validateContact({ ...valid, message: 'x'.repeat(2001) }).message).toBe(
      'Mensagem com no máximo 2000 caracteres.',
    )
  })

  it('validateField devolve só o erro do campo pedido', () => {
    expect(validateField('email', { ...valid, email: 'ana' })).toContain('E-mail inválido')
    expect(validateField('name', { ...valid, email: 'ana' })).toBe('')
  })
})
