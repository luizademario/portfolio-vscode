import { describe, expect, it } from 'vitest'
import { isHoneypotFilled, isTooFast, remainingCooldown } from './antiSpam.js'

describe('antiSpam', () => {
  it('detecta o campo isca preenchido', () => {
    expect(isHoneypotFilled('http://spam.com')).toBe(true)
    expect(isHoneypotFilled('')).toBe(false)
    expect(isHoneypotFilled('   ')).toBe(false)
    expect(isHoneypotFilled(undefined)).toBe(false)
  })

  it('detecta preenchimento rápido demais', () => {
    expect(isTooFast(1000, 1500, 2000)).toBe(true)
    expect(isTooFast(1000, 3000, 2000)).toBe(false)
  })

  it('calcula o tempo que falta para enviar de novo', () => {
    expect(remainingCooldown(0, 5000, 60000)).toBe(0)
    expect(remainingCooldown(10000, 40000, 60000)).toBe(30000)
    expect(remainingCooldown(10000, 80000, 60000)).toBe(0)
  })
})
