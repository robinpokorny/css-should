import { parse } from 'css'
import compose from 'koa-compose'
import * as pluginMatch from 'css-should-plugin-match'

import pluck from './helpers/pluck'
import testRunner from './helpers/test-runner'

import * as extractTests from './middleware/extract-tests'
import * as parseDeclarations from './middleware/parse-declarations'
import * as notHandled from './middleware/not-handled'

export default function (css, document, emit, options = {}) {
  const { plugins = [], cssSource } = options

  if (typeof css === 'string') {
    css = parse(css, { source: cssSource }).stylesheet
  }

  const middleware = [
    extractTests,
    ...plugins,
    parseDeclarations,
    pluginMatch,
    notHandled
  ]

  const preprocessors = compose(pluck('preprocess', middleware))
  const testers = compose(pluck('test', middleware))
  const ctx = { css, options, document }

  return preprocessors(ctx)
    .then(testRunner(ctx.tests, testers, emit))
    .then((results) => {
      emit('done')
      return results
    })
}
