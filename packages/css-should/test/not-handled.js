/* eslint-env mocha */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const { expect } = chai

import { test } from '../lib/middleware/not-handled'

describe('"Not handled" middleware "test"', () => {
  it('should be a function', () => {
    expect(test).to.be.a('function')
  })

  it('should always fire fail', () => {
    const fail = sinon.spy()

    test({ test: { axis: 'x-not-used' }, fail })

    return expect(fail).to.have.been.calledOnce
  })

  it('should never fire pass', () => {
    const pass = sinon.spy()
    const fail = () => {}

    test({ test: { axis: 'x-not-used' }, fail, pass })

    return expect(pass).not.to.have.been.called
  })
})
