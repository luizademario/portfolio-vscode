import { describe, expect, it } from 'vitest'
import { describeGithubError } from './describeGithubError.js'
import { formatDate } from './formatDate.js'

describe('describeGithubError', () => {
  it('explica o limite de requisições e quando tentar de novo', () => {
    const { title, text } = describeGithubError({
      kind: 'rate-limit',
      resetAt: new Date(2026, 9, 31, 14, 5),
    })
    expect(title).toContain('Limite')
    expect(text).toContain('14:05')
  })

  it('explica o limite mesmo sem horário de retorno', () => {
    expect(describeGithubError({ kind: 'rate-limit' }).text).toContain('alguns minutos')
  })

  it('tem mensagem própria para falha de rede e resposta inesperada', () => {
    expect(describeGithubError({ kind: 'network' }).title).toContain('Sem conexão')
    expect(describeGithubError({ kind: 'invalid' }).title).toContain('inesperada')
  })

  it('tem mensagem genérica para os demais erros', () => {
    expect(describeGithubError(new Error('x')).title).toContain('Não foi possível')
  })
})

describe('formatDate', () => {
  it('formata datas em português', () => {
    expect(formatDate('2026-10-20T12:00:00Z')).toMatch(/2026/)
    expect(formatDate('2026-10-20T12:00:00Z')).toMatch(/out/)
  })

  it('devolve texto vazio para data inválida', () => {
    expect(formatDate('nada')).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})
