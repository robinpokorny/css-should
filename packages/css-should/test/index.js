/* eslint-env mocha */
import { assert } from 'chai'

import should from '..'

describe('CSS should', () => {
  it('should be a function', () => {
    assert.equal('function', typeof should)
  })
})
