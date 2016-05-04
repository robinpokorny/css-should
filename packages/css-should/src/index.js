import { parse } from 'css'
import compose from 'koa-compose'

const extractTests = (ctx, next) => {
  return next().then(() => {
    ctx.tests = ctx.css.rules
      .filter((rule) => rule.type === 'rule')
      .map((rule) => rule.declarations.filter(
        (d) => d.property === 'should')
      )
      .reduce((p, a) => p.concat(a), [])
  })
}

function parseShouldDeclaration (declaration) {
  var re = /([a-z-]+)\s*("([^"]*)")?/
  var match = declaration.value.match(re)

  declaration.axis = match[1]
  declaration.param = match[3]

  return declaration
}

const parseShould = (ctx, next) => {
  ctx.css.rules.forEach((rule) => rule.declarations
    .filter((d) => d.property === 'should')
    .map(parseShouldDeclaration)
  )
  return next()
}

const match = ({ test, fail, pass }, next) => {
  const { elements, axis, param } = test
  if (axis !== 'match') next()

  pass(test)

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
  const fail = (test, err) => {
    test.passed = false
    emit('fail', test, err)
  }
  const pass = (test) => {
    test.passed = true
    emit('pass', test)
  }

  const preprocessors = pluck('preprocess', plugins)
  const tests = pluck('test', plugins)
  const testRunner = compose([ ...tests, match, notHandled ])

  const middleware = [
    extractTests,
    ...preprocessors,
    parseShould
  ]

  return compose(middleware)(ctx)
    .then(() => ctx.tests.map(
      (test) => {
        testRunner({test, fail, pass})
        return test
      }
    ))
    .then((results) => {
      emit('done')
      return results
    })
}
