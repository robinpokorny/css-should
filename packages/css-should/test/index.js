/* eslint-env mocha */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const { expect } = chai

import should from '../'

describe('CSS should', () => {
  it('should be a function', () => {
    expect(should).to.be.a('function')
  })

  it('should return results', () => {
    should('', null, () => {}).then((result) =>
      expect(result).to.be.a('array')
    )
  })

  it('should emit "done" when all test have run', () => {
    const emit = sinon.spy()

    should('', null, emit).then(() =>
      expect(emit).to.have.been.calledWith('done')
    )
  })

  it('should dddd', () => {
    const emit = (...args) => console.log(...args)

    should('body { should: match "body" }', null, emit).then((results) => {
      console.log(results)
      expect(results).to.have.lengthOf(2)
    })
  })
})
