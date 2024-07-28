const base = require('../../jest.config')

module.exports = {
  ...base,
  id: 'Alpinui',
  displayName: 'Alpinui',
  setupFiles: [
    'jest-canvas-mock',
  ],
}
