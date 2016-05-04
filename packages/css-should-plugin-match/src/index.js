export const test = ({ test, fail, pass }, next) => {
  const { elements, axis, param } = test
  if (axis !== 'match') return next()

  // @TODO Fix me
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
