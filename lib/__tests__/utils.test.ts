import { describe, it, expect } from 'vitest'

// Test simple para verificar que Vitest funciona
describe('Utils', () => {
  it('vitest está funcionando correctamente', () => {
    expect(true).toBe(true)
  })

  it('puede sumar números', () => {
    expect(1 + 1).toBe(2)
    expect(5 + 10).toBe(15)
  })

  it('puede trabajar con objetos', () => {
    const user = { name: 'Juan', age: 30 }
    expect(user).toHaveProperty('name', 'Juan')
    expect(user).toHaveProperty('age', 30)
  })

  it('puede trabajar con arrays', () => {
    const numbers = [1, 2, 3]
    expect(numbers).toHaveLength(3)
    expect(numbers).toContain(2)
  })
})

describe('Formato de moneda', () => {
  it('formatea USD correctamente', () => {
    const formatPrice = (price: number, currency: string) => {
      return `$${price.toLocaleString()} ${currency}`
    }
    expect(formatPrice(50000, 'USD')).toBe('$50,000 USD')
  })

  it('formatea CUP correctamente', () => {
    const formatPrice = (price: number, currency: string) => {
      return `$${price.toLocaleString()} ${currency}`
    }
    expect(formatPrice(1250000, 'CUP')).toBe('$1,250,000 CUP')
  })
})
