import { describe, expect, it } from 'vitest'
import { describeDashboardError } from './describeDashboardError.js'
import { describeLoginError } from './describeLoginError.js'
import { selectFeatured } from './selectFeatured.js'
import { validateLogin } from './validateLogin.js'

const repos = [{ name: 'novo-tv-time' }, { name: 'Vinheria_Agnello' }, { name: 'outro-projeto' }]

describe('selectFeatured', () => {
  it('mostra só os destaques marcados, na ordem da lista de projetos', () => {
    expect(
      selectFeatured(repos, ['Vinheria_Agnello', 'novo-tv-time'], 3).map((r) => r.name),
    ).toEqual(['novo-tv-time', 'Vinheria_Agnello'])
  })

  it('compara os nomes sem diferenciar maiúsculas', () => {
    expect(selectFeatured(repos, ['vinheria_agnello'], 3).map((r) => r.name)).toEqual([
      'Vinheria_Agnello',
    ])
  })

  it('sem destaques marcados, usa os primeiros projetos', () => {
    expect(selectFeatured(repos, [], 2).map((r) => r.name)).toEqual([
      'novo-tv-time',
      'Vinheria_Agnello',
    ])
    expect(selectFeatured(repos, undefined, 1)).toHaveLength(1)
  })

  it('ignora destaques de projetos que não existem mais e, se sobrar nenhum, usa os primeiros', () => {
    expect(selectFeatured(repos, ['apagado'], 2).map((r) => r.name)).toEqual([
      'novo-tv-time',
      'Vinheria_Agnello',
    ])
  })

  it('devolve lista vazia quando não há projetos', () => {
    expect(selectFeatured([], ['x'], 3)).toEqual([])
  })
})

describe('validateLogin', () => {
  it('aceita e-mail e senha preenchidos', () => {
    expect(validateLogin({ email: 'dono@exemplo.com', password: 'abc' })).toEqual({})
  })

  it('pede e-mail e senha, com mensagem por campo', () => {
    expect(validateLogin({ email: '', password: '' })).toEqual({
      email: 'Informe seu e-mail.',
      password: 'Informe sua senha.',
    })
  })

  it('rejeita e-mail inválido', () => {
    expect(validateLogin({ email: 'dono@', password: 'abc' }).email).toBe('E-mail inválido.')
  })
})

describe('mensagens de erro', () => {
  it('login: não revela se foi o e-mail ou a senha', () => {
    expect(describeLoginError({ kind: 'invalid-credentials' })).toBe('E-mail ou senha incorretos.')
    expect(describeLoginError({ kind: 'rate-limit' })).toContain('Muitas tentativas')
    expect(describeLoginError({ kind: 'network' })).toContain('internet')
    expect(describeLoginError({ kind: 'config' })).toContain('não está configurado')
    expect(describeLoginError(new Error('x'))).toContain('Tente de novo')
  })

  it('dashboard: separa falta de permissão, configuração e erro genérico', () => {
    expect(describeDashboardError({ kind: 'denied' }).title).toBe('Sem permissão')
    expect(describeDashboardError({ kind: 'config' }).title).toBe('Não configurado')
    expect(describeDashboardError({ kind: 'unknown' }).title).toContain('Não foi possível')
  })
})
