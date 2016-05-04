/* eslint-env mocha */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const { expect } = chai

import { test } from '../'

describe('Match test', () => {
  it('should should call next for unknown axis', () => {
    const next = sinon.spy()

    test({ test: { axis: 'x-not-used' } }, next)

    return expect(next).to.have.been.calledOnce
  })
})
