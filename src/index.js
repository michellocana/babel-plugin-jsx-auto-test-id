const DEFAULT_ATTRIBUTE = 'data-test'

function AddDataTestId({ types: t }) {
  const detectReactImport = (path, state) => {
    const parentImportDeclaration = path.findParent(parent => parent.type === 'ImportDeclaration')
    const isReactImport = parentImportDeclaration?.node?.source?.value === 'react'

    if (isReactImport) {
      const reactLocalName = path?.node?.local?.name
      const fragmentImportSpecifier = parentImportDeclaration.node.specifiers.find(specifier => specifier?.imported?.name === 'Fragment')
      const fragmentLocalName = fragmentImportSpecifier?.local?.name
      state.set('reactLocalName', reactLocalName)
      state.set('fragmentLocalName', fragmentLocalName)
    }
  }


  return {
    name: 'babel-plugin-jsx-auto-test-id',
    visitor: {
      ImportNamespaceSpecifier: detectReactImport,
      ImportDefaultSpecifier: detectReactImport,
      ImportSpecifier: detectReactImport,
      JSXOpeningElement(path, state) {
        const attributeName = state.opts.attributeName || DEFAULT_ATTRIBUTE
        const identifier = getIdentifier(path)

        // Doing nothing if component name was not found or already have attribute
        if (!identifier || hasCustomAttribute(path, attributeName)) return

        if (isHostElement(t, path) && !isFragment(path, state)) {
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
    parentCallExpression?.node?.arguments[0]?.name ||
    // Getting function name for function components
    parentFunction?.node?.id?.name ||
    // Getting variable name for arrow function components or React.memo'ed components
    parentVariableDeclarator?.node?.id?.name
  )
}

function hasCustomAttribute(path, attributeName) {
  return !!path.node.attributes.find(attribute => attribute.name?.name === attributeName)
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

function isFragment(path, state) {
  const reactLocalName = state.get('reactLocalName')
  const fragmentLocalName = state.get('fragmentLocalName')
  const isJsxMemberExpression = path.node?.name?.type === 'JSXMemberExpression'
  const isJsxIdentifier = path.node?.name?.type === 'JSXIdentifier'

  if (isJsxMemberExpression) {
    const jsxIdentifier = path.node.name
    return jsxIdentifier.object.name === reactLocalName && jsxIdentifier.property.name === 'Fragment'
  }

  if (isJsxIdentifier) {
    const jsxIdentifier = path.node.name
    return jsxIdentifier.name === fragmentLocalName
  }

  return false
}

module.exports = AddDataTestId
