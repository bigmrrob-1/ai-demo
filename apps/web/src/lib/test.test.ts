import { describe, it, expect } from 'vitest'
import { testFunction, createTestObject, testMath } from './test'

describe('test library functions', () => {
  describe('testFunction', () => {
    it('should return the correct message', () => {
      const result = testFunction()
      expect(result).toBe('Path alias working for web app!')
    })
  })

  describe('createTestObject', () => {
    it('should create a test object with correct properties', () => {
      const result = createTestObject()
      expect(result).toEqual({
        id: '1',
        name: 'Test'
      })
    })

    it('should return an object with id as string', () => {
      const result = createTestObject()
      expect(typeof result.id).toBe('string')
    })

    it('should return an object with name as string', () => {
      const result = createTestObject()
      expect(typeof result.name).toBe('string')
    })
  })

  describe('testMath', () => {
    it('should use add function correctly', () => {
      const result = testMath()
      expect(result).toBe(5)
    })
  })
})