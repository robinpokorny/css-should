/* eslint-env mocha */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

const { expect } = chai

import {
  parseDeclaration,
  preprocess
} from '../lib/middleware/parse-declarations'

describe('"Parse declarations" middleware', () => {
  describe('"preprocess"', () => {
    it('should be a function', () => {
      expect(preprocess).to.be.a('function')
    })

    it('should call next', () => {
      const next = sinon.spy()
      const ctx = { css: { rules: [] } }

      preprocess(ctx, next)

      return expect(next).to.have.been.calledOnce
    })
  })

  describe('when parsing single declaration"', () => {
    it('should recognise simple axis', () => {
      const declaration = parseDeclaration({ value: 'axis "param"' })

      expect(declaration).to.have.property('axis', 'axis')
      expect(declaration).to.have.property('param', 'param')
    })
  })
})
