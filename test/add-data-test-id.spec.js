import React from 'react'
import renderer from 'react-test-renderer'

import ClassComponent from './fixtures/ClassComponent'
import FunctionComponent from './fixtures/FunctionComponent'
import ArrowFunctionComponent from './fixtures/ArrowFunctionComponent'
import CustomDataIdComponent from './fixtures/CustomDataIdComponent'
import ChildrenComponent from './fixtures/ChildrenComponent'
import ReactMemoComponent from './fixtures/ReactMemoComponent'

it('should add data-test to class component', () => {
  const component = renderer.create(<ClassComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ClassComponent')
})

it('should add data-test to function component', () => {
  const component = renderer.create(<FunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'FunctionComponent')
})

it('should add data-test to arrow function component', () => {
  const component = renderer.create(<ArrowFunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ArrowFunctionComponent')
})

it('should keep already settled attributes', () => {
  const customId = 'MyCustomDataGtmId'
  const component = renderer.create(<CustomDataIdComponent customId={customId} />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', customId)
})

it('should add attribute only on host element', () => {
  const component = renderer.create(<ChildrenComponent />)
  const tree = component.toJSON()

  expect(tree.children.find(c => c.props['data-test'])).toBeUndefined()
})

it('should add data-test to React.memo components', () => {
  const component = renderer.create(<ReactMemoComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ReactMemoComponent')
})
