var testers = {
  "appear": appearTester,
  "match": matchTester,
  "not-match": notMatchTester,
  "unknown": unknownTester
}

window._parsed.stylesheet.rules.forEach(handleRule)

function appearTester ($elements, declaration, selector) {
  if($elements.length < 1) {
    console.error('Element for "' + selector + '" is missing')
  }
}

function matchTester ($elements, declaration) {
  var param = declaration.param

  $elements.forEach(function ($elem) {
    if (!$elem.matches(param)) {
      console.error('Element', $elem, ' does not match "' + param + '".')
    }
  })
}

function notMatchTester ($elements, declaration) {
  var param = declaration.param

  $elements.forEach(function ($elem) {
    if ($elem.matches(param)) {
      console.error('Element', $elem, ' matches "' + param + '".')
    }
  })
}

function unknownTester (_, declaration) {
  console.warn('Axis "' + declaration.axis +'" is not known.');
}

function handleRule (rule) {
  var selector = rule.selectors.join(',')
  var $elements = [].slice.call(document.querySelectorAll(selector))

  var shouldDeclarations = rule.declarations
    .filter(isShould)
    .map(parseShould)
    .forEach(function (declaration) {
      (testers[declaration.axis] || testers.unknown)($elements, declaration, selector)
    })
}

function isShould (declaration) {
  if ( declaration.property === 'should' || declaration.property === '-x-should') {
    return true
  }
}

function parseShould (declaration) {
  var re = /([a-z-]+)\s*("([^"]*)")?/
  var match = declaration.value.match(re)

  declaration.axis = match[1]
  declaration.param = match[3]

  return declaration
}
