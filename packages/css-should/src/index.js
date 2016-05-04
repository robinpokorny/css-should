import { parse } from 'css'
import compose from 'koa-compose'

const extractTests = (ctx, next) => {
  return next().then(() => {
    ctx.results = ctx.css.rules
  })
}

const match = ({ test, fail, pass }, next) => {
  const { elements, axis, param } = test
  if (axis !== 'match') next()

  const isPassing = elements.every((elem) => {
    if (!elem.matches(param)) {
      fail(test, new Error('Element', elem, ' does not match "' + param + '".'))
      return false
    }

    return true
  })

  if (isPassing) {
    pass(test)
  }
}

const notHandled = ({ test, fail }) => {
  fail(test, new Error('Unhandled test with "' + test.axis + '" axis.'))
}

const pluck = (property, arr) => arr
  .map((obj) => obj[property])
  .filter((x) => !!x)

export default function (css, document, emit, options = {}) {
  const { plugins = [] } = options

  if (typeof css === 'string') {
    css = parse(css).stylesheet
  }

  const ctx = { css, options, document }
  const fail = (test, err) => emit('fail', test, err)
  const pass = (test) => emit('pass', test)

  const preprocessors = pluck('preprocess', plugins)
  const tests = pluck('tests', plugins)
  const testRunner = compose([ tests, match, notHandled ])

  const middleware = [
    extractTests,
    ...preprocessors
  ]

  return compose(middleware)(ctx)
    .then(() => ctx.tests.forEach(
      (test) => testRunner({ test, fail, pass })
    ))
}
