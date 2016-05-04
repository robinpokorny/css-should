/* eslint-env mocha */
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

const { expect } = chai

import should from '..'

describe('CSS should', () => {
  it('should be a function', () => {
    expect(should).to.be.a('function')
  })

  it('should return a promise', () => {
    expect(should('', null, [])).to.be.a('promise')
  })

  describe('when passed empty CSS', () => {
    it('should return empty array', () => {
      const result = should('', null, [])

      return expect(result).to.eventually.deep.equal([])
    })
  })
})
