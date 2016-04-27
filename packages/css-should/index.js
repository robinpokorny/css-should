import { parser } from 'css';

export default function (css, html, plugins, options = {}) {
  if (typeof css === 'string') {
    css = parse(css)
  }

  const ast = compose(plugins.map({ preprocess } => preprocess))(css, options)

  const testList = extractTests(ast)

  const runTests = compose(plugins.map({ tester } => tester))

  const result = testList.map((test) => runTests(test, css, html, options))

  return toTAP(result)
}
