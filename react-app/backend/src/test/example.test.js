import { expect, test, describe, it } from 'vitest'
import { sum } from '../../services/testService.js'
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})
