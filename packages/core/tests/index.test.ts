import { expect, test } from 'vitest'
import { hello } from '../src'

test('Hello world', () => {
  expect(hello()).toBe('world')
})
