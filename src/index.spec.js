/* globals describe, it */

// Make sure the app loads (top-level)
describe('Entry point', () => {
  it('should render without problems', () => {
    require('./index.js')
  })
})
