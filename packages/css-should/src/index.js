import { parse } from 'css'
import compose from 'koa-compose'

const extractTests = (ctx, next) => {
  return next().then(() => {
    ctx.results = ctx.css.rules
  })
}

const pluck = (property, arr) => arr
  .map((obj) => obj[property])
  .filter((x) => !!x)

export default function (css, document, plugins = [], options = {}) {
  if (typeof css === 'string') {
    css = parse(css).stylesheet
  }

  const ctx = { css, options, document }

  const processors = pluck('process', plugins)
  // const testers = compose(pluck('test', plugins))

  const middleware = [extractTests, ...processors]

  return compose(middleware)(ctx).then(() => ctx.results)
}
