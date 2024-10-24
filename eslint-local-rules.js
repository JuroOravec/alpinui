'use strict'

// See https://github.com/cletusw/eslint-plugin-local-rules
module.exports = {
  'no-render-string-reference': require('./scripts/eslint-rules/no-render-string-reference'),
  'no-components-index': require('./scripts/eslint-rules/no-components-index'),
  'no-composables-index': require('./scripts/eslint-rules/no-composables-index'),
  'jsx-condition-key': require('./scripts/eslint-rules/jsx-condition-key'),
  'jsx-curly-spacing': require('./scripts/eslint-rules/jsx-curly-spacing'),
  'jest-global-imports': require('./scripts/eslint-rules/jest-global-imports'),
  'cypress-types-reference': require('./scripts/eslint-rules/cypress-types-reference'),
  'sort-imports': require('./scripts/eslint-rules/sort-imports'),
  'no-nullish-coalescing-in-condition': require('./scripts/eslint-rules/no-nullish-coalescing-in-condition'),
}
