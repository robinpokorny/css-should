/* eslint-env mocha */
import { expect } from 'chai'

import should from '../'

describe('CSS should', () => {
  it('should be a function', () => {
    expect(should).to.be.a('function')
  })
})
