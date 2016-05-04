export const test = ({ test, fail }) =>
  fail(test, new Error('Unhandled test with "' + test.axis + '" axis.'))
