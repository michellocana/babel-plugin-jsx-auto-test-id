const _ = require('lodash')

const DEFAULT_ATTRIBUTE = 'data-test'

function AddDataTestId({ types: t }) {
  return {
    name: 'babel-plugin-jsx-auto-test-id',
    visitor: {
      JSXOpeningElement(path, state) {
        const attributeName = state.opts.attributeName || DEFAULT_ATTRIBUTE
        const identifier = getIdentifier(path)

        // Doing nothing if component name was not found or already have attribute
        if (!identifier || hasCustomAttribute(path, attributeName)) return

        if (isHostElement(t, path)) {
          const jsxIdentifier = t.jsxIdentifier(attributeName)
          const stringLiteral = t.stringLiteral(identifier)
          const jsxAttribute = t.jsxAttribute(jsxIdentifier, stringLiteral)
          path.node.attributes.push(jsxAttribute)
        }
      }
    }
  }
}

function getIdentifier(path) {
  const parentCallExpression = path.findParent(path => path.isCallExpression())
  const parentFunction = path.getFunctionParent()
  const parentVariableDeclarator = path.findParent(path => path.isVariableDeclarator())

  return (
    // Getting first argument of React.createClass for class components
    _.get(parentCallExpression, 'node.arguments[0].name') ||
    // Getting function name for function components
    _.get(parentFunction, 'node.id.name') ||
    // Getting variable name for arrow function components or React.memo'ed components
    _.get(parentVariableDeclarator, 'node.id.name')
  )
}

function hasCustomAttribute(path, attributeName) {
  return !!path.node.attributes.find(attribute => _.get(attribute, 'name.name') === attributeName)
}

function isHostElement(t, path) {
  const parentFunction = path.getFunctionParent()

  // Getting parent JSXElement of JSXOpeningElement
  const jsxElementParent = path.findParent(path => path.isJSXElement())

  return (
    // Checking if parent node is a ReturnStatement to check if is host element
    t.isReturnStatement(jsxElementParent.parent) &&
    // Also checking if parent function is not inside another function
    !parentFunction.findParent(path => path.isFunctionDeclaration())
  )
}

module.exports = AddDataTestId
