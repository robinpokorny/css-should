export const preprocess = (ctx, next) => {
  return next().then(() => {
    ctx.tests = ctx.css.rules
      .filter((rule) => rule.type === 'rule')
      .map((rule) => rule.declarations.filter(
        (d) => d.property === 'should'
      ))
      .reduce((p, a) => p.concat(a), [])
  })
}
