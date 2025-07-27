import { testFunction, createTestObject, testMath } from '@/lib/test'
import { TestComponent } from '@/components/TestComponent'
import { add } from '@/utils/math'
import { TestType } from '@/types/test'

console.log('Testing path aliases...')
console.log('1. @/lib import:', testFunction())
console.log('2. @/utils import:', add(10, 20))
console.log('3. @/types import:', createTestObject())
console.log('4. Combined test:', testMath())

export { TestComponent }
export type { TestType }