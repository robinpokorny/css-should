import { parser } from 'css'
import compose from 'koa-compose'

const extractTests = () => {}
const toTAP = () => {}

export default function (css, dom, plugins, options = {}) {
  if (typeof css === 'string') {
    css = parser(css)
  }

  const ast = compose(plugins.map(({ preprocess }) => preprocess))({ css, options })

  const testList = extractTests(ast)

  const runTest = compose(plugins.map(({ tester }) => tester))

  const result = testList.map((test) => runTest({ test, css, dom, options }))

  return toTAP(result)
}
