import * as Utils from 'inferno-test-utils'

export function render (component) {
  return Utils.renderIntoDocument(component)
}

export function find (tree) {
  return {
    className (_names) {
      const names = Array.isArray(_names) ? _names.join(' ') : _names
      const [r] = Utils.scryRenderedDOMElementsWithClass(tree, names)
      return typeof r !== 'undefined'
    }
  }
}
