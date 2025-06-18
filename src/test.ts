import assert from 'node:assert'
import { test } from 'node:test'

import { Dune } from '.'

test('should throw an error if no API key is provided', () => {
  assert.throws(() => {
    new Dune('')
  })
})
