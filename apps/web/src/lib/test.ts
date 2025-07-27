import type { TestType } from '@/types/test';
import { add } from '@/utils/math';

export const testFunction = () => {
  return 'Path alias working for web app!';
};

export function createTestObject(): TestType {
  return {
    id: '1',
    name: 'Test',
  };
}

export function testMath() {
  return add(2, 3);
}
