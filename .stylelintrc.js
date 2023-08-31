module.exports = {
  extends: ['@sxwy/stylelint-config'],
  rules: {
    'no-empty-source': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant']
      }
    ]
  }
}
