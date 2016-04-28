import { parser } from 'css'
import compose from 'koa-compose'

import extractTests from './extract-tests'
import toTAP from './to-tap'

export default function (css, dom, plugins, options = {}) {
  if (typeof css === 'string') {
    css = parser(css)
  }

  const ast = compose(plugins.map(({ preprocess }) => preprocess))({ css, options })

  const testList = extractTests(ast)

  const runTests = compose(plugins.map(({ tester }) => tester))

  const result = testList.map((test) => runTests({ test, css, dom, options }))

  return toTAP(result)
}
