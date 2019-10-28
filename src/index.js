const _ = require('lodash')

const GTM_ATTRIBUTE = 'data-gtm-id'

function AddDataGtmId({ types: t }) {
  return {
    name: 'babel-plugin-jsx-add-data-gtm-id',
    visitor: {
      JSXOpeningElement(path) {
        const parentCallExpression = path.findParent(path => path.isCallExpression())
        const parentFunction = path.getFunctionParent()
        const parentVariableDeclarator = path.findParent(path => path.isVariableDeclarator())

        const identifier =
          // Getting first argument of React.createClass for class components
          _.get(parentCallExpression, 'node.arguments[0].name') ||
          // Getting function name for function components
          _.get(parentFunction, 'node.id.name') ||
          // Getting variable name for arrow function components
          _.get(parentVariableDeclarator, 'node.id.name')

        const hasAttribute = !!path.node.attributes.find(
          attribute => attribute.name.name === GTM_ATTRIBUTE
        )

        // Doing nothing if component name was not found or already have attribute
        if (!identifier || hasAttribute) return

        // Getting parent JSXElement of JSXOpeningElement
        const jsxElementParent = path.findParent(path => path.isJSXElement())

        // Checking if parent node is a ReturnStatement to check if is host element
        const isHostElement = t.isReturnStatement(jsxElementParent.parent)

        if (isHostElement) {
          path.node.attributes.push(
            t.jsxAttribute(t.jsxIdentifier(GTM_ATTRIBUTE), t.stringLiteral(identifier))
          )
        }
      }
    }
  }
}

module.exports = AddDataGtmId
