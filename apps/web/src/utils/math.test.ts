import { describe, it, expect } from 'vitest'
import { add, multiply } from './math'

describe('math utilities', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5)
    })

    it('should add mixed positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
      expect(add(5, 0)).toBe(5)
      expect(add(0, 0)).toBe(0)
    })
  })

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12)
    })

    it('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6)
    })

    it('should multiply mixed positive and negative numbers', () => {
      expect(multiply(5, -3)).toBe(-15)
    })

    it('should handle zero', () => {
      expect(multiply(0, 5)).toBe(0)
      expect(multiply(5, 0)).toBe(0)
      expect(multiply(0, 0)).toBe(0)
    })

    it('should handle one', () => {
      expect(multiply(1, 5)).toBe(5)
      expect(multiply(5, 1)).toBe(5)
    })
  })
})