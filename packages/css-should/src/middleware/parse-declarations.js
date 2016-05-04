const re = /([a-z-]+)\s*("([^"]*)")?/

export const parseDeclaration = (declaration) => {
  const match = declaration.value.match(re)

  declaration.axis = match[1]
  declaration.param = match[3]

  return declaration
}

export const preprocess = (ctx, next) => {
  ctx.css.rules.forEach((rule) => rule.declarations
    .filter((d) => d.property === 'should')
    .map(parseDeclaration)
  )
  return next()
}
