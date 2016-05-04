export default function (tests, testers, emit) {
  const fail = (test, err) => {
    test.passed = false
    emit('fail', test, err)
  }

  const pass = (test) => {
    test.passed = true
    emit('pass', test)
  }

  const runTest = (test) => testers({ test, fail, pass })

  return () => {
    tests.forEach(runTest)

    return tests
  }
}
